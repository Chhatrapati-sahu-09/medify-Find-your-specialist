import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner in healthcare, connecting patients with quality medical services across India.
          </p>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At Medify, we believe that quality healthcare should be accessible to everyone. Our platform connects patients with trusted clinics and healthcare providers across India, making it easier to find and book appointments.
            </p>
            <p className="text-gray-600">
              We are committed to improving healthcare accessibility through technology, ensuring that patients can find the right care at the right time.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">Quick appointment booking with verified healthcare providers</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600">Partner Clinics</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
            <div className="text-gray-600">Happy Patients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Cities Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our dedicated team of healthcare professionals and technology experts work together to provide the best healthcare experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;