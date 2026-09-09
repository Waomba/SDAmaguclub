import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme.js';
import { useAuth } from '../hooks/useAuth.js';

// Ported from pages/settings.php
export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { isLoggedIn, isAdmin, user, logout } = useAuth();

  return (
    <>
      <div className="page-title">Settings</div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Appearance</h3>
        <div className="radio-group">
          <label><input type="radio" checked={theme === 'light'} onChange={() => setTheme('light')} /> Light</label>
          <label><input type="radio" checked={theme === 'dark'} onChange={() => setTheme('dark')} /> Dark</label>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Account</h3>
        {isLoggedIn ? (
          <>
            <p>Signed in as <b>{user.display_name}</b> ({user.role})</p>
            <button className="btn btn-secondary" onClick={logout}>Log Out</button>
          </>
        ) : (
          <p><Link to="/login">Log in</Link> or <Link to="/register">create an account</Link>.</p>
        )}
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>More</h3>
        <Link to="/church-profile" className="list-item" style={{ display: 'block' }}>Church Profile</Link>
        <Link to="/website" className="list-item" style={{ display: 'block' }}>Website</Link>
        <Link to="/pathfinders" className="list-item" style={{ display: 'block' }}>Pathfinders</Link>
        {isAdmin && <Link to="/admin" className="list-item" style={{ display: 'block' }}>Admin Panel</Link>}
      </div>
    </>
  );
}
