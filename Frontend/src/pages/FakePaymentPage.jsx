import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import AppointmentSummaryCard from '../components/AppointmentSummaryCard';

export default function FakePaymentPage(){
  const { state } = useLocation();
  const navigate = useNavigate();
  const appointment = state?.appointment;
  const [method, setMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({upi:'', cardNumber:'', name:'', expiry:'', cvv:''});

  const appointmentId = appointment?.appointmentId || ('AP' + Math.floor(Math.random()*900000+100000));

  const pay = () => {
    // simple validation
    if(method==='UPI' && !form.upi){ alert('Enter UPI ID'); return; }
    if((method==='Card' || method==='Credit') && !form.cardNumber){ alert('Enter card number'); return; }
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      navigate('/payment/success', { state: { appointment: {...appointment, appointmentId, paid:99} } });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold">Complete Your Payment</h2>
          <p className="text-gray-600">Secure your appointment by completing a small confirmation fee.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <AppointmentSummaryCard appointment={appointment} />
            <div className="mt-4 bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold mb-2">Payment Options</h4>
              <div className="flex gap-2 flex-wrap">
                <button onClick={()=>setMethod('UPI')} className={`px-3 py-2 rounded ${method==='UPI'? 'bg-green-600 text-white':'bg-white border'}`}>UPI</button>
                <button onClick={()=>setMethod('Card')} className={`px-3 py-2 rounded ${method==='Card'? 'bg-green-600 text-white':'bg-white border'}`}>Debit Card</button>
                <button onClick={()=>setMethod('Credit')} className={`px-3 py-2 rounded ${method==='Credit'? 'bg-green-600 text-white':'bg-white border'}`}>Credit Card</button>
                <button onClick={()=>setMethod('Netbanking')} className={`px-3 py-2 rounded ${method==='Netbanking'? 'bg-green-600 text-white':'bg-white border'}`}>Net Banking</button>
              </div>

              <div className="mt-4">
                {method==='UPI' && (
                  <div>
                    <label className="text-sm text-gray-600">UPI ID</label>
                    <input value={form.upi} onChange={e=>setForm({...form, upi:e.target.value})} className="w-full p-2 border rounded mt-1" placeholder="example@upi" />
                  </div>
                )}

                {(method==='Card' || method==='Credit') && (
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-gray-600">Card Number</label>
                      <input value={form.cardNumber} onChange={e=>setForm({...form, cardNumber:e.target.value})} className="w-full p-2 border rounded mt-1" placeholder="xxxx xxxx xxxx xxxx" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Name on Card</label>
                      <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full p-2 border rounded mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input value={form.expiry} onChange={e=>setForm({...form, expiry:e.target.value})} className="p-2 border rounded" placeholder="MM/YY" />
                      <input value={form.cvv} onChange={e=>setForm({...form, cvv:e.target.value})} className="p-2 border rounded" placeholder="CVV" />
                    </div>
                  </div>
                )}

                {method==='Netbanking' && (
                  <div className="text-sm text-gray-600">Netbanking flow (demo) - no inputs required.</div>
                )}

                <div className="mt-4 text-sm text-gray-500">This is a demo payment. No real transaction will occur.</div>

                <div className="mt-4">
                  <button onClick={pay} className="w-full bg-green-600 text-white py-2 rounded flex items-center justify-center">
                    {loading? (<><Loader size={20} /> <span className="ml-2">Processing...</span></>) : ('Pay ₹99')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold mb-2">Payment Details</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <div><strong>Amount:</strong> ₹99</div>
                <div><strong>Payment for:</strong> Appointment confirmation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
