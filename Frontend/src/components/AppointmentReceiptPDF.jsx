import React, { useEffect, useState, useRef } from 'react';
import { jsPDF } from 'jspdf';

export default function AppointmentReceiptPDF({ appointment }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [filename, setFilename] = useState('appointment_receipt.pdf');
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const generate = async () => {
      if (!appointment) return;
      setLoading(true);
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const left = 40;
      let y = 60;

      doc.setFontSize(18);
      doc.setTextColor('#0f5132');
      doc.text('APPOINTMENT RECEIPT', 297.5, y, { align: 'center' });
      y += 30;

      doc.setFontSize(12);
      doc.setTextColor('#000');

      const rows = [
        ['Appointment ID', appointment.appointmentId || 'N/A'],
        ['Patient Name', appointment.patientName || 'N/A'],
        ['Doctor Name', appointment.doctor?.name || 'N/A'],
        ['Specialization', appointment.doctor?.speciality || 'N/A'],
        ['Clinic Name', appointment.clinicName || 'N/A'],
        ['Clinic Address', appointment.clinicAddress || 'N/A'],
        ['Date & Time', `${appointment.date || ''} ${appointment.slot || ''}`],
        ['Fees Paid', '₹' + (appointment.paid || 99)],
        ['Booking Status', 'Confirmed'],
        ['Generated On', new Date().toLocaleString()],
      ];

      y += 10;
      rows.forEach((r) => {
        doc.setFont(undefined, 'bold');
        doc.text(r[0] + ':', left, y);
        doc.setFont(undefined, 'normal');
        doc.text(String(r[1]), left + 160, y);
        y += 20;
      });

      const idPart = appointment.appointmentId || 'unknown';
      const outFile = `appointment_receipt_${idPart}.pdf`;
      setFilename(outFile);

      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      if (mounted) {
        // release previous url if any
        setPdfUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
        setLoading(false);
      } else {
        URL.revokeObjectURL(url);
      }
    };

    generate();

    return () => {
      mounted = false;
      setLoading(false);
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, [appointment]);

  if (!appointment) return null;

  return (
    <div className="w-full">
      <div className="w-full bg-white border rounded" style={{ minHeight: 400 }}>
        {pdfUrl ? (
          <iframe
            ref={iframeRef}
            title="Appointment Receipt"
            src={pdfUrl}
            style={{ width: '100%', height: 600, border: 'none' }}
          />
        ) : (
          <div className="p-6 text-center text-gray-500">PDF will appear here once generated.</div>
        )}
      </div>
    </div>
  );
}
