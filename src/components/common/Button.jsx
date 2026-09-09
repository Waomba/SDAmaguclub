import React from 'react';

export default function Button({ variant = 'primary', size, block, children, className = '', ...props }) {
  const cls = [
    'btn',
    variant === 'secondary' && 'btn-secondary',
    variant === 'danger' && 'btn-danger',
    size === 'sm' && 'btn-sm',
    block && 'btn-block',
    className,
  ].filter(Boolean).join(' ');
  return <button className={cls} {...props}>{children}</button>;
}
