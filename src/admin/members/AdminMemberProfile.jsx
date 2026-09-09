import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { memberService } from '../../services/memberService.js';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/members/AdminMemberProfile.php (edit form)
export default function AdminMemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    memberService.get(id).then((d) => setForm(d.member)).finally(() => setLoading(false));
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await memberService.update(id, form);
      navigate('/admin/members');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!form) return <p>Member not found.</p>;

  return (
    <>
      <div className="page-title">Edit Member</div>
      <div className="card">
        <form onSubmit={handleSave}>
          <label>Full name</label>
          <input type="text" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
          <div className="form-row">
            <div><label>Phone</label><input type="tel" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div><label>Email</label><input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          </div>
          <label>Status</label>
          <select value={form.membership_status} onChange={(e) => setForm({ ...form, membership_status: e.target.value })}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <label>Notes</label>
          <textarea value={form.notes || ''} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button type="submit" className="btn btn-block" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
        </form>
      </div>
    </>
  );
}
