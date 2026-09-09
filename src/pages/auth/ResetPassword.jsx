import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../services/api.js';

// Added to match the target auth/ folder structure — see ForgotPassword.jsx.
export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    try {
      await api.post('/auth/reset-password', { token: params.get('token'), password });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 380, margin: '40px auto' }}>
      <h2 style={{ marginTop: 0 }}>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="flash flash-error">{error}</div>}
        <label htmlFor="password">New password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        <label htmlFor="confirm_password">Confirm password</label>
        <input id="confirm_password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit" className="btn btn-block">Reset Password</button>
      </form>
    </div>
  );
}
