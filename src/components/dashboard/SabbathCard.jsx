import React from 'react';
import { formatTime } from '../../utils/dateUtils.js';

// A compact version of pages/sabbath_times.php's hero cards, for use on the dashboard.
export default function SabbathCard({ begins, ends, beginsLabel, endsLabel }) {
  return (
    <div className="sabbath-grid">
      <div className="sabbath-hero">
        <div style={{ fontSize: 12, opacity: .9, fontWeight: 700 }}>SABBATH BEGINS</div>
        <div style={{ fontSize: 13, marginTop: 6 }}>{beginsLabel}</div>
        <div className="big-time">{begins ? formatTime(begins) : '—'}</div>
      </div>
      <div className="sabbath-hero" style={{ background: 'linear-gradient(135deg,#5A6672,#8A97A3)' }}>
        <div style={{ fontSize: 12, opacity: .9, fontWeight: 700 }}>SABBATH ENDS</div>
        <div style={{ fontSize: 13, marginTop: 6 }}>{endsLabel}</div>
        <div className="big-time">{ends ? formatTime(ends) : '—'}</div>
      </div>
    </div>
  );
}
