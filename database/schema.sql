-- =========================================================
-- MAGU SDA CLUB / ChurchWeb — database schema + seed data
-- Import this whole file in phpMyAdmin (or `mysql -u root -p < churchweb.sql`),
-- then optionally import database/migrations/bible_full.sql and
-- database/migrations/library_full.sql for full Bible/EGW book text.
-- =========================================================

CREATE DATABASE IF NOT EXISTS magusdaclub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE magusdaclub;

-- ---------------------------------------------------------
-- Auth: users (member / admin / super_admin)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    username       VARCHAR(50) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    display_name   VARCHAR(255) NOT NULL,
    role           ENUM('member','admin','super_admin') NOT NULL DEFAULT 'member',
    member_id      INT NULL, -- optional link to a members row
    created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login_at  DATETIME NULL
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Members
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS members (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    full_name       VARCHAR(255) NOT NULL,
    phone           VARCHAR(50),
    email           VARCHAR(255),
    photo_filename  VARCHAR(255),
    membership_status ENUM('active','inactive') NOT NULL DEFAULT 'active',
    joined_date     DATE NULL,
    notes           TEXT,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

ALTER TABLE users
    ADD CONSTRAINT fk_users_member FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE SET NULL;

-- ---------------------------------------------------------
-- Bible
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS bible_books (
    id            INT PRIMARY KEY,
    name          VARCHAR(50) NOT NULL,
    abbrev        VARCHAR(10) NOT NULL,
    book_order    INT NOT NULL,
    chapter_count INT NOT NULL,
    testament     VARCHAR(3) NOT NULL -- OT / NT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bible_verses (
    id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    book_id   INT NOT NULL,
    chapter   INT NOT NULL,
    verse     INT NOT NULL,
    text      TEXT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES bible_books(id) ON DELETE CASCADE,
    INDEX idx_book_chapter (book_id, chapter),
    FULLTEXT INDEX ft_verse_text (text)
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Books library (devotionals / SDA literature etc.)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS library_books (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    author      VARCHAR(255) NOT NULL,
    description TEXT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS library_chapters (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    book_id         INT NOT NULL,
    chapter_number  INT NOT NULL,
    title           VARCHAR(255) NOT NULL,
    content         LONGTEXT,
    FOREIGN KEY (book_id) REFERENCES library_books(id) ON DELETE CASCADE,
    INDEX idx_book (book_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Events + attendance
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS events (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    title          VARCHAR(255) NOT NULL,
    description    TEXT,
    event_datetime DATETIME NOT NULL,
    location       VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS event_participants (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    event_id    INT NOT NULL,
    member_id   INT NOT NULL,
    joined_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    UNIQUE KEY uniq_event_member (event_id, member_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS attendance (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    event_id    INT NOT NULL,
    member_id   INT NOT NULL,
    status      ENUM('present','absent') NOT NULL DEFAULT 'present',
    recorded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    recorded_by INT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY uniq_event_member_att (event_id, member_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Gallery
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS gallery_images (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    filename    VARCHAR(255) NOT NULL,
    caption     VARCHAR(255) DEFAULT '',
    album       VARCHAR(100) DEFAULT '',
    date_added  DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Church budget
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS budget_categories (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(100) NOT NULL,
    is_income TINYINT(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS budget_accounts (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    is_off_budget TINYINT(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS budget_transactions (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    amount      DECIMAL(12,2) NOT NULL,
    category_id INT NULL,
    account_id  INT NULL,
    note        VARCHAR(255) DEFAULT '',
    txn_date    DATETIME NOT NULL,
    is_income   TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES budget_categories(id) ON DELETE SET NULL,
    FOREIGN KEY (account_id)  REFERENCES budget_accounts(id)  ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_account (account_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Church profile (single row, id always 1)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS church_profile (
    id            INT PRIMARY KEY DEFAULT 1,
    name          VARCHAR(255) NOT NULL,
    address       VARCHAR(255),
    phone         VARCHAR(50),
    logo_filename VARCHAR(255),
    latitude      DECIMAL(9,6),
    longitude     DECIMAL(9,6)
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Pastors / leaders directory (Connect with Pastor screen)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS pastors (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(255) NOT NULL,
    role  VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pastor_messages (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    pastor_id   INT NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_contact VARCHAR(255),
    message     TEXT NOT NULL,
    reply       TEXT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    replied_at  DATETIME NULL,
    FOREIGN KEY (pastor_id) REFERENCES pastors(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Pathfinders club info (free-text content block)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS pathfinders_info (
    id      INT PRIMARY KEY DEFAULT 1,
    content LONGTEXT
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Find Church directory (other SDA churches, beyond the home church)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS churches (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    address     VARCHAR(255),
    phone       VARCHAR(50),
    service_times VARCHAR(255),
    latitude    DECIMAL(9,6),
    longitude   DECIMAL(9,6)
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Community: posts / comments / reactions / groups / messages
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS posts (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT NOT NULL,
    content     TEXT NOT NULL,
    image_filename VARCHAR(255) NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_flagged  TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS comments (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    post_id     INT NOT NULL,
    user_id     INT NOT NULL,
    content     VARCHAR(1000) NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS reactions (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    post_id     INT NOT NULL,
    user_id     INT NOT NULL,
    type        VARCHAR(20) NOT NULL DEFAULT 'like',
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uniq_post_user (post_id, user_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS groups_table (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    created_by  INT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS group_members (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    group_id  INT NOT NULL,
    user_id   INT NOT NULL,
    joined_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups_table(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uniq_group_user (group_id, user_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS messages (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    sender_id   INT NOT NULL,
    recipient_id INT NULL,      -- direct message target (null if group message)
    group_id    INT NULL,       -- group chat target (null if direct message)
    body        TEXT NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read     TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups_table(id) ON DELETE CASCADE,
    INDEX idx_conversation (sender_id, recipient_id),
    INDEX idx_group (group_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS notifications (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT NOT NULL,
    type        VARCHAR(50) NOT NULL,
    message     VARCHAR(255) NOT NULL,
    link        VARCHAR(255) NULL,
    is_read     TINYINT(1) NOT NULL DEFAULT 0,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_unread (user_id, is_read)
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- App-wide settings (theme, etc.)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS app_settings (
    setting_key   VARCHAR(50) PRIMARY KEY,
    setting_value VARCHAR(255)
) ENGINE=InnoDB;

-- =========================================================
-- SEED DATA
-- =========================================================

INSERT INTO church_profile (id, name, address, phone, logo_filename, latitude, longitude) VALUES
(1, 'MAGU SDA CLUB', 'MAGU SDA Club, Lilongwe, Malawi', '0886861238', NULL, -13.984200, 33.783700)
ON DUPLICATE KEY UPDATE id=id;

INSERT INTO app_settings (setting_key, setting_value) VALUES
('theme', 'light')
ON DUPLICATE KEY UPDATE setting_key=setting_key;

INSERT INTO pathfinders_info (id, content) VALUES
(1, 'The Pathfinder Club is the SDA youth ministry program for young people, focused on character building, community service, nature, and spiritual growth. Meetings, badge work, camporees and community outreach activities will be listed here — edit this text from the Pathfinders admin box on this page.')
ON DUPLICATE KEY UPDATE id=id;

INSERT INTO pastors (name, role, phone, email) VALUES
('Pastor In Charge', 'Senior Pastor', '0886861238', 'pastor@magusda.example')
ON DUPLICATE KEY UPDATE id=id;

-- Default accounts — CHANGE THESE PASSWORDS after first login.
-- super_admin / superadmin123   and   admin / admin123
INSERT INTO users (id, username, password_hash, display_name, role) VALUES
(1, 'superadmin', '$2y$10$PIxqA.G6vGqqp8szrnrK.OgpMG91LS6m6Uhveybx/gG3JkMQccf4.', 'Club Super Admin', 'super_admin'),
(2, 'admin', '$2y$10$LjDClr6hsjQLZA9jd8gZ1Oi8fQfmotrwd.0wvaMd1UZ8vh39cBoza', 'Club Admin', 'admin')
ON DUPLICATE KEY UPDATE id=id;

-- Bible books (standard 66-book Protestant canon, with real chapter counts)
INSERT INTO bible_books (id, name, abbrev, book_order, chapter_count, testament) VALUES
(1,'Genesis','Gen',1,50,'OT'),(2,'Exodus','Exo',2,40,'OT'),(3,'Leviticus','Lev',3,27,'OT'),
(4,'Numbers','Num',4,36,'OT'),(5,'Deuteronomy','Deu',5,34,'OT'),(6,'Joshua','Jos',6,24,'OT'),
(7,'Judges','Jdg',7,21,'OT'),(8,'Ruth','Rut',8,4,'OT'),(9,'1 Samuel','1Sa',9,31,'OT'),
(10,'2 Samuel','2Sa',10,24,'OT'),(11,'1 Kings','1Ki',11,22,'OT'),(12,'2 Kings','2Ki',12,25,'OT'),
(13,'1 Chronicles','1Ch',13,29,'OT'),(14,'2 Chronicles','2Ch',14,36,'OT'),(15,'Ezra','Ezr',15,10,'OT'),
(16,'Nehemiah','Neh',16,13,'OT'),(17,'Esther','Est',17,10,'OT'),(18,'Job','Job',18,42,'OT'),
(19,'Psalms','Psa',19,150,'OT'),(20,'Proverbs','Pro',20,31,'OT'),(21,'Ecclesiastes','Ecc',21,12,'OT'),
(22,'Song of Solomon','Sng',22,8,'OT'),(23,'Isaiah','Isa',23,66,'OT'),(24,'Jeremiah','Jer',24,52,'OT'),
(25,'Lamentations','Lam',25,5,'OT'),(26,'Ezekiel','Eze',26,48,'OT'),(27,'Daniel','Dan',27,12,'OT'),
(28,'Hosea','Hos',28,14,'OT'),(29,'Joel','Joe',29,3,'OT'),(30,'Amos','Amo',30,9,'OT'),
(31,'Obadiah','Oba',31,1,'OT'),(32,'Jonah','Jon',32,4,'OT'),(33,'Micah','Mic',33,7,'OT'),
(34,'Nahum','Nah',34,3,'OT'),(35,'Habakkuk','Hab',35,3,'OT'),(36,'Zephaniah','Zep',36,3,'OT'),
(37,'Haggai','Hag',37,2,'OT'),(38,'Zechariah','Zec',38,14,'OT'),(39,'Malachi','Mal',39,4,'OT'),
(40,'Matthew','Mat',40,28,'NT'),(41,'Mark','Mrk',41,16,'NT'),(42,'Luke','Luk',42,24,'NT'),
(43,'John','Jhn',43,21,'NT'),(44,'Acts','Act',44,28,'NT'),(45,'Romans','Rom',45,16,'NT'),
(46,'1 Corinthians','1Co',46,16,'NT'),(47,'2 Corinthians','2Co',47,13,'NT'),(48,'Galatians','Gal',48,6,'NT'),
(49,'Ephesians','Eph',49,6,'NT'),(50,'Philippians','Php',50,4,'NT'),(51,'Colossians','Col',51,4,'NT'),
(52,'1 Thessalonians','1Th',52,5,'NT'),(53,'2 Thessalonians','2Th',53,3,'NT'),(54,'1 Timothy','1Ti',54,6,'NT'),
(55,'2 Timothy','2Ti',55,4,'NT'),(56,'Titus','Tit',56,3,'NT'),(57,'Philemon','Phm',57,1,'NT'),
(58,'Hebrews','Heb',58,13,'NT'),(59,'James','Jas',59,5,'NT'),(60,'1 Peter','1Pe',60,5,'NT'),
(61,'2 Peter','2Pe',61,3,'NT'),(62,'1 John','1Jn',62,5,'NT'),(63,'2 John','2Jn',63,1,'NT'),
(64,'3 John','3Jn',64,1,'NT'),(65,'Jude','Jud',65,1,'NT'),(66,'Revelation','Rev',66,22,'NT')
ON DUPLICATE KEY UPDATE id=id;

-- A handful of demo verses so the Bible reader/search have something to show.
-- NOTE: this is only a small starter sample (public-domain KJV text), not the
-- full Bible. Import database/migrations/bible_full.sql for the complete KJV.
INSERT INTO bible_verses (book_id, chapter, verse, text) VALUES
(1,1,1,'In the beginning God created the heaven and the earth.'),
(1,1,2,'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.'),
(1,1,3,'And God said, Let there be light: and there was light.'),
(19,23,1,'The LORD is my shepherd; I shall not want.'),
(19,23,2,'He maketh me to lie down in green pastures: he leadeth me beside the still waters.'),
(19,23,3,'He restoreth my soul: he leadeth me in the paths of righteousness for his name''s sake.'),
(19,23,4,'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.'),
(43,3,16,'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.'),
(20,3,5,'Trust in the LORD with all thine heart; and lean not unto thine own understanding.'),
(20,3,6,'In all thy ways acknowledge him, and he shall direct thy paths.')
ON DUPLICATE KEY UPDATE id=id;

-- Demo library book
INSERT INTO library_books (id, title, author, description) VALUES
(1, 'Steps to Christ', 'Ellen G. White', 'A classic devotional on the path to a relationship with Christ.')
ON DUPLICATE KEY UPDATE id=id;

INSERT INTO library_chapters (book_id, chapter_number, title, content) VALUES
(1, 1, 'God''s Love for Man', 'Add the full chapter text here from the admin form on the Books page, or import database/migrations/library_full.sql for the complete book.')
ON DUPLICATE KEY UPDATE id=id;

-- Demo budget categories / accounts
INSERT INTO budget_categories (name, is_income) VALUES
('Tithe', 1), ('Offering', 1), ('Building Fund', 1),
('Utilities', 0), ('Supplies', 0), ('Outreach', 0)
ON DUPLICATE KEY UPDATE id=id;

INSERT INTO budget_accounts (name, is_off_budget) VALUES
('Cash', 0), ('Church Bank Account', 0), ('Building Fund (restricted)', 1)
ON DUPLICATE KEY UPDATE id=id;

-- Demo event
INSERT INTO events (title, description, event_datetime, location) VALUES
('Sabbath Worship Service', 'Weekly Sabbath worship service.', DATE_ADD(NOW(), INTERVAL (6 - WEEKDAY(NOW())) DAY), 'MAGU SDA Club, Lilongwe')
ON DUPLICATE KEY UPDATE id=id;

-- Demo members
INSERT INTO members (id, full_name, phone, email, membership_status, joined_date) VALUES
(1, 'Grace Banda', '0991234567', 'grace.banda@example.com', 'active', '2023-01-15'),
(2, 'Joseph Phiri', '0888765432', 'joseph.phiri@example.com', 'active', '2022-06-01')
ON DUPLICATE KEY UPDATE id=id;

-- Demo community welcome post from the super admin account
INSERT INTO posts (id, user_id, content) VALUES
(1, 1, 'Welcome to the MAGU SDA Club community feed! Share updates, prayer requests, and encouragement here.')
ON DUPLICATE KEY UPDATE id=id;
