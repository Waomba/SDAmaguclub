import React, { useEffect, useState } from 'react';
import WelcomeCard from '../components/dashboard/WelcomeCard.jsx';
import VerseOfDay from '../components/dashboard/VerseOfDay.jsx';
import UpcomingEvents from '../components/dashboard/UpcomingEvents.jsx';
import AttendanceCard from '../components/dashboard/AttendanceCard.jsx';
import { eventService } from '../services/eventService.js';
import { memberService } from '../services/memberService.js';
import { bibleService } from '../services/bibleService.js';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/dashboard.php
export default function Dashboard() {
  const { isAdmin } = useAuth();
  const [nextEvent, setNextEvent] = useState(null);
  const [verse, setVerse] = useState(null);
  const [memberCount, setMemberCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      eventService.list().catch(() => ({ events: [] })),
      isAdmin ? memberService.list().catch(() => ({ members: [] })) : Promise.resolve({ members: [] }),
      bibleService.search('').catch(() => ({ verses: [] })),
    ]).then(([eventsData, membersData]) => {
      const upcoming = (eventsData.events || []).filter((e) => new Date(e.event_datetime) >= new Date());
      setNextEvent(upcoming[0] || null);
      setUpcomingCount(upcoming.length);
      setMemberCount((membersData.members || []).length);
      setVerse(eventsData.verse || null);
      setLoading(false);
    });
  }, [isAdmin]);

  if (loading) return <Loader />;

  return (
    <>
      <WelcomeCard />
      <VerseOfDay verse={verse} />
      <UpcomingEvents event={nextEvent} />
      {isAdmin && <AttendanceCard memberCount={memberCount} upcomingCount={upcomingCount} />}
    </>
  );
}
