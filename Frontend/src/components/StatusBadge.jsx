import React from 'react';

const colorMap = {
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
};

export default function StatusBadge({ status }) {
  const key = String(status || '').toLowerCase();
  const cls = colorMap[key] || 'bg-gray-100 text-gray-800';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {String(status).charAt(0).toUpperCase() + String(status).slice(1)}
    </span>
  );
}
