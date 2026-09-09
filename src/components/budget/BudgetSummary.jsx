import React from 'react';
import { money } from '../../utils/helpers.js';

// Ported from the stat tiles in pages/church_budget.php
export default function BudgetSummary({ totalIncome = 0, totalExpense = 0, balance = 0 }) {
  return (
    <div className="stat-grid">
      <div className="stat-card">
        <div className="stat-value" style={{ color: 'var(--income)' }}>{money(Number(totalIncome) || 0)}</div>
        <div className="stat-label">Total Income</div>
      </div>
      <div className="stat-card">
        <div className="stat-value" style={{ color: 'var(--expense)' }}>{money(Number(totalExpense) || 0)}</div>
        <div className="stat-label">Total Expenses</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{money(Number(balance) || 0)}</div>
        <div className="stat-label">Balance</div>
      </div>
    </div>
  );
}
