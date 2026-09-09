import React from 'react';
import { dashboardFeatures } from '../../data/navigation.js';
import { Link } from 'react-router-dom';

// Ported from the feature grid in pages/dashboard.php
export default function WelcomeCard() {
  return (
    <>
      <div className="page-title">Welcome</div>
      <div className="feature-grid">
        {dashboardFeatures.map((f) => (
          <Link key={f.label} className="feature-card" to={f.href}>
            <span className="emoji">{f.icon}</span>
            <span className="label">{f.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
