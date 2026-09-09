import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

// admin/events/EventAttendance.php duplicated the RecordAttendance flow in the
// original app; here it simply forwards to the shared record-attendance screen.
export default function EventAttendance() {
  const { id } = useParams();
  return <Navigate to={`/admin/attendance/record/${id}`} replace />;
}
