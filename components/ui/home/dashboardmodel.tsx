'use client';

import React, { useState, useEffect } from 'react';
import { X, Gift, Zap, Clock, ArrowRight, CheckCircle } from 'lucide-react';

const H5FivexRewardsModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60); // 12 hours in seconds

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Format time (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-xl shadow-2xl max-w-xs w-full overflow-hidden border border-gray-100 relative">
        {/* Premium Header - More Compact */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 relative">
          <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[10px] transform rotate-12 shadow-sm">
            EXCLUSIVE
          </div>
          <div className="flex flex-col items-center text-center">
            <Gift className="w-5 h-5 text-white mb-1" />
            <h2 className="text-lg font-bold text-white">h5Fivex Rewards</h2>
            <p className="text-white/90 text-xs mt-0.5">New member bonuses</p>
          </div>
          {/* Larger, more visible close button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-white hover:text-white transition p-1 rounded-full bg-white/20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content - More Compact */}
        <div className="p-3 space-y-3">
          {/* Flash Sale Banner - Smaller */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded text-center shadow-sm text-xs">
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 animate-pulse" />
              <span>LIMITED TIME BONUSES!</span>
            </div>
          </div>

          {/* Benefits List - More Compact */}
          <div className="space-y-2">
            {/* Deposit Bonus */}
            <div className="flex items-start gap-2 p-2 bg-blue-50 rounded border border-blue-100">
              <div className="bg-blue-100 p-1 rounded-full">
                <CheckCircle className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-blue-800 text-xs">Deposit Bonus</h3>
                <p className="text-[11px] text-gray-600">
                  100$ deposit bonus 5%
                </p>
              </div>
            </div>

            {/* Join Bonus */}
            <div className="flex items-start gap-2 p-2 bg-purple-50 rounded border border-purple-100">
              <div className="bg-purple-100 p-1 rounded-full">
                <CheckCircle className="w-3 h-3 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-purple-800 text-xs">Join Bonus</h3>
                <p className="text-[11px] text-gray-600">
                  3$ bonus after registration
                </p>
              </div>
            </div>

            {/* Rank Rewards */}
            <div className="flex items-start gap-2 p-2 bg-amber-50 rounded border border-amber-100">
              <div className="bg-amber-100 p-1 rounded-full">
                <CheckCircle className="w-3 h-3 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-amber-800 text-xs">Rank Rewards</h3>
                <p className="text-[11px] text-gray-600">
                  100$-1000$ performance bonus
                </p>
              </div>
            </div>
          </div>

          {/* Countdown & CTA - More Compact */}
          <div className="mt-2 space-y-2">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded p-2 border border-blue-200 text-center text-xs">
              <div className="flex items-center justify-center gap-1 text-blue-800">
                <Clock className="w-3 h-3" />
                <span>Ends in:</span>
                <span className="font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default H5FivexRewardsModal;