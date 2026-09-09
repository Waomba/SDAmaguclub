import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { bottomNavItems } from '../../data/navigation.js';

// New mobile nav bar, added to match the target structure — the original
// PHP app relied solely on the slide-out drawer (Sidebar.jsx) for navigation.
export default function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="bottom-nav">
      {bottomNavItems.map((item) => (
        <Link key={item.href} to={item.href} className={`bottom-nav-item ${pathname === item.href ? 'active' : ''}`}>
          <span className="icon">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
