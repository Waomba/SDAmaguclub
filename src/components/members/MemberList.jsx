import React from 'react';
import MemberCard from './MemberCard.jsx';
import EmptyState from '../common/EmptyState.jsx';

// Ported from pages/members.php's listing loop
export default function MemberList({ members }) {
  if (!members.length) return <EmptyState emoji="👥">No members found.</EmptyState>;
  return <>{members.map((m) => <MemberCard key={m.id} member={m} />)}</>;
}
