import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents.js';
import { eventService } from '../../services/eventService.js';
import EventList from '../../components/events/EventList.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/events/AdminEvents.php
export default function AdminEvents() {
  const { events, loading, reload } = useEvents();
  const handleDelete = async (id) => { await eventService.remove(id); reload(); };
  if (loading) return <Loader />;
  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Manage Events</div>
        <Link to="/admin" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <EventList events={events} isAdmin onDelete={handleDelete} />
    </>
  );
}
