import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { communityService } from '../../services/communityService.js';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/community/Groups.php
export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { communityService.groups().then((d) => setGroups(d.groups || [])).finally(() => setLoading(false)); }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>All Groups</div>
        <Link to="/admin/community" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      {groups.map((g) => (
        <div key={g.id} className="list-item">
          <span>{g.name}</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{g.member_count} members</span>
        </div>
      ))}
    </>
  );
}
