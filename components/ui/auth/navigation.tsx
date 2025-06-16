'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import {
  MdCardGiftcard,
  MdGroups,
  MdAccountBalanceWallet,
  MdAttachMoney,
  MdBusiness,
  MdGavel,
  MdHelp,
  MdAssignment
} from 'react-icons/md';

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { 
      name: 'Invite', 
      icon: <MdCardGiftcard />, 
      path: '/invite', 
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    { 
      name: 'Team', 
      icon: <MdGroups />, 
      path: '/team', 
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    { 
      name: 'Recharge', 
      icon: <MdAccountBalanceWallet />, 
      path: '/deposit', 
      color: 'text-emerald-600',
      bg: 'bg-emerald-100'
    },
    { 
      name: 'Withdraw', 
      icon: <MdAttachMoney />, 
      path: '/withdraw', 
      color: 'text-rose-600',
      bg: 'bg-rose-100'
    },
    { 
      name: 'Rank&Reward', 
      icon: <MdBusiness />, 
      path: '/rank', 
      color: 'text-amber-600',
      bg: 'bg-amber-100'
    },
    { 
      name: 'Rule', 
      icon: <MdGavel />, 
      path: '/rule', 
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    },
    { 
      name: 'Help', 
      icon: <MdHelp />, 
      path: '/help', 
      color: 'text-pink-600',
      bg: 'bg-pink-100'
    },
    { 
      name: 'Task Center', 
      icon: <MdAssignment />, 
      path: '/task-center', 
      color: 'text-teal-600',
      bg: 'bg-teal-100'
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 px-4 py-6 bg-gradient-to-br from-teal-100 via-green-200 to-emerald-100  shadow-md">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => router.push(item.path)}
          className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
            pathname === item.path
              ? `${item.bg} shadow-inner border border-white/20`
              : 'hover:bg-white/50'
          }`}
        >
          <span className={`text-2xl mb-1 p-2 rounded-full ${item.color} ${
            pathname === item.path 
              ? 'bg-white/80 backdrop-blur-sm' 
              : 'bg-white/60'
          }`}>
            {item.icon}
          </span>
          <span className={`text-sm font-medium ${
            pathname === item.path 
              ? 'text-gray-800 font-semibold' 
              : 'text-gray-700'
          }`}>
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;