// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ClinicLogin from "./pages/ClinicLogin";
import ClinicSignup from "./pages/ClinicSignup";
import PatientLogin from "./pages/PatientLogin";
import PatientSignup from "./pages/PatientSignup";
import AuthPage from "./pages/AuthPage";
import Specialties from "./components/Specialties";
import Articles from "./components/Articles";
import Testimonials from "./components/Testimonials";
import HealthcareSearch from "./components/HealthcareSearch";
import SearchResults from "./pages/SearchResults";
import ClinicDetails from "./pages/ClinicDetails";
import AppointmentBooking from "./pages/AppointmentBooking";
import AppointmentSuccess from "./pages/AppointmentSuccess";
import FakePaymentPage from "./pages/FakePaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ClinicDashboard from "./pages/ClinicDashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/specialties" element={<Specialties />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/search" element={<HealthcareSearch />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/clinic/login" element={<ClinicLogin />} />
        <Route path="/clinic/signup" element={<ClinicSignup />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/signup" element={<PatientSignup />} />
        <Route path="/auth/login" element={<AuthPage mode="login" />} />
        <Route path="/auth/signup" element={<AuthPage mode="signup" />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/clinic/:id" element={<ClinicDetails />} />
        <Route path="/clinic/:id/book" element={<AppointmentBooking />} />
        <Route path="/payment" element={<FakePaymentPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/appointment/success" element={<AppointmentSuccess />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/clinic/dashboard" element={<ClinicDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
