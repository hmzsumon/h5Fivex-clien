// DepositModal.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DepositModalProps {
  showDepositModal: boolean;
  setShowDepositModal: (show: boolean) => void;
  depositAmount: string;
  setDepositAmount: (amount: string) => void;
  handleDeposit: (amount?: number) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  showDepositModal,
  setShowDepositModal,
  depositAmount,
  setDepositAmount,
  handleDeposit,
}) => {
  if (!showDepositModal) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowDepositModal(false)}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Deposit Funds</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Deposit ($)
          </label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter amount"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => setDepositAmount('100')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition"
          >
            $100
          </button>
          <button
            onClick={() => setDepositAmount('500')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition"
          >
            $500
          </button>
          <button
            onClick={() => setDepositAmount('1000')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition"
          >
            $1000
          </button>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowDepositModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeposit()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};