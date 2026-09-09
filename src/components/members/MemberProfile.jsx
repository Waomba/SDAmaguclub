import React from 'react';
import { formatDate } from '../../utils/dateUtils.js';

// Ported from the read-only view in pages/member-profile.php
export default function MemberProfile({ member, isAdmin }) {
  return (
    <div className="card">
      {member.phone && <div>📞 {member.phone}</div>}
      {member.email && <div>✉️ {member.email}</div>}
      <div>
        Status:{' '}
        <span className={`pill ${member.membership_status === 'active' ? 'pill-income' : 'pill-expense'}`}>
          {member.membership_status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </div>
      {member.joined_date && <div>Joined: {formatDate(member.joined_date)}</div>}
      {isAdmin && member.notes && <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>{member.notes}</div>}
    </div>
  );
}
