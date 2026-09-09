import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { budgetService } from '../../services/budgetService.js';
import IncomeTable from '../../components/budget/IncomeTable.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/budget/Income.php
export default function Income() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { budgetService.transactions().then((d) => setTransactions(d.transactions || [])).finally(() => setLoading(false)); }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Income</div>
        <Link to="/admin/budget" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <IncomeTable transactions={transactions} />
    </>
  );
}
