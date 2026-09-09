import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { pastorService } from '../../services/pastorService.js';
import Conversation from '../../components/pastor/Conversation.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/pastor/PastorMessages.php
export default function PastorMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { pastorService.inboxMessages().then((d) => setMessages(d.messages || [])).finally(() => setLoading(false)); }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Pastor Messages</div>
        <Link to="/admin" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      {messages.length === 0 ? <EmptyState emoji="💬">No messages yet.</EmptyState> : messages.map((m) => <Conversation key={m.id} message={m} />)}
    </>
  );
}
