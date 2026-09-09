import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { communityService } from '../services/communityService.js';
import MessageList from '../components/community/MessageList.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from community/messages.php
export default function CommunityMessages() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    communityService.conversations().then((d) => setConversations(d.conversations || [])).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Messages</div>
        <Link to="/community" className="btn btn-sm btn-secondary">Back to Feed</Link>
      </div>
      <MessageList conversations={conversations} />
    </>
  );
}
