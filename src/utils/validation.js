export function isRequired(value) {
  return typeof value === 'string' ? value.trim() !== '' : value !== null && value !== undefined;
}

export function minLength(value, len) {
  return (value || '').length >= len;
}

export function passwordsMatch(a, b) {
  return a === b;
}

export function isPositiveAmount(value) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0;
}
