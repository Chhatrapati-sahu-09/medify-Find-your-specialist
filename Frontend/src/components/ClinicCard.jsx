import React from 'react';
import { useNavigate } from 'react-router-dom';

function StarRating({rating, count}){
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars = [];
  for(let i=0;i<5;i++){
    if(i<full) stars.push('full');
    else if(i===full && half) stars.push('half');
    else stars.push('empty');
  }
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <div className="flex items-center text-yellow-500">
        {stars.map((s,idx)=> (
          <svg key={idx} className="w-4 h-4" viewBox="0 0 20 20" fill={s==='empty'?"none":"currentColor"} stroke="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.377 2.455a1 1 0 00-.364 1.118l1.287 3.969c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.377 2.455c-.783.57-1.838-.196-1.538-1.118l1.287-3.969a1 1 0 00-.364-1.118L2.631 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z" />
          </svg>
        ))}
      </div>
      <div>{rating} <span className="text-gray-400">({count})</span></div>
    </div>
  );
}

export default function ClinicCard({clinic}){
  const navigate = useNavigate();
  const id = clinic._id || clinic.id;
  const openDetails = () => navigate(`/clinic/${id}`);
  const bookNow = () => navigate(`/clinic/${id}/book`);
  const name = clinic.clinicName || clinic.name || 'Clinic';
  const address = clinic.clinicAddress || clinic.address || '';
  const services = clinic.servicesOffered || clinic.services || [];
  const rating = clinic.rating || (clinic.reviews? (Array.isArray(clinic.reviews)? clinic.reviews.length? clinic.reviews.reduce((s,r)=> s + (r.rating||0),0)/clinic.reviews.length : 0 : 0) : 0);
  const speciality = (clinic.matchedDoctors && clinic.matchedDoctors[0] && clinic.matchedDoctors[0].specialization) || clinic.speciality || '';
  return (
    <article className="flex flex-col md:flex-row bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 p-6 gap-4">
      {/* Left: Image + badges */}
      <div className="relative w-full md:w-28 flex-shrink-0">
        <img
          src={clinic.banner || clinic.profilePicture || clinic.image || '/images/cropped_circle_image (2).png'}
          alt={name}
          className="w-28 h-28 object-cover object-center rounded-lg"
          onError={(e)=>{ e.target.onerror = null; e.target.src = '/images/cropped_circle_image (2).png'; }}
        />
        <div className={`absolute top-1 left-1 text-xs px-2 py-1 rounded ${(clinic.open? 'bg-green-600 text-white':'bg-gray-400 text-white')}`}>
          {(clinic.open? 'Open Now' : 'Closed')}
        </div>
        {clinic.priceRange && (
          <div className="absolute top-1 right-1 text-xs px-2 py-1 rounded bg-white text-gray-800 shadow">{clinic.priceRange}</div>
        )}
      </div>

      {/* Right: Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <div className="flex items-center justify-between mt-2 md:mt-1">
            <div className="flex items-center gap-4">
              <StarRating rating={Math.round((rating||0)*10)/10} count={clinic.reviews? clinic.reviews.length : 0} />
              <div className="text-sm text-gray-500">{speciality}</div>
            </div>
            <div className="text-sm text-gray-500">{clinic.distance || ''}</div>
          </div>

          <div className="mt-3 text-sm text-gray-600">{address}</div>

          <div className="mt-3 flex items-center gap-3 flex-wrap text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z"/></svg>
              <span>Services: {services.join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button onClick={openDetails} className="px-4 py-2 bg-white border border-green-600 text-green-700 rounded-md hover:bg-green-50">View Details</button>
          <button onClick={bookNow} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Book Now</button>
        </div>
      </div>
    </article>
  );
}
