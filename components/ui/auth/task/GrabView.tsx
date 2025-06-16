// GrabView.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Product } from './types';

interface GrabViewProps {
  selectedProduct: Product | null;
}

export const GrabView: React.FC<GrabViewProps> = ({ selectedProduct }) => {
  return (
    <motion.div
      key="grab"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center w-full px-4"
    >
      <div className="relative w-40 h-40 md:w-64 md:h-64 mb-6 md:mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 shadow-lg"
        ></motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 md:inset-6 rounded-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 shadow-md"
        ></motion.div>
        <div className="absolute inset-8 md:inset-10 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden">
          <motion.img
            src={selectedProduct?.image || ''}
            className="w-16 h-16 md:w-24 md:h-24 object-contain"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            alt="Processing"
          />
        </div>
      </div>

      <div className="text-center max-w-md">
        <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">Processing Your Order</h3>
        <p className="text-blue-600 text-sm md:text-base mb-4 md:mb-6">
          Verifying cashback eligibility and preparing your commission...
        </p>
        
        <div className="w-full bg-blue-100 rounded-full h-2 mb-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          ></motion.div>
        </div>
        
        <p className="text-xs md:text-sm text-gray-500">This usually takes 3-5 seconds...</p>
      </div>
    </motion.div>
  );
};