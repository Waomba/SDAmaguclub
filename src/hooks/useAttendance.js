import { useEffect, useState, useCallback } from 'react';
import { attendanceService } from '../services/attendanceService.js';

// Ported from pages/attendance.php's per-event attendance rate listing
export function useAttendance() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    attendanceService.byEvent()
      .then((d) => setEvents(d.events || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  return { events, loading, error, reload: load };
}
