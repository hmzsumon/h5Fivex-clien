"use client";

import React from "react";

const CompanyOffersTicker = () => {
  const offers = [
    "🔥 h5Fivex Exclusive: 5% deposit commission on 100+ deposits • ",
    "💎 Daily 1.8%-5% bonus on all investments • ",
    "🏆 Rank rewards: 100$-1000$ monthly bonus • ",
    "🚀 3-level referral generation bonus • ",
    "💰 Salary program: 100$-1000$ monthly • ",
    "📈 High-yield investment opportunities available now • "
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-violet-700 text-white py-2 overflow-hidden border-y border-white/10">
      <div className="max-w-7xl mx-auto flex items-center px-2">
        {/* Premium Company Badge */}
        <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-3 py-1 rounded-full mr-3 text-xs md:text-sm flex items-center shadow-sm">
          <span className="font-mono font-extrabold mr-1.5">h5Fivex</span>
          <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
        </div>
        
        {/* Elegant Scrolling Ticker */}
        <div className="flex-1 overflow-hidden relative h-5 md:h-6">
          <div 
            className="whitespace-nowrap inline-flex items-center animate-scroll text-xs md:text-sm font-medium"
            style={{ animationDuration: "40s" }}
          >
            {offers.join("").repeat(3)}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-66.6%); }
        }
        .animate-scroll {
          animation: scroll linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default CompanyOffersTicker;