# MAGU SDA CLUB — sda-clubweb

React (Vite) + Node/Express + MySQL rebuild of the original PHP/MySQL
"magusdaclub_web" app, restructured to match the `sda-clubweb` project
layout: `src/components`, `src/pages`, `src/admin`, `src/services`,
`src/context`, `src/hooks`, `src/routes`, `src/utils`, `src/data`, plus an
`api/` backend and `database/` schema — in place of the original app's
`pages/`, `includes/`, `admin/`, `community/`, and `api/*.php` files.

## What changed, and why

- **Frontend**: every PHP page became a React page/component (see the
  "Ported from ..." comment at the top of each file for its original
  source). Server-rendered `<form method="post">` flows became `fetch`
  calls through `src/services/*.js`; PHP sessions became a `req.session`
  cookie read by `src/context/AuthContext.jsx`.
- **Backend**: `api/server.js` is an Express app that mirrors the original
  `api/*.php` + inline page logic as REST endpoints, using the exact same
  MySQL schema (`database/schema.sql`, unchanged from the original
  `database/churchweb.sql`) so existing data/imports still work.
- **Auth**: PHP's `password_hash()`/`password_verify()` → `bcryptjs`;
  `$_SESSION` → `express-session`.
- **File uploads**: PHP's `move_uploaded_file()` → `multer`, saving to
  `api/uploads/` and served at `/uploads/...`.

## Running it

**Backend**
```
cd api
npm install
cp .env.example ../.env   # then edit api/.env — see below
npm run dev                # http://localhost:4000
```
Create `api/.env` (see `.env.example` at the project root for the values
to copy in) pointing at a MySQL server, then import the schema:
```
mysql -u root -p < database/schema.sql
# optional, for full Bible/library text:
mysql -u root -p magusdaclub < database/migrations/bible_full.sql
mysql -u root -p magusdaclub < database/migrations/library_full.sql
```
Default seeded accounts (from schema.sql — **change these after first
login**): `superadmin` / `superadmin123` and `admin` / `admin123`.

**Frontend**
```
npm install
npm run dev                # http://localhost:5173, proxies /api to :4000
```

## Notes

- `src/pages/auth/ForgotPassword.jsx` / `ResetPassword.jsx` are new — the
  original app had no self-service reset flow (admins were seeded
  directly into the DB). The backend endpoints exist but the reset step
  isn't wired to an email service; see `api/auth/index.js`.
- `src/components/layout/BottomNav.jsx` is new — the original app relied
  solely on the slide-out drawer (`Sidebar.jsx`) for navigation.
# SDAmaguclub
