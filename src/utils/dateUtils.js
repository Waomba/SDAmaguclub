/** j M Y — e.g. "8 Sep 2026" (used for events, transactions, joined dates) */
export function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

/** D, j M Y \a\t g:i A — e.g. "Tue, 8 Sep 2026 at 6:00 PM" (used for event date/times) */
export function formatDateTime(value) {
  if (!value) return '';
  const d = new Date(value);
  const datePart = d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const timePart = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  return `${datePart} at ${timePart}`;
}

/** g:i A — e.g. "6:04 PM" (used for sabbath sunset times) */
export function formatTime(value) {
  if (!value) return '—';
  return new Date(value).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

/** l, j M Y — e.g. "Friday, 8 Sep 2026" */
export function formatLongDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
}

/** Value for a <input type="datetime-local"> from an ISO/MySQL datetime string. */
export function toDatetimeLocalInput(value) {
  if (!value) return '';
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Today's date as YYYY-MM-DD, for date input defaults. */
export function todayInput() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
