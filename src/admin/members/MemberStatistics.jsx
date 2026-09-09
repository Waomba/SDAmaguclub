import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { memberService } from '../../services/memberService.js';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/members/MemberStatistics.php
export default function MemberStatistics() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { memberService.list().then((d) => setMembers(d.members || [])).finally(() => setLoading(false)); }, []);

  if (loading) return <Loader />;

  const active = members.filter((m) => m.membership_status === 'active').length;
  const inactive = members.length - active;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Member Statistics</div>
        <Link to="/admin/members" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-value">{members.length}</div><div className="stat-label">Total</div></div>
        <div className="stat-card"><div className="stat-value" style={{ color: 'var(--income)' }}>{active}</div><div className="stat-label">Active</div></div>
        <div className="stat-card"><div className="stat-value" style={{ color: 'var(--expense)' }}>{inactive}</div><div className="stat-label">Inactive</div></div>
      </div>
    </>
  );
}
