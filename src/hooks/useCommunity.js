import { useEffect, useState, useCallback } from 'react';
import { communityService } from '../services/communityService.js';

// Ported from community/feed.php's post + comment + reaction loading
export function useCommunity() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    communityService.posts()
      .then((d) => setPosts(d.posts || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  return { posts, loading, error, reload: load };
}
