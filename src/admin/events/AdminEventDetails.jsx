import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService.js';
import { formatDateTime } from '../../utils/dateUtils.js';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/events/AdminEventDetails.php
export default function AdminEventDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { eventService.get(id).then(setData).finally(() => setLoading(false)); }, [id]);

  if (loading) return <Loader />;
  if (!data) return <p>Event not found.</p>;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>{data.event.title}</div>
        <Link to="/admin/events" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="card">
        <div>{formatDateTime(data.event.event_datetime)}</div>
        <div>📍 {data.event.location}</div>
        <p>{data.event.description}</p>
      </div>
      <Link to={`/admin/events/${id}/participants`} className="btn btn-sm">View Participants</Link>
      {' '}
      <Link to={`/admin/attendance/record/${id}`} className="btn btn-sm btn-secondary">Record Attendance</Link>
    </>
  );
}
