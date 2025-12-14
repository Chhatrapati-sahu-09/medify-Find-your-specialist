import React, {useState, useMemo, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clinicDetails from '../data/clinicDetails';

const defaultSlots = [
  '10:00 AM','10:30 AM','11:00 AM','11:30 AM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','05:00 PM'
];

export default function AppointmentBooking(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState(clinicDetails[id] || Object.values(clinicDetails)[0]);

  useEffect(()=>{
    if (!id) return;
    let cancelled = false;
    (async ()=>{
      try{
        const res = await fetch(`/api/clinic/${id}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data) setClinic(data);
      }catch(err){
        // keep fallback clinicDetails
        console.warn('Failed to fetch clinic from API', err);
      }
    })();
    return ()=>{ cancelled = true; };
  }, [id]);

  const [selectedDoctor, setSelectedDoctor] = useState(clinic.doctors?.[0]?.id || '');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');

  const selectedDoctorObj = useMemo(()=> clinic.doctors.find(d=>d.id===selectedDoctor) || clinic.doctors[0], [clinic, selectedDoctor]);

  const handleConfirm = async () => {
    const patientId = localStorage.getItem('userId');
    if (!patientId) {
      alert('Please log in as a patient to book an appointment');
      navigate('/auth');
      return;
    }

    const appointmentData = {
      clinicId: clinic._id || clinic.id,
      doctorName: selectedDoctorObj.name,
      doctorSpecialization: selectedDoctorObj.speciality,
      appointmentDate: date,
      appointmentTime: slot,
      reason: reason || 'General consultation'
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to book appointment');
      }

      const bookedAppointment = await res.json();

      // Navigate to payment with appointment data
      navigate('/payment', { state: { appointment: {
        ...bookedAppointment,
        clinicName: clinic.name,
        doctor: selectedDoctorObj,
        patientName,
        phone,
        duration: '30 mins'
      }} });
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book appointment: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: header + form (2/3) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <img
              src={clinic.banner || clinic.profilePicture || clinic.image || '/images/cropped_circle_image (2).png'}
              alt={clinic.name}
              className="w-20 h-20 rounded object-cover object-center"
              onError={(e)=>{ e.target.onerror=null; e.target.src='/images/cropped_circle_image (2).png'; }}
            />
            <div>
              <div className="font-semibold text-lg">{clinic.name}</div>
              <div className="text-sm text-gray-600">{(clinic.speciality || clinic.servicesOffered || []).join(', ')}</div>
              <div className="text-sm text-gray-600">{clinic.address || clinic.clinicAddress || ''} • {clinic.distance || ''}</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Book Appointment</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Select Doctor</label>
                <select value={selectedDoctor} onChange={e=>setSelectedDoctor(e.target.value)} className="w-full p-2 border rounded">
                  {clinic.doctors.map(d=> <option key={d.id} value={d.id}>{d.name} • {d.speciality}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Pick Date</label>
                  <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Pick Time Slot</label>
                  <div className="grid grid-cols-3 gap-2">
                    {defaultSlots.map(s=> (
                      <button
                        key={s}
                        type="button"
                        onClick={()=>setSlot(s)}
                        className={`text-sm p-2 rounded border ${slot===s? 'bg-green-600 text-white':'bg-white'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Patient Name</label>
                <input value={patientName} onChange={e=>setPatientName(e.target.value)} className="w-full p-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full p-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Reason for Visit (Optional)</label>
                <textarea value={reason} onChange={e=>setReason(e.target.value)} className="w-full p-2 border rounded" rows={3} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: summary + confirm (1/3) */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white rounded-lg shadow p-4 sticky top-6">
            <h4 className="font-semibold mb-2">Confirmation Summary</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <div>Doctor: <strong>{selectedDoctorObj?.name}</strong></div>
              <div>Date: <strong>{date || '—'}</strong></div>
              <div>Time: <strong>{slot || '—'}</strong></div>
              <div>Clinic: <strong>{clinic.name}</strong></div>
              <div>Estimated Duration: <strong>30 mins</strong></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="mb-3">
              <div className="font-semibold">Clinic</div>
              <div className="text-sm text-gray-600">{clinic.name}</div>
            </div>
            <img
              src={clinic.banner || clinic.profilePicture || clinic.image || '/images/cropped_circle_image (2).png'}
              alt={clinic.name}
              className="w-full h-40 object-cover object-center rounded-md mb-3"
              onError={(e)=>{ e.target.onerror=null; e.target.src='/images/cropped_circle_image (2).png'; }}
            />
            <div className="text-sm text-gray-600 mb-4">{clinic.address || clinic.clinicAddress || ''}</div>
            <button onClick={handleConfirm} className="w-full bg-green-600 text-white py-3 rounded-lg">Confirm & Pay</button>
          </div>
        </div>
      </div>

      {/* Sticky Confirm on mobile */}
      <div className="fixed bottom-4 left-0 right-0 px-4 md:hidden">
        <div className="max-w-3xl mx-auto">
          <button onClick={handleConfirm} className="w-full bg-green-600 text-white py-3 rounded-lg shadow-lg">Confirm Appointment</button>
        </div>
      </div>
    </div>
  );
}
