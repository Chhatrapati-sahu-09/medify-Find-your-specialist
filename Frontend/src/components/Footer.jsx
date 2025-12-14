import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1a1d28] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* medify Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">medify</h3>
            <p className="text-gray-400">
              Your trusted healthcare companion offering the right medical professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "About Us", "Health Articles", "Contact Us"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* For Doctors */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              For Doctors
            </h4>
            <ul className="space-y-2">
              {["Join Network", "Doctor Login", "Resources", "Support"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <p>+1 (555) 123-4567</p>
              <p>support@medify.com</p>
              <p>123 Healthcare Ave</p>
              <p>Medical District, NY 10001</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© 2025 medify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
