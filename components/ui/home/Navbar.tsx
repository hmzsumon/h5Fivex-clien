'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HomeNavbar = () => {
  const router = useRouter();

  const handleJoinNowClick = () => {
    router.push('/register');
  };

  return (
    <header className="bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Name - Tightly grouped */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <Image 
            src="/home/logo.png" 
            alt="h5Fivex Logo" 
            width={50} 
            height={40} 
            className="w-auto h-[30px] md:h-[40px]"
          />
          <span className="text-lg md:text-xl font-bold text-gray-800 whitespace-nowrap">
            h5Fivex
          </span>
        </div>

        {/* Join Now Button */}
        <button
          onClick={handleJoinNowClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all font-medium
                    px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm whitespace-nowrap"
        >
          Join Now
        </button>
      </div>
    </header>
  );
};

export default HomeNavbar;