"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const banners = [
  { image: "/home/banner-1.png" },
  { image: "/home/banner-2.png" },
  { image: "/home/banner-3.png" },
  { image: "/home/banner-5.png" },
];

function BannerSlider() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div className="relative w-full max-w-[1320px] mx-auto aspect-[3.8/1] overflow-hidden  shadow-xl">
      <div 
        className="relative w-full h-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentBanner === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={banner.image}
              alt={`Promotional banner ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 950px"
            />
          </div>
        ))}
        
        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentBanner === index ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation arrows - Hidden on mobile */}
        <button
          onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all hidden sm:block"
          aria-label="Previous banner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all hidden sm:block"
          aria-label="Next banner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default BannerSlider;