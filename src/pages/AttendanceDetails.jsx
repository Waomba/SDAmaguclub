import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { attendanceService } from '../services/attendanceService.js';
import AttendanceTable from '../components/attendance/AttendanceTable.jsx';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/attendance-details.php
export default function AttendanceDetails() {
  const { eventId } = useParams();
  const { isAdmin } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    attendanceService.eventDetail(eventId).then(setData).finally(() => setLoading(false));
  }, [eventId]);

  const toggle = (memberId) => {
    setData((d) => ({
      ...d,
      rows: d.rows.map((r) => r.member_id === memberId ? { ...r, status: r.status === 'present' ? 'absent' : 'present' } : r),
    }));
  };

  const save = async () => {
    setSaving(true);
    try {
      await attendanceService.update(eventId, data.rows.map((r) => ({ memberId: r.member_id, status: r.status })));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!data) return <p>Event not found.</p>;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>{data.event.title}</div>
        <Link to="/attendance" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      {isAdmin ? (
        <>
          {data.rows.map((r) => (
            <div key={r.member_id} className="attendance-row">
              <span>{r.full_name}</span>
              <button
                className={`btn btn-sm ${r.status === 'present' ? '' : 'btn-secondary'}`}
                onClick={() => toggle(r.member_id)}
              >
                {r.status === 'present' ? '✓ Present' : '✗ Absent'}
              </button>
            </div>
          ))}
          <button className="btn btn-block" style={{ marginTop: 14 }} onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save Attendance'}
          </button>
        </>
      ) : (
        <AttendanceTable rows={data.rows} />
      )}
    </>
  );
}
