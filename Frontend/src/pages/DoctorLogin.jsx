import React from "react";
import { Link } from "react-router-dom";

export default function DoctorLogin() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl mb-4">Doctor Login Disabled</h2>
      <p className="mb-4">Doctor logins are disabled. Clinics manage doctor profiles and authenticate via clinic accounts.</p>
      <p>If you are a clinic admin please <Link to="/clinic/login" className="text-blue-600 underline">login here</Link>.</p>
    </div>
  );
}
