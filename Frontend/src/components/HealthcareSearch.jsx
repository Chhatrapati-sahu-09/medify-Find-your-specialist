import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MapPin, Stethoscope, ChevronDown } from "lucide-react";

const HealthcareSearch = ({ onSearch }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [locationNear, setLocationNear] = useState("");
  const [locationSpecialist, setLocationSpecialist] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const specialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
  ];

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
    setIsDropdownOpen(false);
  };

  const navigate = useNavigate();

  const handleSearchDoctors = () => {
    const qs = new URLSearchParams({ location: locationNear }).toString();
    navigate(`/search-results?${qs}`);
  };

  const handleSearchSpecialists = () => {
    const qs = new URLSearchParams({ specialty: selectedSpecialty, location: locationSpecialist }).toString();
    navigate(`/search-results?${qs}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            How would you like to search?
          </h1>
          <p className="text-lg text-gray-600">
            Choose your preferred way to find the right healthcare professional
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Doctor Near You */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Find Doctors Near You
              </h2>
              <p className="text-gray-600">Search for doctors in your area</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  value={locationNear}
                  onChange={(e) => setLocationNear(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                />
              </div>
              <button
                onClick={handleSearchDoctors}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Search Doctors
              </button>
            </div>
          </div>

          {/* Specialist Search */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                <Stethoscope className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Find Specialists
              </h2>
              <p className="text-gray-600">Search by medical specialty</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors flex items-center justify-between"
                >
                  <span
                    className={
                      selectedSpecialty ? "text-gray-800" : "text-gray-500"
                    }
                  >
                    {selectedSpecialty || "Select specialty"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {specialties.map((specialty) => (
                      <button
                        key={specialty}
                        onClick={() => handleSpecialtySelect(specialty)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter location"
                  value={locationSpecialist}
                  onChange={(e) => setLocationSpecialist(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                />
              </div>

              <button
                onClick={handleSearchSpecialists}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Search Specialists
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareSearch;
