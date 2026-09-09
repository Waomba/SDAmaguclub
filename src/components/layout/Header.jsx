import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useNotifications } from '../../hooks/useNotifications.js';

// Ported from includes/navbar.php
export default function Header({ profile, onMenuClick }) {
  const { isLoggedIn, user, logout } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <header className="topbar">
      <button className="icon-btn" aria-label="Menu" onClick={onMenuClick}>☰</button>
      <Link to="/" className="brand">
        {profile?.logo_url ? (
          <img src={profile.logo_url} alt="logo" className="brand-logo" />
        ) : (
          <span className="brand-logo brand-logo-placeholder">⛪</span>
        )}
        <span className="brand-name">{profile?.name || 'MAGU SDA CLUB'}</span>
      </Link>
      <div className="topbar-spacer" />
      <Link to="/community" className="icon-btn" title="Community">🗣️</Link>
      {isLoggedIn ? (
        <>
          <Link to="/notifications" className="icon-btn notif-btn" title="Notifications">
            🔔{unreadCount > 0 && <span className="notif-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>}
          </Link>
          <span className="icon-btn" title={`Logged in as ${user?.display_name || ''} (${user?.role || ''})`}>👤</span>
          <button className="icon-btn" title="Log out" onClick={logout}>🚪</button>
        </>
      ) : (
        <Link to="/login" className="icon-btn" title="Admin Login">🔐</Link>
      )}
      <Link to="/settings" className="icon-btn" title="Settings">⚙️</Link>
    </header>
  );
}
