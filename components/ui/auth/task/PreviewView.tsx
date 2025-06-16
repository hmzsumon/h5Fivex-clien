// PreviewView.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign } from 'react-icons/fi';
import { Product } from './types';

interface PreviewViewProps {
  selectedProduct: Product;
  handleGrab: () => void;
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const PreviewView: React.FC<PreviewViewProps> = ({
  selectedProduct,
  handleGrab,
  handleImageError,
}) => {
  return (
    <motion.div
      key="preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg mx-auto"
    >
      <div className="text-center mb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">Product Preview</h2>
        <p className="text-xs md:text-sm text-gray-500">Complete the task to earn commission</p>
      </div>

      <div className="relative group mb-4 md:mb-6">
        <img 
          src={selectedProduct.image} 
          className="w-full h-40 md:h-64 object-contain mx-auto rounded-lg border-2 border-white shadow-lg"
          alt={selectedProduct.name}
          onError={handleImageError}
        />
      </div>
      
      <div className="mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">{selectedProduct.name}</h3>
        <p className="text-xs md:text-sm text-gray-500 mb-3">{selectedProduct.brand} • {selectedProduct.category}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-50 p-2 md:p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Price</p>
            <p className="font-medium text-sm md:text-base">{selectedProduct.price}</p>
          </div>
          <div className="bg-gray-50 p-2 md:p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Refund</p>
            <p className="font-medium text-sm md:text-base">{selectedProduct.refund}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 md:p-4 rounded-lg border border-green-200">
          <p className="text-xs md:text-sm text-green-600 mb-1 uppercase tracking-wider">Your Commission</p>
          <p className="text-xl md:text-2xl font-bold text-green-700 flex items-center">
            <FiDollarSign className="mr-1" /> {selectedProduct.commission.slice(1)}
          </p>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: window.innerWidth > 768 ? 1.02 : 1 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGrab}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base shadow-md"
      >
        ▶ Start Task Now
      </motion.button>
    </motion.div>
  );
};