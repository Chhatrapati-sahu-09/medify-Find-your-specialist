// src/pages/Home.jsx
import React from "react";
import HealthcareSearch from "../components/HealthcareSearch";
import Specialties from "../components/Specialties";
import Articles from "../components/Articles";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import PhoneMockup from "../assets/phone-mockup.png";

const Home = () => {
  return (
    <>
      <main className="flex flex-col-reverse lg:flex-row items-center justify-center px-6 lg:px-16 py-12 gap-10 bg-white min-h-[90vh]">
        <div className="max-w-xl space-y-6 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Book Your Clinic <br />
            <span className="text-green-700">Appointment Today</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Find trusted doctors, book appointments instantly, and manage your
            healthcare journey all in one convenient platform.
          </p>
          <button className="bg-green-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-800 transition-all duration-300">
            Find Doctors Now →
          </button>
        </div>

        <div className="relative">
          <img
            src={PhoneMockup}
            alt="Phone UI"
            className="w-[280px] sm:w-[340px] drop-shadow-xl"
          />
          <div className="absolute top-3 left-[-12px] bg-white px-3 py-1 rounded-full shadow text-green-700 font-semibold text-sm">
            ✅ Available Now
          </div>
          <div className="absolute bottom-[-16px] left-[24px] bg-white px-3 py-1 rounded-full shadow text-green-700 font-semibold text-sm flex items-center gap-1">
            🩺 Easy Booking
          </div>
          <div className="absolute top-1/2 right-[-20px] bg-white px-3 py-1 rounded-full shadow text-yellow-500 font-semibold text-sm flex items-center gap-1">
            ⭐ 4.9
          </div>
        </div>
      </main>

      <HealthcareSearch />
      <Specialties />
      <Articles />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
