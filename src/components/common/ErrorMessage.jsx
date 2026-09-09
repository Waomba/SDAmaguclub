import React from 'react';

// Ported from the `.flash-error` styling used for validation errors
export default function ErrorMessage({ children }) {
  if (!children) return null;
  return <div className="flash flash-error">{children}</div>;
}
