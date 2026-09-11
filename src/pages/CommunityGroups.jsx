import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { communityService } from '../services/communityService.js';
import EmptyState from '../components/common/EmptyState.jsx';
import Loader from '../components/common/Loader.jsx';
import Modal from '../components/common/Modal.jsx';
import Fab from '../components/common/Fab.jsx';
import { initials } from '../utils/helpers.js';

// Ported from community/groups.php — restyled as a WhatsApp-style chat list;
// the "Create a group" form now opens from the "+" FAB instead of sitting
// inline at the bottom of the page.
export default function CommunityGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const load = () => communityService.groups().then((d) => setGroups(d.groups || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await communityService.createGroup(name, description);
    setName(''); setDescription(''); setCreateOpen(false);
    load();
  };
  const handleJoin = async (id) => { await communityService.joinGroup(id); load(); };
  const handleLeave = async (id) => { await communityService.leaveGroup(id); load(); };

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Groups</div>
        <Link to="/community" className="btn btn-sm btn-secondary">Back to Feed</Link>
      </div>
      {groups.length === 0 ? (
        <EmptyState emoji="👨‍👩‍👧‍👦">No groups yet.</EmptyState>
      ) : (
        groups.map((g) => (
          <div key={g.id} className="chat-list-item">
            <Link to={`/community/groups/${g.id}`} style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0, color: 'inherit' }}>
              <span className="chat-avatar group">{initials(g.name)}</span>
              <span className="chat-info">
                <span className="chat-name">{g.name}</span>
                <span className="chat-preview">{g.description || `${g.member_count} member${g.member_count === 1 ? '' : 's'}`}</span>
              </span>
            </Link>
            {g.is_member ? (
              <button className="btn btn-sm btn-secondary chat-join-btn" onClick={() => handleLeave(g.id)}>Leave</button>
            ) : (
              <button className="btn btn-sm chat-join-btn" onClick={() => handleJoin(g.id)}>Join</button>
            )}
          </div>
        ))
      )}

      <Fab onClick={() => setCreateOpen(true)} label="Create group" />

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create a group">
        <form onSubmit={handleCreate}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit" className="btn btn-block">Create</button>
        </form>
      </Modal>
    </>
  );
}
