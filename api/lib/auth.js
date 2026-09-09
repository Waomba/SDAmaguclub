// Ported from config/permissions.php's is_logged_in()/is_admin()/is_super_admin()
// + require_login()/require_admin()/require_super_admin(), now as Express middleware
// backed by express-session instead of raw $_SESSION.
export function requireLogin(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: 'You must be logged in.' });
  next();
}

export function requireAdmin(req, res, next) {
  if (!req.session.userId || !['admin', 'super_admin'].includes(req.session.role)) {
    return res.status(403).json({ error: 'Admin access required.' });
  }
  next();
}

export function requireSuperAdmin(req, res, next) {
  if (!req.session.userId || req.session.role !== 'super_admin') {
    return res.status(403).json({ error: 'Super admin access required.' });
  }
  next();
}
