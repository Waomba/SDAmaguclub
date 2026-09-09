import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { attendanceService } from '../../services/attendanceService.js';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/attendance/RecordAttendance.php
export default function RecordAttendance() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    attendanceService.eventDetail(eventId).then((d) => setRows(d.rows)).finally(() => setLoading(false));
  }, [eventId]);

  const toggle = (memberId) => setRows((r) => r.map((row) => row.member_id === memberId ? { ...row, status: row.status === 'present' ? 'absent' : 'present' } : row));

  const save = async () => {
    setSaving(true);
    try {
      await attendanceService.record(eventId, rows.map((r) => ({ memberId: r.member_id, status: r.status })));
      navigate('/admin/attendance');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Record Attendance</div>
        <Link to="/admin/attendance" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      {rows.map((r) => (
        <div key={r.member_id} className="attendance-row">
          <span>{r.full_name}</span>
          <button className={`btn btn-sm ${r.status === 'present' ? '' : 'btn-secondary'}`} onClick={() => toggle(r.member_id)}>
            {r.status === 'present' ? '✓ Present' : '✗ Absent'}
          </button>
        </div>
      ))}
      <button className="btn btn-block" style={{ marginTop: 14 }} onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
    </>
  );
}
