import React, { useState } from "react";
import ClinicLogin from "./ClinicLogin";
import ClinicSignup from "./ClinicSignup";
import PatientLogin from "./PatientLogin";
import PatientSignup from "./PatientSignup";

export default function AuthPage({ mode = "login" }) {
  const [role, setRole] = useState(null); // 'clinic' | 'patient'

  const choose = (r) => setRole(r);

  const clear = () => setRole(null);

  // Render chosen form based on mode
  const renderForm = () => {
    if (mode === "login") {
      return role === "clinic" ? <ClinicLogin /> : <PatientLogin />;
    }
    return role === "clinic" ? <ClinicSignup /> : <PatientSignup />;
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{mode === "login" ? "Sign In" : "Sign Up"}</h2>
          <p className="text-gray-600 mt-2">Choose your role to continue</p>
        </div>

        {!role ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Clinic</h3>
              <p className="mb-4 text-gray-600">If you are a clinic admin, sign {mode} here.</p>
              <button onClick={() => choose("clinic")} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">{mode === "login" ? "Clinic Login" : "Clinic Sign Up"}</button>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Patient</h3>
              <p className="mb-4 text-gray-600">If you are a patient, sign {mode} here.</p>
              <button onClick={() => choose("patient")} className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200">{mode === "login" ? "Patient Login" : "Patient Sign Up"}</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 text-center">
              <button onClick={clear} className="text-sm text-gray-600 underline hover:text-gray-800">Back to role selection</button>
            </div>
            {renderForm()}
          </div>
        )}
      </div>
    </div>
  );
}
