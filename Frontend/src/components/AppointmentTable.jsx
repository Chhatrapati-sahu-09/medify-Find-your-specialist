import React from 'react';
import StatusBadge from './StatusBadge';

export default function AppointmentTable({ appointments = [], onDownload, onBookAgain, actionsRender }) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Doctor / Patient</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Time</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {appointments.map((a) => (
            <tr key={a._id} className="hover:bg-green-50">
              <td className="px-4 py-3 text-sm text-slate-700">{a.doctorName || a.patientName}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{a.date}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{a.time}</td>
              <td className="px-4 py-3 text-sm"><StatusBadge status={a.status} /></td>
              <td className="px-4 py-3 text-sm text-right">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => onDownload && onDownload(a)} className="px-3 py-1 bg-white border rounded text-sm">Download</button>
                  <button onClick={() => onBookAgain && onBookAgain(a)} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Book Again</button>
                  {actionsRender && actionsRender(a)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
