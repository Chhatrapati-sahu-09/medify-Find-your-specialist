import React from 'react';

export default function DashboardHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">{title}</h1>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
  );
}
