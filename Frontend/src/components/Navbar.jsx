import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // For hamburger icon
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClinic, setIsClinic] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const clinicId = localStorage.getItem("clinicId");
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!token);
    setIsClinic(!!clinicId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("clinicId");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="bg-green-700 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/images/cropped_circle_image (2).png" alt="medify" className="w-10 h-10 rounded-full object-cover shadow" />
          <span className="text-xl font-semibold text-white tracking-wide">
            medify
          </span>
        </div>

        {/* Hamburger for mobile */}
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-300 transition">About Us</Link>
          <Link to="/articles" className="hover:text-yellow-300 transition">Health Articles</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">Contact Us</Link>
          <Link to="/specialties" className="hover:text-yellow-300 transition">Specialities</Link>
        </nav>

        {/* Auth section */}
        <div className="hidden md:flex items-center space-x-4 text-sm">
          {isLoggedIn ? (
            <>
              <Link to={isClinic ? "/clinic/dashboard" : "/patient/dashboard"} className="bg-white text-green-700 px-4 py-2 rounded-md shadow-sm hover:underline">Dashboard</Link>
              <button onClick={handleLogout} className="bg-white text-green-700 px-4 py-2 rounded-md shadow-sm hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="bg-white text-green-700 px-4 py-2 rounded-md shadow-sm hover:underline">Sign In</Link>
              <Link to="/auth/signup" className="bg-white text-green-700 px-4 py-2 rounded-md shadow-sm hover:underline">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
          <div className="md:hidden bg-green-600 px-6 pb-4 space-y-4 font-medium">
          <Link to="/" className="block hover:text-yellow-300">Home</Link>
          <Link to="/about" className="block hover:text-yellow-300">About Us</Link>
          <Link to="/articles" className="block hover:text-yellow-300">Health Articles</Link>
          <Link to="/contact" className="block hover:text-yellow-300">Contact Us</Link>
          <Link to="/specialties" className="block hover:text-yellow-300">Specialities</Link>
          {isLoggedIn ? (
            <div className="flex gap-3">
              <Link to={isClinic ? "/clinic/dashboard" : "/patient/dashboard"} className="w-1/2 text-center bg-white text-green-700 px-4 py-3 rounded-md shadow-sm">Dashboard</Link>
              <button onClick={handleLogout} className="w-1/2 text-center bg-white text-green-700 px-4 py-3 rounded-md shadow-sm">Logout</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/auth/login" className="w-1/2 text-center bg-white text-green-700 px-4 py-3 rounded-md shadow-sm">Sign In</Link>
              <Link to="/auth/signup" className="w-1/2 text-center bg-white text-green-700 px-4 py-3 rounded-md shadow-sm">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
