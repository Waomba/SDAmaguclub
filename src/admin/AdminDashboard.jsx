import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService.js';
import { adminSections } from '../data/navigation.js';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader.jsx';

// Ported from admin/dashboard.php
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.stats().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="page-title">Admin Panel</div>
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-value">{stats.memberCount}</div><div className="stat-label">Members</div></div>
        <div className="stat-card"><div className="stat-value">{stats.eventCount}</div><div className="stat-label">Events</div></div>
        <div className="stat-card"><div className="stat-value">{stats.postCount}</div><div className="stat-label">Posts</div></div>
        <div className="stat-card"><div className="stat-value">MK {Number(stats.balance || 0).toLocaleString()}</div><div className="stat-label">Balance</div></div>
      </div>
      <div className="feature-grid">
        {adminSections.map((s) => (
          <Link key={s.href} to={s.href} className="feature-card">
            <span className="emoji">{s.icon}</span>
            <span className="label">{s.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
