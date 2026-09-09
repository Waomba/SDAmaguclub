import { useEffect, useState, useCallback } from 'react';
import { eventService } from '../services/eventService.js';

// Ported from pages/events.php's listing
export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    eventService.list()
      .then((d) => setEvents(d.events || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  return { events, loading, error, reload: load };
}
