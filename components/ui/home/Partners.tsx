'use client';

import React from "react";

const partners = [
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Shopify", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
  { name: "AliExpress", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Aliexpress_logo.svg" },
  { name: "eBay", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg" },
  { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "PayPal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "BigCommerce", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Bc-logo-dark.svg" },
  { name: "Wix", logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Wix.com_website_logo.svg" },
];

export default function Partners() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = `https://via.placeholder.com/120x60?text=${target.alt?.substring(0,10)}`;
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Our Partners
          </h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-3"></div>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Trusted by industry leaders worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center p-3 sm:p-4 bg-white rounded-lg shadow-xs hover:shadow-sm transition-all duration-200 border border-gray-100 hover:border-blue-200"
            >
              <div className="w-full h-16 sm:h-20 flex items-center justify-center p-1 mb-1">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-full object-contain object-center opacity-80 group-hover:opacity-100 transition-opacity"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 mt-1 text-center">
                {partner.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-5 py-2 text-xs sm:text-sm bg-white text-blue-500 font-medium rounded-md shadow-xs hover:shadow-sm transition-all border border-blue-200 hover:border-blue-300">
            Partner With Us
          </button>
        </div>
      </div>
    </section>
  );
}