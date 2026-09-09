// Thin re-export so components can `import { useAuth } from '../hooks/useAuth'`
// matching the target folder structure; the real state lives in AuthContext.
export { useAuthContext as useAuth } from '../context/AuthContext.jsx';
