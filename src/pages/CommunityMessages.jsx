import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { communityService } from '../services/communityService.js';
import MessageList from '../components/community/MessageList.jsx';
import UserPicker from '../components/community/UserPicker.jsx';
import Fab from '../components/common/Fab.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from community/messages.php — "+" FAB opens a user picker to start
// a new conversation, matching the WhatsApp new-chat button.
export default function CommunityMessages() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    communityService.conversations().then((d) => setConversations(d.conversations || [])).finally(() => setLoading(false));
  }, []);

  const handleSelectUser = (userId) => {
    setPickerOpen(false);
    navigate(`/community/messages/${userId}`);
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Messages</div>
        <Link to="/community" className="btn btn-sm btn-secondary">Back to Feed</Link>
      </div>
      <MessageList conversations={conversations} />
      <Fab onClick={() => setPickerOpen(true)} label="New conversation" />
      <UserPicker open={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={handleSelectUser} />
    </>
  );
}
