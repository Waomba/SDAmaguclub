import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../services/eventService.js';
import EventDetails from '../components/events/EventDetails.jsx';
import EventAttendance from '../components/events/EventAttendance.jsx';
import ParticipateButton from '../components/events/ParticipateButton.jsx';
import { formatDateTime } from '../utils/dateUtils.js';
import { useAuth } from '../hooks/useAuth.js';
import { flash } from '../utils/flash.js';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/event-details.php
export default function EventDetailsPage() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => eventService.get(id).then(setData).finally(() => setLoading(false));
  useEffect(() => { load(); }, [id]);

  const handleParticipate = async (fields) => {
    await eventService.participate(id, fields);
    flash("You're on the list!");
    load();
  };

  if (loading) return <Loader />;
  if (!data) return <p>Event not found.</p>;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>{data.event.title}</div>
        <Link to="/events" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <EventDetails event={data.event} formattedDateTime={formatDateTime(data.event.event_datetime)} />
      {!isLoggedIn && <ParticipateButton onParticipate={handleParticipate} />}
      <EventAttendance participants={data.participants || []} />
    </>
  );
}
