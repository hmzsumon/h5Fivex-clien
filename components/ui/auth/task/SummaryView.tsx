// SummaryView.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCoins } from 'react-icons/fa';
import { Product } from './types';

interface SummaryViewProps {
  selectedProduct: Product | null;
  taskCount: number;
  maxTasks: number;
  totalProfit: number;
  todayProfit: number;
  isAnimating: boolean;
  startPreview: () => void;
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}
const DEFAULT_PRODUCT_GIF = 'https://media.giphy.com/media/3o7aD2d7hy9ktXNDP2/giphy.gif';

export const SummaryView: React.FC<SummaryViewProps> = ({
  selectedProduct,
  taskCount,
  maxTasks,
  totalProfit,
  todayProfit,
  isAnimating,
  startPreview,
  handleImageError,
}) => {
  return (
    <motion.div
      key="summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl w-full bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg mx-auto"
    >
     <div className="relative h-40 md:h-64 overflow-hidden rounded-lg mb-4 md:mb-6 bg-gradient-to-r from-blue-50 to-purple-50">
  <img
    src={selectedProduct?.gif || DEFAULT_PRODUCT_GIF}
    className="w-full h-full object-cover"
    alt="Product Preview"
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.src = DEFAULT_PRODUCT_GIF; // Double fallback
      target.onerror = null; // Prevent infinite loop
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
  <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-left">
    <h3 className="text-white font-bold text-lg md:text-xl">Today's Opportunities</h3>
    <p className="text-gray-200 text-sm md:text-base">Complete tasks to earn</p>
  </div>
</div>

      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
        <div className="bg-blue-50 p-2 md:p-3 rounded-lg">
          <p className="text-xs md:text-sm text-blue-600">Total Profit</p>
          <p className="text-base md:text-lg font-bold text-blue-800">${totalProfit.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 p-2 md:p-3 rounded-lg">
          <p className="text-xs md:text-sm text-green-600">Today's Profit</p>
          <p className="text-base md:text-lg font-bold text-green-800">${todayProfit.toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 p-2 md:p-3 rounded-lg">
          <p className="text-xs md:text-sm text-purple-600">Tasks</p>
          <p className="text-base md:text-lg font-bold text-purple-800">{taskCount}/{maxTasks}</p>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: window.innerWidth > 768 ? 1.02 : 1 }}
        whileTap={{ scale: 0.98 }}
        onClick={startPreview}
        disabled={taskCount >= maxTasks}
        className={`w-full py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base ${
          taskCount >= maxTasks 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
        }`}
      >
        {isAnimating ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Preparing...
          </span>
        ) : (
          <>
            🚀 Grab Order
            {taskCount < maxTasks && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
                {maxTasks - taskCount} left
              </span>
            )}
          </>
        )}
      </motion.button>
      
      {taskCount >= maxTasks && (
        <p className="mt-2 text-xs md:text-sm text-center text-gray-500">
          Completed all tasks today
        </p>
      )}
    </motion.div>
  );
};