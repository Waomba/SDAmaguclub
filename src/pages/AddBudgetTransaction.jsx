import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { budgetService } from '../services/budgetService.js';

// Ported from pages/add_budget_transaction.php
export default function AddBudgetTransaction() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ type: 'income', amount: '', category: '', note: '', txn_date: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { budgetService.categories().then((d) => setCategories(d.categories || [])); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await budgetService.addTransaction(form);
      navigate('/church-budget');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Add Transaction</div>
        <Link to="/church-budget" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="radio-group">
            <label><input type="radio" checked={form.type === 'income'} onChange={() => setForm({ ...form, type: 'income' })} /> Income</label>
            <label><input type="radio" checked={form.type === 'expense'} onChange={() => setForm({ ...form, type: 'expense' })} /> Expense</label>
          </div>
          <div className="form-row">
            <div>
              <label>Amount</label>
              <input type="number" step="0.01" min="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            </div>
            <div>
              <label>Date</label>
              <input type="date" value={form.txn_date} onChange={(e) => setForm({ ...form, txn_date: e.target.value })} required />
            </div>
          </div>
          <label>Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
            <option value="">Select category…</option>
            {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <label>Note</label>
          <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          <button type="submit" className="btn btn-block" disabled={submitting}>{submitting ? 'Saving…' : 'Save Transaction'}</button>
        </form>
      </div>
    </>
  );
}
