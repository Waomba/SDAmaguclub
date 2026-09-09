import React from 'react';
import { useAttendance } from '../hooks/useAttendance.js';
import AttendanceCard from '../components/attendance/AttendanceCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/attendance.php
export default function Attendance() {
  const { events, loading } = useAttendance();

  if (loading) return <Loader />;

  return (
    <>
      <div className="page-title">Attendance</div>
      {events.length === 0 ? (
        <EmptyState emoji="✅">No events with attendance yet.</EmptyState>
      ) : (
        events.map((e) => <AttendanceCard key={e.id} event={e} />)
      )}
    </>
  );
}
