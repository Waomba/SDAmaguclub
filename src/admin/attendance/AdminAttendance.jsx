import React from 'react';
import { Link } from 'react-router-dom';
import { useAttendance } from '../../hooks/useAttendance.js';
import AttendanceCard from '../../components/attendance/AttendanceCard.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/attendance/AdminAttendance.php
export default function AdminAttendance() {
  const { events, loading } = useAttendance();
  if (loading) return <Loader />;
  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Attendance</div>
        <Link to="/admin" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      {events.length === 0 ? <EmptyState emoji="✅">No events yet.</EmptyState> : events.map((e) => (
        <div key={e.id}>
          <AttendanceCard event={e} />
          <Link to={`/admin/attendance/record/${e.id}`} className="btn btn-sm" style={{ marginBottom: 12 }}>Record</Link>
        </div>
      ))}
    </>
  );
}
