import React from 'react';
import { motion } from 'framer-motion';
import { GiCash } from 'react-icons/gi';
import { FiDollarSign } from 'react-icons/fi';

interface HeaderProps {
  deposit: number;
  setShowDepositModal: (show: boolean) => void;
  setDepositAmount: (amount: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ deposit, setShowDepositModal, setDepositAmount }) => (
  <>
    {/* Mobile Header */}
    <div className="md:hidden flex flex-col mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          VIP Tasks
        </h1>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">${deposit.toLocaleString()}</span>
          <button 
            onClick={() => {
              setShowDepositModal(true);
              setDepositAmount('');
            }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm shadow flex items-center"
          >
            <GiCash className="mr-1" /> Deposit
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">Earn commissions daily</p>
    </div>

    {/* Desktop Header */}
    <motion.div 
      className="hidden md:flex justify-between items-center mb-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          VIP Tasks Dashboard
        </h1>
        <p className="text-sm text-gray-500">Complete tasks and earn commissions daily</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 flex items-center">
          <span className="text-gray-600 mr-2">Balance:</span>
          <span className="font-bold flex items-center">
            <FiDollarSign className="mr-1" /> {deposit.toLocaleString()}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowDepositModal(true);
            setDepositAmount('');
          }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-xl flex items-center"
        >
          <GiCash className="mr-2" /> Deposit
        </motion.button>
      </div>
    </motion.div>
  </>
);