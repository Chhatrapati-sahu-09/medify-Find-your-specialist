import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClinicSignup() {
  const [form, setForm] = useState({ clinicName: "", email: "", password: "", phone: "", clinicAddress: "", description: "", yearsOfService: '', infrastructure: '', servicesOffered: '', facilities: '', priceRange: '', banner: '', profilePicture: '', locationLat: '', locationLng: '', open: true, distance: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // prepare payload: split comma-separated lists into arrays
      const norm = (v) => v ? v.split(',').map(s=>s.trim()).filter(Boolean) : [];
      const payload = {
        clinicName: form.clinicName,
        email: form.email,
        password: form.password,
        phone: form.phone,
        clinicAddress: form.clinicAddress,
        description: form.description,
        yearsOfService: form.yearsOfService ? Number(form.yearsOfService) : undefined,
        infrastructure: norm(form.infrastructure),
        servicesOffered: norm(form.servicesOffered),
        facilities: norm(form.facilities),
        priceRange: form.priceRange,
        banner: form.banner,
        profilePicture: form.profilePicture,
        locationLat: form.locationLat,
        locationLng: form.locationLng,
        open: form.open,
        distance: form.distance
      };

      const res = await fetch('/api/clinic/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Clinic registered successfully');
        navigate('/clinic/login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Clinic Signup</h2>
          <p className="text-gray-600 mt-2">Register your clinic to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name *</label>
              <input name="clinicName" required placeholder="Clinic name" value={form.clinicName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input name="email" required type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input name="password" required type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Address</label>
            <input name="clinicAddress" placeholder="Clinic address" value={form.clinicAddress} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" placeholder="Short description" value={form.description} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" rows={3} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Service</label>
              <input name="yearsOfService" type="number" placeholder="Years of service" value={form.yearsOfService} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <input name="priceRange" placeholder="Price range" value={form.priceRange} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Infrastructure (comma separated)</label>
            <input name="infrastructure" placeholder="e.g., AC, Parking, Elevator" value={form.infrastructure} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Services Offered (comma separated)</label>
            <input name="servicesOffered" placeholder="e.g., Cardiology, Dentistry" value={form.servicesOffered} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facilities (comma separated)</label>
            <input name="facilities" placeholder="e.g., Pharmacy, Lab" value={form.facilities} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image URL</label>
              <input name="banner" placeholder="Banner image URL" value={form.banner} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
              <input name="profilePicture" placeholder="Profile image URL" value={form.profilePicture} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
              <input name="locationLat" placeholder="Latitude" value={form.locationLat} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
              <input name="locationLng" placeholder="Longitude" value={form.locationLng} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input name="open" type="checkbox" checked={form.open} onChange={(e)=>setForm(prev=>({...prev, open: e.target.checked}))} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500" />
            <label className="text-sm font-medium text-gray-700">Open now</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Distance (e.g., 2.3 km)</label>
            <input name="distance" placeholder="Distance" value={form.distance} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
