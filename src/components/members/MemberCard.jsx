import React from 'react';
import { Link } from 'react-router-dom';

// Ported from the member row in pages/members.php's listing
export default function MemberCard({ member }) {
  return (
    <Link to={`/members/${member.id}`} className="list-item" style={{ display: 'flex' }}>
      <span>
        {member.full_name}{' '}
        {member.membership_status === 'inactive' && <span className="pill pill-expense">Inactive</span>}
      </span>
      <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{member.phone}</span>
    </Link>
  );
}
