import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import BottomNav from './BottomNav.jsx';
import { churchService } from '../../services/churchService.js';
import { onFlash } from '../../utils/flash.js';

// Ported from includes/header.php (profile/theme load, topbar+drawer include,
// flash banner) and includes/footer.php (closing markup).
export default function PageLayout({ children }) {
  const [profile, setProfile] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [flashMsg, setFlashMsg] = useState(null);

  useEffect(() => {
    churchService.profile().then(setProfile).catch(() => {});
  }, []);

  useEffect(() => {
    return onFlash((f) => {
      setFlashMsg(f);
      const t = setTimeout(() => setFlashMsg(null), 5000);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <>
      <Header profile={profile} onMenuClick={() => setDrawerOpen(true)} />
      <Sidebar profile={profile} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="content">
        {flashMsg && <div className={`flash flash-${flashMsg.type}`}>{flashMsg.message}</div>}
        {children}
      </main>
      <BottomNav />
    </>
  );
}
