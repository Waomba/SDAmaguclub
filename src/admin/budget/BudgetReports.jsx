import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { budgetService } from '../../services/budgetService.js';
import BudgetChart from '../../components/budget/BudgetChart.jsx';
import { money } from '../../utils/helpers.js';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/budget/BudgetReports.php
export default function BudgetReports() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { budgetService.summary().then(setSummary).finally(() => setLoading(false)); }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Budget Reports</div>
        <Link to="/admin/budget" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-value">{money(summary.totalIncome)}</div><div className="stat-label">Income</div></div>
        <div className="stat-card"><div className="stat-value">{money(summary.totalExpense)}</div><div className="stat-label">Expenses</div></div>
        <div className="stat-card"><div className="stat-value">{money(summary.balance)}</div><div className="stat-label">Balance</div></div>
      </div>
      <BudgetChart categories={summary.categoryBreakdown || []} />
    </>
  );
}
