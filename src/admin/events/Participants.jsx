import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService.js';
import EventAttendance from '../../components/events/EventAttendance.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/events/Participants.php
export default function Participants() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { eventService.get(id).then(setData).finally(() => setLoading(false)); }, [id]);

  if (loading) return <Loader />;
  if (!data) return <p>Event not found.</p>;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Participants — {data.event.title}</div>
        <Link to={`/admin/events/${id}`} className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <EventAttendance participants={data.participants || []} />
    </>
  );
}
