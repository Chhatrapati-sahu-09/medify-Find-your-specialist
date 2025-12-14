import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FiltersSidebar from '../components/FiltersSidebar';
import ClinicCard from '../components/ClinicCard';

export default function SearchResults(){
  const [filters, setFilters] = useState({speciality:'', location:'', sortBy:'distance', openNow:false, gender:'', insurance:[]});

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const buildQuery = (f)=>{
    const params = new URLSearchParams();
    if(f.speciality) params.set('speciality', f.speciality);
    if(f.location) params.set('location', f.location);
    if(f.sortBy) params.set('sortBy', f.sortBy);
    return params.toString();
  };

  const fetchResults = async (f)=>{
    try{
      setLoading(true);
      const qs = buildQuery(f);
      const res = await fetch('/api/search' + (qs ? ('?'+qs) : ''));
      const data = await res.json();
      setItems(data || []);
    }catch(err){
      console.error(err);
    }finally{setLoading(false);}    
  };

  const locationHook = useLocation();
  useEffect(()=>{
    // read query params from URL
    const params = new URLSearchParams(locationHook.search);
    const speciality = params.get('specialty') || params.get('speciality') || '';
    const loc = params.get('location') || '';
    const initial = {...filters, speciality, location: loc};
    setFilters(initial);
    // initial fetch
    fetchResults(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const applyFilters = ()=>{
    fetchResults(filters);
  };

  const summaryBadges = useMemo(()=>({location:filters.location||'Any', speciality:filters.speciality||'Any'}),[filters]);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="mb-6 bg-white rounded-lg p-6 shadow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Search Results</h1>
              <p className="text-gray-600">Clinics matching your search</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">Location: {summaryBadges.location}</span>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">Speciality: {summaryBadges.speciality}</span>
                <button onClick={()=>window.history.back()} className="ml-3 text-sm text-green-700 underline">Edit search</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">Showing <strong>{items.length}</strong> clinics</div>
              <button onClick={applyFilters} className="bg-green-600 text-white px-4 py-2 rounded">Apply Filters</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <FiltersSidebar filters={filters} setFilters={setFilters} onApply={applyFilters} />
          </div>

          <main className="md:col-span-3 flex flex-col gap-4">
            {loading && <div className="p-4 bg-white rounded">Loading results...</div>}
            {!loading && items.length===0 && <div className="p-4 bg-white rounded">No clinics found.</div>}
            {items.map((c,i)=> (
              <ClinicCard key={c._id || i} clinic={c} />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
