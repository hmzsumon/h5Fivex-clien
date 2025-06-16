"use client";
import React from "react";

export default function Conference() {
  return (
    <section className="bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 px-4 py-12  transition-all">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 text-center">🌐 Global Conference</h3>
      <div className="w-full rounded-xl overflow-hidden shadow-xl aspect-[16/9]">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/home/conference.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed px-2">
        Experience our international business conference—see how Bitnex is driving global innovation and success in the eCommerce space.
      </p>
    </section>
  );
}
