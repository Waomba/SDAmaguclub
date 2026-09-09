import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { drawerItems } from '../../data/navigation.js';
import { useAuth } from '../../hooks/useAuth.js';

// Ported from includes/sidebar.php
export default function Sidebar({ profile, open, onClose }) {
  const { pathname } = useLocation();
  const { isAdmin } = useAuth();

  return (
    <>
      <div className={`drawer-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <nav className={`drawer ${open ? 'open' : ''}`}>
        <div className="drawer-header">
          {profile?.logo_url ? (
            <img src={profile.logo_url} alt="logo" className="drawer-logo" />
          ) : (
            <span className="drawer-logo drawer-logo-placeholder">⛪</span>
          )}
          <div>
            <div className="drawer-church-name">{profile?.name || 'MAGU SDA CLUB'}</div>
            <div className="drawer-church-address">{profile?.address || ''}</div>
          </div>
        </div>
        <ul className="drawer-list">
          {drawerItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`drawer-item ${pathname === item.href ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="drawer-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
          <li><hr className="drawer-divider" /></li>
          <li>
            <Link to="/church-profile" className={`drawer-item ${pathname === '/church-profile' ? 'active' : ''}`} onClick={onClose}>
              <span className="drawer-icon">🏛️</span><span>Church Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/website" className={`drawer-item ${pathname === '/website' ? 'active' : ''}`} onClick={onClose}>
              <span className="drawer-icon">🌐</span><span>Website</span>
            </Link>
          </li>
          {isAdmin ? (
            <li>
              <Link to="/admin" className="drawer-item" onClick={onClose}>
                <span className="drawer-icon">🛠️</span><span>Admin Panel</span>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="drawer-item" onClick={onClose}>
                <span className="drawer-icon">🔐</span><span>Admin Login</span>
              </Link>
            </li>
          )}
          <li>
            <a
              href="#"
              className="drawer-item"
              onClick={(e) => {
                e.preventDefault();
                if (navigator.share) {
                  navigator.share({ title: profile?.name || 'MAGU SDA CLUB', url: window.location.origin });
                } else {
                  navigator.clipboard?.writeText(window.location.origin);
                }
              }}
            >
              <span className="drawer-icon">📤</span><span>Share App</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
