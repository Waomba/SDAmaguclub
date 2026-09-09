import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { memberService } from '../services/memberService.js';
import { attendanceService } from '../services/attendanceService.js';
import MemberProfileView from '../components/members/MemberProfile.jsx';
import AttendanceChart from '../components/attendance/AttendanceChart.jsx';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/member-profile.php
export default function MemberProfilePage() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const [member, setMember] = useState(null);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([memberService.get(id), attendanceService.forMember(id).catch(() => ({ rate: null }))])
      .then(([m, a]) => { setMember(m.member); setRate(a.rate); })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!member) return <p>Member not found.</p>;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>{member.full_name}</div>
        <Link to="/members" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <MemberProfileView member={member} isAdmin={isAdmin} />
      <AttendanceChart rate={rate} />
    </>
  );
}
