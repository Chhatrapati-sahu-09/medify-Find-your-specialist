import React from 'react';

export default function Reviews({ list = [] }){
  const safeList = Array.isArray(list) ? list : [];
  const avg = safeList.length ? (safeList.reduce((s, r) => s + (r.rating || 0), 0) / safeList.length).toFixed(1) : 'N/A';
  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h4 className="text-lg font-semibold mb-3">Reviews</h4>
      <div className="flex items-center gap-4 mb-4">
        <div className="text-3xl font-bold text-gray-800">{avg}</div>
        <div className="text-sm text-gray-600">Based on {safeList.length} reviews</div>
      </div>

      <div className="space-y-3">
        {safeList.length === 0 && <div className="text-gray-500">No reviews yet.</div>}
        {safeList.map((r) => (
          <div key={r._id || r.id || r.name || r.patientName || Math.random()} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{r.name || r.patientName || 'Anonymous'}</div>
              <div className="text-sm text-yellow-500">{'★'.repeat(r.rating || 0)}</div>
            </div>
            <div className="text-sm text-gray-600 mt-2">{r.comment}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
