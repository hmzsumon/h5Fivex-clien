'use client';

import React from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

function HomeFooter() {
  return (
    <footer className="bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="text-center mb-8">
          <h4 className="text-xl font-semibold mb-2">Join Our Community</h4>
          <p className="text-sm max-w-md mx-auto mb-4 text-gray-600 dark:text-gray-400">
            Stay connected with our community for updates, support, and exclusive offers. Join us on your favorite platform.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join us on Telegram"
            className="text-3xl text-blue-500 hover:text-blue-700 transform hover:scale-110 transition-all"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join us on WhatsApp"
            className="text-3xl text-green-500 hover:text-green-700 transform hover:scale-110 transition-all"
          >
            <FaWhatsapp />
          </a>
        </div>

        {/* Footer Content */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-300">
          <p>&copy; 2025 h5Fivex. All Rights Reserved.</p>
          <p>
            <a href="/terms-conditions" className="hover:text-indigo-600">Terms & Conditions</a> |{" "}
            <a href="/privacy-policy" className="hover:text-indigo-600">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
