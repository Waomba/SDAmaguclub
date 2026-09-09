import { useEffect, useState, useCallback } from 'react';
import { memberService } from '../services/memberService.js';

// Ported from pages/members.php's listing + search query logic
export function useMembers(query = '') {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    memberService.list(query)
      .then((d) => setMembers(d.members || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [query]);

  useEffect(() => { load(); }, [load]);

  return { members, loading, error, reload: load };
}
