import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DoctorCard({doctor, clinicId}){
  const navigate = useNavigate();
  const handleBook = () => {
    const docId = doctor._id || doctor.id || '';
    if (clinicId) {
      navigate(`/clinic/${clinicId}/book?doctorId=${docId}`);
    } else {
      navigate(`/appointment/book?doctorId=${docId}`);
    }
  };

  return (
    <div className="flex items-center gap-4 bg-white rounded-lg shadow p-4">
      <img src={doctor.profilePicture || doctor.image || '/images/doctor-placeholder.jpg'} alt={doctor.name} className="w-16 h-16 rounded-full object-cover" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-800">{doctor.name}</div>
            <div className="text-sm text-gray-500">{doctor.specialization || doctor.speciality || ''} • {doctor.experience || 'N/A'} yrs</div>
          </div>
          <div className="text-right">
            <div className="text-green-700 font-semibold">₹{doctor.consultationFee || doctor.fees || '—'}</div>
            <div className="text-sm text-gray-500">Consultation</div>
          </div>
        </div>
        <div className="mt-3 flex gap-3">
          <button onClick={handleBook} className="px-3 py-2 bg-green-600 text-white rounded">Book Appointment</button>
        </div>
      </div>
    </div>
  );
}
