import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { budgetService } from '../../services/budgetService.js';
import ExpenseTable from '../../components/budget/ExpenseTable.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/budget/Expenses.php
export default function Expenses() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => budgetService.transactions().then((d) => setTransactions(d.transactions || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => { await budgetService.deleteTransaction(id); load(); };

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Expenses</div>
        <Link to="/admin/budget" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <ExpenseTable transactions={transactions} isAdmin onDelete={handleDelete} />
    </>
  );
}
