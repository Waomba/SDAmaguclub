import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../common/EmptyState.jsx';

// Ported from the participant list in pages/event-details.php
export default function EventAttendance({ participants }) {
  return (
    <>
      <h3>Participants ({participants.length})</h3>
      {participants.length === 0 ? (
        <EmptyState emoji="🙋">No one has joined yet — be the first!</EmptyState>
      ) : (
        participants.map((p) => (
          <Link key={p.id} to={`/members/${p.id}`} className="list-item" style={{ display: 'block' }}>{p.full_name}</Link>
        ))
      )}
    </>
  );
}
