import { API_URL } from '../utils/constants.js';

/**
 * Thin fetch wrapper matching the original api/_bootstrap.php conventions:
 * JSON in, JSON out, `{ error: "..." }` on failure. `credentials: 'include'`
 * carries the session cookie the same way PHP's $_SESSION did.
 */
async function request(path, { method = 'GET', body, isForm = false } = {}) {
  const opts = {
    method,
    credentials: 'include',
    headers: isForm ? {} : { 'Content-Type': 'application/json' },
  };
  if (body !== undefined) {
    opts.body = isForm ? body : JSON.stringify(body);
  }
  const res = await fetch(`${API_URL}${path}`, opts);
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const message = (data && data.error) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  postForm: (path, formData) => request(path, { method: 'POST', body: formData, isForm: true }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  del: (path, body) => request(path, { method: 'DELETE', body }),
};
