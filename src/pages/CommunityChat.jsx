import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { communityService } from '../services/communityService.js';
import ChatWindow from '../components/community/ChatWindow.jsx';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/common/Loader.jsx';

// Ported from community/chat.php (direct messages)
export default function CommunityChat() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => communityService.directMessages(userId).then((d) => setMessages(d.messages || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, [userId]);

  const send = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    await communityService.sendDirectMessage(userId, body);
    setBody('');
    load();
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Conversation</div>
        <Link to="/community/messages" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <ChatWindow messages={messages} currentUserId={user?.id} />
      <form style={{ display: 'flex', gap: 8 }} onSubmit={send}>
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Type a message…" style={{ flex: 1 }} />
        <button type="submit" className="btn">Send</button>
      </form>
    </>
  );
}
