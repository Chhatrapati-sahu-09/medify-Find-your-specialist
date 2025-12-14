import React from 'react';

export default function FiltersSidebar({filters, setFilters, onApply}){
  return (
    <aside className="w-full md:w-80 bg-white rounded-lg shadow p-4 sticky top-24">
      <h4 className="text-lg font-semibold mb-3">Filters</h4>

      <label className="block text-sm text-gray-600 mb-1">Speciality</label>
      <select value={filters.speciality} onChange={e=>setFilters({...filters, speciality: e.target.value})} className="w-full p-2 border rounded mb-3">
        <option value="">All</option>
        <option>Dermatology</option>
        <option>Cardiology</option>
        <option>Orthopedics</option>
        <option>Dentistry</option>
      </select>

      <label className="block text-sm text-gray-600 mb-1">Location</label>
      <input value={filters.location} onChange={e=>setFilters({...filters, location: e.target.value})} placeholder="City or area" className="w-full p-2 border rounded mb-3" />

      <label className="block text-sm text-gray-600 mb-1">Sort By</label>
      <select value={filters.sortBy} onChange={e=>setFilters({...filters, sortBy: e.target.value})} className="w-full p-2 border rounded mb-3">
        <option value="distance">Distance</option>
        <option value="rating">Rating</option>
        <option value="fees">Fees</option>
      </select>

      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm text-gray-600">Open Now</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={filters.openNow} onChange={e=>setFilters({...filters, openNow: e.target.checked})} className="sr-only" />
          <div className="w-10 h-5 bg-gray-200 rounded-full shadow-inner"></div>
        </label>
      </div>

      <label className="block text-sm text-gray-600 mb-1">Doctor Gender</label>
      <select value={filters.gender} onChange={e=>setFilters({...filters, gender: e.target.value})} className="w-full p-2 border rounded mb-3">
        <option value="">Any</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      

      <div className="mb-3">
        <div className="text-sm font-medium mb-2">Facilities</div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Wheelchair accessible</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Lab available</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Emergency</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Pharmacy</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Parking</label>
      </div>

      <button onClick={onApply} className="w-full bg-green-600 text-white py-2 rounded">Apply Filters</button>
    </aside>
  );
}
