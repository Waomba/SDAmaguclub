import React, { useState } from 'react';
import { useEvents } from '../hooks/useEvents.js';
import EventList from '../components/events/EventList.jsx';
import { eventService } from '../services/eventService.js';
import { useAuth } from '../hooks/useAuth.js';
import { toDatetimeLocalInput } from '../utils/dateUtils.js';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/events.php
export default function Events() {
  const { events, loading, reload } = useEvents();
  const { isAdmin } = useAuth();
  const [form, setForm] = useState({ title: '', event_datetime: '', location: '', description: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async (id) => { await eventService.remove(id); reload(); };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await eventService.create(form);
      setForm({ title: '', event_datetime: '', location: '', description: '' });
      reload();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="page-title">Events & Activities</div>
      <EventList events={events} isAdmin={isAdmin} onDelete={handleDelete} />
      {isAdmin && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Add Event</h3>
          <form onSubmit={handleCreate}>
            <label>Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <div className="form-row">
              <div>
                <label>Date &amp; time</label>
                <input type="datetime-local" value={form.event_datetime} onChange={(e) => setForm({ ...form, event_datetime: e.target.value })} required />
              </div>
              <div>
                <label>Location</label>
                <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
            </div>
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button type="submit" className="btn btn-block" disabled={submitting}>{submitting ? 'Adding…' : 'Add Event'}</button>
          </form>
        </div>
      )}
    </>
  );
}
