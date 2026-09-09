import React from 'react';
import { money } from '../../utils/helpers.js';
import { formatDate } from '../../utils/dateUtils.js';

// Ported from the income rows in pages/church_budget.php's transaction table
export default function IncomeTable({ transactions }) {
  const rows = transactions.filter((t) => t.type === 'income');
  return (
    <table>
      <thead><tr><th>Date</th><th>Category</th><th>Note</th><th>Amount</th></tr></thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.id}>
            <td>{formatDate(t.txn_date)}</td>
            <td>{t.category}</td>
            <td>{t.note}</td>
            <td className="pill pill-income">{money(t.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
