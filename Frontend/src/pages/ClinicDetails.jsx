import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import Reviews from '../components/Reviews';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Haversine distance (km)
function haversine(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function ClinicDetails(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearby, setNearby] = useState([]);
  const [activePos, setActivePos] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/clinic/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch clinic');
        return res.json();
      })
      .then((data) => {
        setClinic(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error');
        setLoading(false);
      });
  }, [id]);

  // fetch nearby clinics once clinic loaded
  useEffect(() => {
    if (!clinic || !clinic.location || !clinic.location.lat) return;
    fetch('/api/search')
      .then((r) => r.json())
      .then((all) => {
        const others = (all || [])
          .filter(c => c._id !== clinic._id && c.location && c.location.lat && c.location.lng)
          .map(c => ({
            ...c,
            distanceKm: haversine(clinic.location.lat, clinic.location.lng, c.location.lat, c.location.lng)
          }))
          .filter(c => c.distanceKm <= 5) // within 5km
          .sort((a,b)=>a.distanceKm-b.distanceKm);
        setNearby(others);
      })
      .catch(()=>setNearby([]));
  }, [clinic]);

  // pan/center map when a nearby item is activated
  useEffect(() => {
    if (!activePos || !mapRef.current) return;
    try {
      mapRef.current.setView(activePos, 14);
    } catch (e) {
      // ignore if map not ready
    }
  }, [activePos]);

  // cleanup Leaflet map instance when component unmounts or clinic changes
  useEffect(() => {
    return () => {
      if (mapRef.current && typeof mapRef.current.remove === 'function') {
        try {
          mapRef.current.remove();
        } catch (e) {
          // ignore removal errors
        }
        mapRef.current = null;
      }
    };
  }, [id]);

  // review form state
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [revLoading, setRevLoading] = useState(false);
  const [revError, setRevError] = useState(null);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!clinic || !clinic._id) return;
    setRevError(null);
    setRevLoading(true);
    try {
      const res = await fetch(`/api/clinic/${clinic._id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: revName || 'Anonymous', rating: revRating, comment: revComment })
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to submit review');
      }
      const data = await res.json();
      // optimistic update
      const newRev = { name: (revName || 'Anonymous'), rating: revRating, comment: revComment };
      setClinic({ ...clinic, reviews: [newRev, ...(clinic.reviews || [])], rating: data.rating || clinic.rating });
      setRevName(''); setRevRating(5); setRevComment('');
    } catch (err) {
      setRevError(err.message || 'Error');
    } finally {
      setRevLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen p-6">Loading clinic...</div>;
  if (error) return <div className="min-h-screen p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header / Banner */}
        <div className="bg-white rounded-lg overflow-hidden shadow mb-6">
          <div className="relative">
                <img src={clinic.banner || clinic.profilePicture || '/images/clinic-banner.jpg'} alt={clinic.clinicName || clinic.name} className="w-full h-56 md:h-64 object-cover object-center" style={{maxHeight: 320}} onError={(e)=>{ e.target.onerror=null; e.target.src='/images/clinic-banner.jpg'; }} />
            <div className="absolute left-6 bottom-6 bg-white bg-opacity-90 p-4 rounded-lg shadow">
              <h1 className="text-2xl font-semibold">{clinic.clinicName || clinic.name}</h1>
              <div className="flex items-center gap-3 mt-1 text-gray-700">
                <div className="flex items-center gap-2 text-yellow-500">{'★'.repeat(Math.round(clinic.rating || 0))} <span className="text-gray-600">{clinic.rating || 0} | {clinic.reviews?.length || 0} reviews</span></div>
                <div className="text-sm text-gray-600">{(clinic.servicesOffered || clinic.speciality || []).join(', ')}</div>
                <div className="text-sm text-gray-600">• {clinic.distance || ''}</div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className={`px-3 py-1 rounded ${clinic.open? 'bg-green-600 text-white':'bg-gray-400 text-white'}`}>{clinic.open? 'Open Now':'Closed'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* About + Doctors + Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold mb-2">About Clinic</h3>
              <p className="text-gray-700">{clinic.description}</p>
              <div className="mt-3 text-sm text-gray-600">Years of service: <strong>{clinic.yearsOfService || clinic.years || 0} years</strong></div>
              <div className="mt-3">
                <div className="font-medium mb-1">Infrastructure highlights</div>
                <ul className="list-disc list-inside text-gray-600">
                  {(clinic.infrastructure || []).map((i,idx)=>(<li key={idx}>{i}</li>))}
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold mb-3">Doctors at This Clinic</h3>
              <div className="space-y-3">
                {(clinic.doctors || []).map((d)=> <DoctorCard key={d._id || d.id || d.email || Math.random()} doctor={d} clinicId={clinic._id} />)}
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold mb-3">Services / Treatments Offered</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(clinic.servicesOffered || clinic.services || []).map(s=> (
                  <div key={s} className="flex items-center gap-2 p-2 border rounded">
                    <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2v20M2 12h20" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="text-sm text-gray-700">{s}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold mb-3">Facilities</h3>
              <div className="flex flex-wrap gap-3">
                {(clinic.facilities || []).map(f=> (
                  <div key={f} className="px-3 py-1 bg-green-50 text-green-700 rounded">{f}</div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold mb-3">Map</h3>
              {clinic.location?.lat && clinic.location?.lng ? (
                <div className="w-full h-60 rounded overflow-hidden relative">
                  <MapContainer key={`map-${clinic._id}`} whenCreated={(map)=>{ mapRef.current = map; }} center={[clinic.location.lat, clinic.location.lng]} zoom={13} scrollWheelZoom={false} className="w-full h-60">
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* main clinic marker */}
                    <Marker position={[clinic.location.lat, clinic.location.lng]} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png', iconSize: [25,41], iconAnchor: [12,41] })}>
                      <Popup>
                        {clinic.clinicName || clinic.name}<br />{clinic.clinicAddress}
                      </Popup>
                    </Marker>

                    {/* nearby clinics markers */}
                    {nearby.map(n => (
                      <Marker key={n._id} position={[n.location.lat, n.location.lng]} eventHandlers={{ click: ()=> { setActivePos([n.location.lat, n.location.lng]); if(mapRef.current) mapRef.current.setView([n.location.lat, n.location.lng],14); } }}>
                        <Popup>
                          {n.clinicName}<br />{n.clinicAddress}<br />{n.distanceKm.toFixed(2)} km
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>

                  {/* small legend overlay */}
                  <div className="absolute top-2 right-2 bg-white bg-opacity-90 p-2 rounded shadow max-h-44 overflow-auto text-sm w-56">
                    <div className="font-semibold">Nearby clinics ({nearby.length})</div>
                    {nearby.length===0 && <div className="text-gray-500">No clinics within 5 km.</div>}
                    <ul className="mt-2 space-y-1">
                      {nearby.map(n => (
                        <li key={n._id} className="flex items-center justify-between">
                          <button className="text-left text-sm text-blue-600 hover:underline" onClick={()=>{ setActivePos([n.location.lat, n.location.lng]); if(mapRef.current) mapRef.current.setView([n.location.lat, n.location.lng],14); }}>{n.clinicName}</button>
                          <span className="text-gray-600 text-xs">{n.distanceKm.toFixed(1)} km</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              ) : (
                <div className="w-full h-60 bg-gray-100 rounded flex items-center justify-center text-gray-500">Map placeholder (lat: {clinic.location?.lat}, lng: {clinic.location?.lng})</div>
              )}
            </section>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
                <form onSubmit={submitReview} className="space-y-3">
                  <div>
                    <label className="text-sm">Name</label>
                    <input value={revName} onChange={(e)=>setRevName(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm">Rating</label>
                    <select value={revRating} onChange={(e)=>setRevRating(Number(e.target.value))} className="w-full mt-1 p-2 border rounded">
                      {[5,4,3,2,1].map(v=> <option key={v} value={v}>{v} stars</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm">Comment</label>
                    <textarea value={revComment} onChange={(e)=>setRevComment(e.target.value)} className="w-full mt-1 p-2 border rounded" rows={3} placeholder="Share your experience"></textarea>
                  </div>
                  {revError && <div className="text-red-600">{revError}</div>}
                  <div>
                    <button type="submit" disabled={revLoading} className="px-4 py-2 bg-green-600 text-white rounded">
                      {revLoading ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>
                </form>
              </div>

              <Reviews list={clinic.reviews || []} />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">{clinic.clinicName || clinic.name}</div>
                  <div className="text-sm text-gray-600">{clinic.clinicAddress || clinic.address}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-700 font-semibold">{clinic.priceRange}</div>
                </div>
              </div>
              <div className="mt-3">
                <button onClick={()=> navigate(`/clinic/${clinic._id}/book`)} className="w-full bg-green-600 text-white py-2 rounded">Book Appointment</button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold mb-2">Contact</h4>
              <div className="text-sm text-gray-600">Phone: <a href="#" className="text-green-700">01234-567890</a></div>
              <div className="text-sm text-gray-600">Directions: <a href="#" className="text-green-700">Open in maps</a></div>
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky Book button on mobile */}
      <div className="fixed bottom-4 left-0 right-0 px-4 md:hidden">
        <div className="max-w-3xl mx-auto">
          <button className="w-full bg-green-600 text-white py-3 rounded-lg shadow-lg">Book Appointment</button>
        </div>
      </div>
    </div>
  );
}
