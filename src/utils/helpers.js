// Ported from includes/functions.php's non-DB helpers (money(), time_ago()).
// h()/redirect()/url()/asset() aren't needed client-side: React escapes text by
// default and react-router-dom handles navigation/URLs.

/** Format a MWK-style currency amount, e.g. money(1250) -> "MK 1,250.00" */
export function money(amount) {
  const n = Number(amount) || 0;
  return 'MK ' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Simple "3h ago" / "2d ago" style relative time for posts, messages, notifications. */
export function timeAgo(datetime) {
  const diff = Math.floor((Date.now() - new Date(datetime).getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  if (diff < 2592000) return Math.floor(diff / 86400) + 'd ago';
  return new Date(datetime).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Truncate a string with an ellipsis, e.g. for message previews. */
export function truncate(str, len = 60) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '…' : str;
}

/** Initials for an avatar circle, e.g. "Jane Doe" -> "J" */
export function initials(name) {
  return (name || '?').trim().charAt(0).toUpperCase();
}
