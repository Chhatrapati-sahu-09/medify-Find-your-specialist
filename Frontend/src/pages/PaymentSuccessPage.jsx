import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppointmentSummaryCard from '../components/AppointmentSummaryCard';
import AppointmentReceiptPDF from '../components/AppointmentReceiptPDF';

export default function PaymentSuccessPage(){
  const { state } = useLocation();
  const navigate = useNavigate();
  const appointment = state?.appointment;

  if(!appointment) return <div className="min-h-screen flex items-center justify-center">No appointment data.</div>;

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Success Status Section - Full width, center aligned */}
        <div className="bg-white rounded-lg shadow p-6 text-center mb-4">
          <div className="text-green-600 text-5xl">✔</div>
          <h2 className="text-2xl font-semibold mt-2">Payment Successful!</h2>
          <p className="text-gray-600">Your appointment has been confirmed.</p>
        </div>

        {/* Main Content Area - Two horizontal columns */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Left Column ~60% - Appointment Summary + Actions */}
          <div className="lg:col-span-6 space-y-6">
            <AppointmentSummaryCard appointment={appointment} />

            {/* Action buttons - horizontally aligned */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = document.querySelector('iframe')?.src || '#';
                    link.download = `appointment_receipt_${appointment.appointmentId || 'unknown'}.pdf`;
                    link.click();
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Download PDF Receipt
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  Go to Home
                </button>
                <button
                  onClick={() => navigate('/clinic/' + (appointment.clinicId || 'c1'))}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  View Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Right Column ~40% - Receipt Preview */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow p-4 h-96 lg:h-[600px] overflow-hidden">
              <h3 className="text-lg font-semibold mb-4 text-center">Receipt Preview</h3>
              <div className="h-full overflow-auto">
                <AppointmentReceiptPDF appointment={appointment} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
