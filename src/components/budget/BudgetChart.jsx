import React from 'react';
import { money } from '../../utils/helpers.js';

// Ported from the category breakdown bars in pages/church_budget.php.
// Uses a minimal CSS bar chart (no chart.js dependency needed for this shape)
// so it renders identically to the original app's plain progress-bar style.
export default function BudgetChart({ categories }) {
  const safeCategories = Array.isArray(categories) ? categories : [];
  if (!safeCategories.length) return null;
  const max = Math.max(...safeCategories.map((c) => Number(c.total) || 0), 1);
  return (
    <div className="chart-wrap">
      <h3 style={{ marginTop: 0 }}>By Category</h3>
      {safeCategories.map((c) => (
        <div key={c.name} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span>{c.name}</span><span>{money(c.total)}</span>
          </div>
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${((Number(c.total) || 0) / max) * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
}
