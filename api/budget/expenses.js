// Expense rows share the same budget_transactions table + endpoints as
// income.js (see income.js's /transactions routes) — the original
// pages/church_budget.php handled both types in one script, distinguished
// by a `type` column. Kept as a separate file to match the target
// api/budget/expenses.php filename.
export { default } from './income.js';
