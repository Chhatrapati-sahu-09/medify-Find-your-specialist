import React from "react";
import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaEye,
  FaStethoscope,
  FaBaby,
  FaAllergies,
  FaHeadSideVirus,
} from "react-icons/fa";

// Define specialties array outside the component
const specialtiesData = [
  {
    name: "Cardiology",
    icon: <FaHeartbeat />,
    description: "Heart & cardiovascular care",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    iconColor: "text-green-600",
  },
  {
    name: "Neurology",
    icon: <FaBrain />,
    description: "Brain & nervous system",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    iconColor: "text-green-600",
  },
  {
    name: "Orthopedics",
    icon: <FaBone />,
    description: "Bones & musculoskeletal",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    iconColor: "text-green-600",
  },
  {
    name: "Ophthalmology",
    icon: <FaEye />,
    description: "Eye care & vision",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    iconColor: "text-green-600",
  },
  {
    name: "General Medicine",
    icon: <FaStethoscope />,
    description: "Primary healthcare",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    iconColor: "text-green-600",
  },
  {
    name: "Pediatrics",
    icon: <FaBaby />,
    description: "Children's health",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    iconColor: "text-green-600",
  },
  {
    name: "Dermatology",
    icon: <FaAllergies />,
    description: "Skin & hair care",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    iconColor: "text-green-600",
  },
  {
    name: "Psychiatry",
    icon: <FaHeadSideVirus />,
    description: "Mental health & wellness",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    iconColor: "text-green-600",
  },
];

const Specialties = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <FaStethoscope className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Specialties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most sought-after medical specialties, where experienced specialists
            provide exceptional care tailored to your unique health needs.
          </p>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {specialtiesData.map((specialty, index) => (
            <div
              key={index}
              className={`${specialty.color} rounded-xl border-2 p-8 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`w-16 h-16 ${specialty.iconColor} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                  {specialty.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                    {specialty.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {specialty.description}
                  </p>
                </div>
                <div className="w-8 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Explore all our specialties
          </p>
          <button className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg">
            View All Specialties
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Specialties;
