import React from 'react';
import { Link } from 'react-router-dom';
import PastorMessages from './PastorMessages.jsx';

// Ported from admin/pastor/Conversations.php — same inbox as PastorMessages.php
// in the original app (a single pastor-message queue, not per-thread conversations).
export default function Conversations() {
  return <PastorMessages />;
}
