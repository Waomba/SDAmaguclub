// Ported from pages/church_budget.php, pages/add_budget_transaction.php, pages/manage_accounts.php
import { api } from './api.js';

export const budgetService = {
  summary: () => api.get('/budget/summary'), // { totalIncome, totalExpense, balance, categoryBreakdown }
  transactions: () => api.get('/budget/transactions'),
  addTransaction: (txn) => api.post('/budget/transactions', txn),
  deleteTransaction: (id) => api.del(`/budget/transactions/${id}`),
  categories: () => api.get('/budget/categories'),
  addCategory: (category) => api.post('/budget/categories', category),
  deleteCategory: (id) => api.del(`/budget/categories/${id}`),
  accounts: () => api.get('/budget/accounts'),
  addAccount: (account) => api.post('/budget/accounts', account),
  deleteAccount: (id) => api.del(`/budget/accounts/${id}`),
};
