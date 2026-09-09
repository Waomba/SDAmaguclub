import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { communityService } from '../services/communityService.js';
import ChatWindow from '../components/community/ChatWindow.jsx';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/common/Loader.jsx';

// Ported from community/group.php
export default function CommunityGroupDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    Promise.all([communityService.group(id), communityService.groupMessages(id)])
      .then(([g, m]) => { setGroup(g.group); setMessages(m.messages || []); })
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [id]);

  const send = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    await communityService.sendGroupMessage(id, body);
    setBody('');
    load();
  };

  if (loading) return <Loader />;
  if (!group) return <p>Group not found.</p>;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>{group.name}</div>
        <Link to="/community/groups" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <ChatWindow messages={messages} currentUserId={user?.id} showSenderName />
      <form style={{ display: 'flex', gap: 8 }} onSubmit={send}>
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Message the group…" style={{ flex: 1 }} />
        <button type="submit" className="btn">Send</button>
      </form>
    </>
  );
}
