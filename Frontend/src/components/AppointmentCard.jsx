import React from 'react';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import StatusBadge from './StatusBadge';

export default function AppointmentCard({ appointment, onView, primaryAction }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-semibold">{(appointment.doctorName || appointment.patientName || 'A').charAt(0)}</div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800">{appointment.doctorName || appointment.patientName}</h3>
          <p className="text-xs text-slate-500">{appointment.specialization || appointment.reason || ''}</p>

          <div className="mt-2 text-xs text-slate-500 flex items-center gap-3">
            <span className="flex items-center gap-1"><FiCalendar /> {appointment.date}</span>
            <span className="flex items-center gap-1"><FiClock /> {appointment.time}</span>
            <span className="flex items-center gap-1"><FiMapPin /> {appointment.clinicName}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:flex-col md:items-end">
        <StatusBadge status={appointment.status} />

        <div className="flex gap-2">
          {primaryAction && (
            <button onClick={() => primaryAction(appointment)} className="px-3 py-1 bg-green-600 text-white rounded text-sm">{primaryAction.label || 'Action'}</button>
          )}

          <button onClick={() => onView && onView(appointment)} className="px-3 py-1 bg-white border rounded text-sm">View Details</button>
        </div>
      </div>
    </div>
  );
}
