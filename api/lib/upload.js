// Ported from the file-upload handling scattered across pages/gallery.php,
// pages/church_profile.php, and community/feed.php (move_uploaded_file() calls).
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';

const uploadDir = path.join(process.cwd(), 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

export const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } });

export function fileUrl(req, filename) {
  if (!filename) return null;
  return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
}
