import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { communityService } from '../services/communityService.js';
import EmptyState from '../components/common/EmptyState.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from community/groups.php
export default function CommunityGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const load = () => communityService.groups().then((d) => setGroups(d.groups || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await communityService.createGroup(name, description);
    setName(''); setDescription('');
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
          <div key={g.id} className="card group-card">
            <div>
              <Link to={`/community/groups/${g.id}`}><b>{g.name}</b></Link>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{g.description}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{g.member_count} members</div>
            </div>
            {g.is_member ? (
              <button className="btn btn-sm btn-secondary" onClick={() => handleLeave(g.id)}>Leave</button>
            ) : (
              <button className="btn btn-sm" onClick={() => handleJoin(g.id)}>Join</button>
            )}
          </div>
        ))
      )}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Create a group</h3>
        <form onSubmit={handleCreate}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit" className="btn btn-block">Create</button>
        </form>
      </div>
    </>
  );
}
