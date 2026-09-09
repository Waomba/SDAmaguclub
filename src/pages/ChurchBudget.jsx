import React, { useEffect, useState } from 'react';
import { budgetService } from '../services/budgetService.js';
import BudgetSummary from '../components/budget/BudgetSummary.jsx';
import BudgetChart from '../components/budget/BudgetChart.jsx';
import IncomeTable from '../components/budget/IncomeTable.jsx';
import ExpenseTable from '../components/budget/ExpenseTable.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/church_budget.php
export default function ChurchBudget() {
  const { isAdmin } = useAuth();
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [tab, setTab] = useState('income');
  const [loading, setLoading] = useState(true);

  const load = () => {
    Promise.all([budgetService.summary(), budgetService.transactions()])
      .then(([s, t]) => {
        setSummary(s || { totalIncome: 0, totalExpense: 0, balance: 0, categoryBreakdown: [] });
        setTransactions(t?.transactions || []);
      })
      .catch(() => {
        setSummary({ totalIncome: 0, totalExpense: 0, balance: 0, categoryBreakdown: [] });
        setTransactions([]);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleDeleteTxn = async (id) => { await budgetService.deleteTransaction(id); load(); };

  if (loading) return <Loader />;

  const safeSummary = summary || { totalIncome: 0, totalExpense: 0, balance: 0, categoryBreakdown: [] };

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Church Budget</div>
        {isAdmin && (
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/church-budget/add" className="btn btn-sm">Add Transaction</Link>
            <Link to="/church-budget/accounts" className="btn btn-sm btn-secondary">Accounts</Link>
          </div>
        )}
      </div>
      <BudgetSummary totalIncome={safeSummary.totalIncome} totalExpense={safeSummary.totalExpense} balance={safeSummary.balance} />
      <BudgetChart categories={safeSummary.categoryBreakdown || []} />
      <div className="tabs">
        <button className={`tab ${tab === 'income' ? 'active' : ''}`} onClick={() => setTab('income')}>Income</button>
        <button className={`tab ${tab === 'expense' ? 'active' : ''}`} onClick={() => setTab('expense')}>Expenses</button>
      </div>
      {tab === 'income'
        ? <IncomeTable transactions={transactions} />
        : <ExpenseTable transactions={transactions} isAdmin={isAdmin} onDelete={handleDeleteTxn} />}
    </>
  );
}
