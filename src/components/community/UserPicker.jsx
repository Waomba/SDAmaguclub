import React, { useEffect, useState } from 'react';
import Modal from '../common/Modal.jsx';
import Loader from '../common/Loader.jsx';
import EmptyState from '../common/EmptyState.jsx';
import { communityService } from '../../services/communityService.js';
import { initials } from '../../utils/helpers.js';

// User picker for starting a new direct message — opened from the Messages
// screen's "+" FAB. The original app had no such flow (DMs only started via
// replying to an existing thread).
export default function UserPicker({ open, onClose, onSelect }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    communityService.users().then((d) => setUsers(d.users || [])).finally(() => setLoading(false));
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} title="New Conversation">
      {loading ? <Loader /> : users.length === 0 ? (
        <EmptyState emoji="👤">No other members yet.</EmptyState>
      ) : (
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {users.map((u) => (
            <button
              key={u.id}
              className="chat-list-item"
              style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer' }}
              onClick={() => onSelect(u.id)}
            >
              <span className="chat-avatar">{initials(u.display_name)}</span>
              <span className="chat-info">
                <span className="chat-name">{u.display_name}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}
