import React, { useState } from 'react';
import { api } from '../../services/api.js';

// The original PHP app had no password-reset flow (admins were seeded
// directly in the DB). Added here to match the target auth/ folder
// structure, wired to a matching /auth/forgot-password endpoint.
export default function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/forgot-password', { username });
      setSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 380, margin: '40px auto' }}>
      <h2 style={{ marginTop: 0 }}>Forgot Password</h2>
      {sent ? (
        <p>If that account exists, reset instructions have been sent.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <div className="flash flash-error">{error}</div>}
          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <button type="submit" className="btn btn-block">Send reset instructions</button>
        </form>
      )}
    </div>
  );
}
