// Ported from pages/sabbath_times.php's sunset-time calculation. The original
// PHP used a fixed lat/lng for the church (Malawi) with a basic sunset
// formula; this keeps that approach and accepts an optional override from
// the browser's geolocation.
import { Router } from 'express';

const router = Router();

// Simplified sunset calculation (NOAA-style approximation), good enough for
// "roughly what time does the sun go down" without an external API/key.
function sunsetUTC(date, lat, lng) {
  const rad = Math.PI / 180;
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  const decl = 23.44 * Math.sin(rad * (360 / 365) * (dayOfYear - 81));
  const latRad = lat * rad;
  const declRad = decl * rad;
  const cosHourAngle = -Math.tan(latRad) * Math.tan(declRad);
  const clamped = Math.max(-1, Math.min(1, cosHourAngle));
  const hourAngle = Math.acos(clamped) / rad;
  const solarNoonUTC = 12 - lng / 15;
  const sunsetHourUTC = solarNoonUTC + hourAngle / 15;
  const result = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  result.setUTCHours(0, 0, 0, 0);
  result.setUTCMinutes(Math.round(sunsetHourUTC * 60));
  return result;
}

router.get('/sabbath-times', (req, res) => {
  const lat = parseFloat(req.query.lat) || -15.79; // default: Blantyre, Malawi
  const lng = parseFloat(req.query.lng) || 35.0;

  const now = new Date();
  const day = now.getDay(); // 0=Sun..6=Sat
  const daysToFriday = (5 - day + 7) % 7;
  const friday = new Date(now); friday.setDate(now.getDate() + daysToFriday);
  const saturday = new Date(friday); saturday.setDate(friday.getDate() + 1);

  res.json({
    date: now.toISOString(),
    begins: sunsetUTC(friday, lat, lng).toISOString(),
    ends: sunsetUTC(saturday, lat, lng).toISOString(),
  });
});

export default router;
