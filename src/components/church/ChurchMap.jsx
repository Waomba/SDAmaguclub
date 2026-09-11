import React from 'react';

// pages/find_church.php linked out to Google Maps by address (no embedded map);
// this preserves that behavior as a small embed using the same query-by-address approach.
export default function ChurchMap({ address, latitude, longitude }) {
  const query = latitude != null && longitude != null ? `${latitude},${longitude}` : address;
  if (!query) return null;
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <iframe title="map" src={src} width="100%" height="220" style={{ border: 0, display: 'block' }} loading="lazy" />
    </div>
  );
}
