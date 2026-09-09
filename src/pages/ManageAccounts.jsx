import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { budgetService } from '../services/budgetService.js';
import EmptyState from '../components/common/EmptyState.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/manage_accounts.php
export default function ManageAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountName, setAccountName] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const load = () => {
    Promise.all([budgetService.accounts(), budgetService.categories()])
      .then(([a, c]) => { setAccounts(a.accounts || []); setCategories(c.categories || []); })
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const addAccount = async (e) => { e.preventDefault(); await budgetService.addAccount({ name: accountName }); setAccountName(''); load(); };
  const addCategory = async (e) => { e.preventDefault(); await budgetService.addCategory({ name: categoryName }); setCategoryName(''); load(); };
  const deleteAccount = async (id) => { await budgetService.deleteAccount(id); load(); };
  const deleteCategory = async (id) => { await budgetService.deleteCategory(id); load(); };

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Manage Accounts &amp; Categories</div>
        <Link to="/church-budget" className="btn btn-sm btn-secondary">Back</Link>
      </div>

      <div className="two-col">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Accounts</h3>
          {accounts.length === 0 ? <EmptyState emoji="🏦">No accounts yet.</EmptyState> : accounts.map((a) => (
            <div key={a.id} className="list-item">{a.name}<button className="btn btn-sm btn-danger" onClick={() => deleteAccount(a.id)}>✕</button></div>
          ))}
          <form onSubmit={addAccount} style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="New account name" required />
            <button type="submit" className="btn btn-sm">Add</button>
          </form>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Categories</h3>
          {categories.length === 0 ? <EmptyState emoji="🏷️">No categories yet.</EmptyState> : categories.map((c) => (
            <div key={c.id} className="list-item">{c.name}<button className="btn btn-sm btn-danger" onClick={() => deleteCategory(c.id)}>✕</button></div>
          ))}
          <form onSubmit={addCategory} style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="New category name" required />
            <button type="submit" className="btn btn-sm">Add</button>
          </form>
        </div>
      </div>
    </>
  );
}
