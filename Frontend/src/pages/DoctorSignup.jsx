import React from "react";
import { Link } from "react-router-dom";

export default function DoctorSignup() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl mb-4">Doctor Signup Disabled</h2>
      <p className="mb-4">Doctors cannot self-register anymore. Clinic administrators create doctor profiles.</p>
      <p className="mb-4">If you represent a clinic, please <Link to="/clinic/signup" className="text-blue-600 underline">sign up your clinic here</Link>.</p>
      <p>If you are a doctor looking to join a clinic, please contact the clinic admin.</p>
    </div>
  );
}
