import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService.js';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/events/EventStatistics.php
export default function EventStatistics() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { eventService.get(id).then(setData).finally(() => setLoading(false)); }, [id]);

  if (loading) return <Loader />;
  if (!data) return <p>Event not found.</p>;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Stats — {data.event.title}</div>
        <Link to={`/admin/events/${id}`} className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-value">{(data.participants || []).length}</div><div className="stat-label">Participants</div></div>
      </div>
    </>
  );
}
