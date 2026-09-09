import React, { useEffect, useState } from 'react';
import { pastorService } from '../services/pastorService.js';
import PastorCard from '../components/pastor/PastorCard.jsx';
import PrayerRequest from '../components/pastor/PrayerRequest.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { flash } from '../utils/flash.js';
import EmptyState from '../components/common/EmptyState.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/connect_pastor.php
export default function ConnectPastor() {
  const { isAdmin } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => pastorService.list().then((d) => setContacts(d.contacts || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => { await pastorService.remove(id); load(); };
  const handleSend = async (pastorId, fields) => {
    await pastorService.sendMessage(pastorId, fields);
    flash('Your message has been sent.');
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="page-title">Connect with Pastor</div>
      {contacts.length === 0 ? (
        <EmptyState emoji="💬">No pastor contacts added yet.</EmptyState>
      ) : (
        contacts.map((p) => (
          <PastorCard key={p.id} pastor={p} isAdmin={isAdmin} onDelete={handleDelete}>
            <PrayerRequest pastorId={p.id} onSend={handleSend} />
          </PastorCard>
        ))
      )}
    </>
  );
}
