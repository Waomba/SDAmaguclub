import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { communityService } from '../services/communityService.js';
import { useAuthContext } from './AuthContext.jsx';

// Ported from includes/notifications.php (recent_notifications, unread count for the bell icon)
const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { isLoggedIn } = useAuthContext();
  const [notifications, setNotifications] = useState([]);

  const refresh = useCallback(async () => {
    if (!isLoggedIn) { setNotifications([]); return; }
    try {
      const data = await communityService.notifications();
      setNotifications(data.notifications || []);
    } catch {
      setNotifications([]);
    }
  }, [isLoggedIn]);

  useEffect(() => { refresh(); }, [refresh]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, refresh }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotificationContext must be used within NotificationProvider');
  return ctx;
}
