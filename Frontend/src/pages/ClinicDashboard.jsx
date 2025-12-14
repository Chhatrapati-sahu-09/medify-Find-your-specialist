import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';

export default function ClinicDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clinicId = localStorage.getItem('clinicId');
  const clinicName = 'Heart Care Centre'; // This should come from clinic data

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!clinicId) {
        setError('Clinic ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/appointments/clinic/${clinicId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch appointments');
        }

        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [clinicId]);

  const todayAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.appointmentDate.split('T')[0] === today;
  });

  const weeklyAppointments = appointments.filter(apt => {
    const today = new Date();
    const weekFromNow = new Date(today);
    weekFromNow.setDate(today.getDate() + 7);
    const aptDate = new Date(apt.appointmentDate);
    return aptDate >= today && aptDate <= weekFromNow;
  });

  const handleMarkCompleted = async (appointment) => {
    // TODO: Implement mark as completed
    alert('Mark completed: ' + appointment._id);
  };

  const handleViewPatient = (appointment) => {
    alert('View patient: ' + appointment.patientName);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-6xl mx-auto p-6">
        <DashboardHeader title={`Welcome, ${clinicName}`} subtitle={"Today's schedule and clinic overview"} />

        <section className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Today's Appointments</h2>
          <div className="space-y-4">
            {todayAppointments.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center text-gray-500">
                No appointments scheduled for today
              </div>
            ) : (
              todayAppointments.map((appointment) => (
                <div key={appointment._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-600">{appointment.patientPhone}</p>
                      <p className="text-sm text-gray-600">{appointment.patientEmail}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium">{new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.appointmentTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Doctor</p>
                      <p className="font-medium">{appointment.doctorName}</p>
                      <p className="text-sm text-gray-600">{appointment.doctorSpecialization}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Reason for Visit</p>
                    <p className="font-medium">{appointment.reason}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleMarkCompleted(appointment)}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                    >
                      Mark Completed
                    </button>
                    <button
                      onClick={() => handleViewPatient(appointment)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Weekly Appointments</h2>
          <div className="space-y-4">
            {weeklyAppointments.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center text-gray-500">
                No appointments scheduled for this week
              </div>
            ) : (
              weeklyAppointments.map((appointment) => (
                <div key={appointment._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-600">{appointment.patientPhone}</p>
                      <p className="text-sm text-gray-600">{appointment.patientEmail}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium">{new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.appointmentTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Doctor</p>
                      <p className="font-medium">{appointment.doctorName}</p>
                      <p className="text-sm text-gray-600">{appointment.doctorSpecialization}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Reason for Visit</p>
                    <p className="font-medium">{appointment.reason}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleMarkCompleted(appointment)}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                    >
                      Mark Completed
                    </button>
                    <button
                      onClick={() => handleViewPatient(appointment)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}