import React from 'react';
import { money } from '../../utils/helpers.js';
import { formatDate } from '../../utils/dateUtils.js';

// Ported from the expense rows in pages/church_budget.php's transaction table
export default function ExpenseTable({ transactions, onDelete, isAdmin }) {
  const rows = transactions.filter((t) => t.type === 'expense');
  return (
    <table>
      <thead><tr><th>Date</th><th>Category</th><th>Note</th><th>Amount</th>{isAdmin && <th></th>}</tr></thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.id}>
            <td>{formatDate(t.txn_date)}</td>
            <td>{t.category}</td>
            <td>{t.note}</td>
            <td className="pill pill-expense">{money(t.amount)}</td>
            {isAdmin && <td><button className="btn btn-sm btn-danger" onClick={() => onDelete(t.id)}>✕</button></td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
