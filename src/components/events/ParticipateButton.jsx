import React, { useState } from 'react';

// Ported from the "Participate" form in pages/event-details.php
export default function ParticipateButton({ onParticipate }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Participate</h3>
      <form onSubmit={(e) => { e.preventDefault(); onParticipate({ fullName, phone }); }}>
        <div className="form-row">
          <div>
            <label htmlFor="full_name">Your name</label>
            <input id="full_name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="phone">Phone (optional)</label>
            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn btn-block">I'll be there</button>
      </form>
    </div>
  );
}
