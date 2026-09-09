import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

// Ported from community/register.php
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setSubmitting(true);
    setError('');
    try {
      await register({ username, displayName, password, confirmPassword });
      navigate('/community');
    } catch (err) {
      setError(err.message || 'Could not create your account.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 380, margin: '40px auto' }}>
      <h2 style={{ marginTop: 0 }}>Create Account</h2>
      <ErrorMessage>{error}</ErrorMessage>
      <form onSubmit={handleSubmit}>
        <label htmlFor="display_name">Display name</label>
        <input id="display_name" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        <label htmlFor="confirm_password">Confirm password</label>
        <input id="confirm_password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit" className="btn btn-block" disabled={submitting}>{submitting ? 'Creating…' : 'Register'}</button>
      </form>
      <p className="page-subtitle" style={{ textAlign: 'center', marginTop: 16 }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
