import React, { useState } from 'react';

// Ported from the "Send a message through the site" <details> form in pages/connect_pastor.php
export default function PrayerRequest({ pastorId, onSend }) {
  const [open, setOpen] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSend(pastorId, { senderName, senderContact, message });
    setSenderName(''); setSenderContact(''); setMessage(''); setOpen(false);
  };

  return (
    <details style={{ marginTop: 10 }} open={open} onToggle={(e) => setOpen(e.target.open)}>
      <summary style={{ cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
        Send a message through the site
      </summary>
      <form style={{ marginTop: 10 }} onSubmit={submit}>
        <div className="form-row">
          <div><label>Your name</label><input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} required /></div>
          <div><label>Contact (phone/email)</label><input type="text" value={senderContact} onChange={(e) => setSenderContact(e.target.value)} /></div>
        </div>
        <label>Message / prayer request</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
        <button type="submit" className="btn btn-block">Send</button>
      </form>
    </details>
  );
}
