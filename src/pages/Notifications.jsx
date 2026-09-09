import React from 'react';
import { useNotifications } from '../hooks/useNotifications.js';
import NotificationList from '../components/community/NotificationList.jsx';

// Ported from pages/notifications.php
export default function Notifications() {
  const { notifications } = useNotifications();
  return (
    <>
      <div className="page-title">Notifications</div>
      <NotificationList notifications={notifications} />
    </>
  );
}
