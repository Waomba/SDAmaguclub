import React, { useEffect, useState } from 'react';
import { settingsService } from '../services/settingsService.js';
import { formatTime, formatLongDate } from '../utils/dateUtils.js';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/sabbath_times.php
export default function SabbathTimes() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geoError, setGeoError] = useState('');

  const load = (lat, lng) => {
    setLoading(true);
    settingsService.sabbathTimes(lat, lng).then(setData).finally(() => setLoading(false));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => load(pos.coords.latitude, pos.coords.longitude),
        () => { setGeoError('Using default location — enable location for times specific to you.'); load(); }
      );
    } else {
      load();
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="page-title">Sabbath Times</div>
      {geoError && <p className="page-subtitle">{geoError}</p>}
      <p className="page-subtitle">{data?.date ? formatLongDate(data.date) : ''}</p>
      <div className="sabbath-grid">
        <div className="sabbath-hero">
          <div style={{ fontSize: 12, opacity: .9, fontWeight: 700 }}>SABBATH BEGINS (Friday sunset)</div>
          <div className="big-time">{data?.begins ? formatTime(data.begins) : '—'}</div>
        </div>
        <div className="sabbath-hero" style={{ background: 'linear-gradient(135deg,#5A6672,#8A97A3)' }}>
          <div style={{ fontSize: 12, opacity: .9, fontWeight: 700 }}>SABBATH ENDS (Saturday sunset)</div>
          <div className="big-time">{data?.ends ? formatTime(data.ends) : '—'}</div>
        </div>
      </div>
    </>
  );
}
