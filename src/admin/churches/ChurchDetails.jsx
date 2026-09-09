import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { churchService } from '../../services/churchService.js';
import ChurchMap from '../../components/church/ChurchMap.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/churches/ChurchDetails.php
export default function ChurchDetails() {
  const { id } = useParams();
  const [church, setChurch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    churchService.others().then((d) => setChurch((d.churches || []).find((c) => String(c.id) === String(id)))).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!church) return <p>Church not found.</p>;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>{church.name}</div>
        <Link to="/admin/churches" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="card">
        <div>{church.address}</div>
        {church.phone && <div>📞 {church.phone}</div>}
      </div>
      <ChurchMap address={church.address} />
    </>
  );
}
