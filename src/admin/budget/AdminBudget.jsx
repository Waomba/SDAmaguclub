import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { budgetService } from '../../services/budgetService.js';
import BudgetSummary from '../../components/budget/BudgetSummary.jsx';
import BudgetChart from '../../components/budget/BudgetChart.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/budget/AdminBudget.php landing screen
export default function AdminBudget() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { budgetService.summary().then(setSummary).finally(() => setLoading(false)); }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Budget</div>
        <Link to="/admin" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <BudgetSummary totalIncome={summary.totalIncome} totalExpense={summary.totalExpense} balance={summary.balance} />
      <BudgetChart categories={summary.categoryBreakdown || []} />
      <div className="feature-grid">
        <Link to="/admin/budget/income" className="feature-card"><span className="emoji">💵</span><span className="label">Income</span></Link>
        <Link to="/admin/budget/expenses" className="feature-card"><span className="emoji">🧾</span><span className="label">Expenses</span></Link>
        <Link to="/admin/budget/reports" className="feature-card"><span className="emoji">📊</span><span className="label">Reports</span></Link>
        <Link to="/church-budget/accounts" className="feature-card"><span className="emoji">🏦</span><span className="label">Accounts</span></Link>
      </div>
    </>
  );
}
