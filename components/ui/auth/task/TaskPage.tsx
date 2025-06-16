// TaskPage.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { FaCrown, FaGem, FaMedal, FaTrophy } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import { VipCards } from './VIPCards';
import { VipTier } from './types';
import { useSelector } from 'react-redux';
import {
	useLoadUserQuery,
	useUpdateUserVipTierMutation,
} from '@/redux/features/auth/authApi';

export default function TaskPage() {
	const { refetch } = useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);
	const [updateUserVipTier] = useUpdateUserVipTierMutation();

	useEffect(() => {
		if (user?._id) {
			updateUserVipTier({ userId: user._id }).unwrap();
		}
	}, [user?._id]);

	const rawTiers = [
		{
			level: 'VIP1',
			commission: '1.80%-2.20%',
			orders: 3,
			min: 30,
			max: 500,
			requirement: 30,
			logo: <FaMedal className='text-amber-400' />,
			color: 'from-amber-100 to-amber-50',
			bgColor: 'bg-amber-50',
		},
		{
			level: 'VIP2',
			commission: '2.20%-2.80%',
			orders: 3,
			min: 500,
			max: 2000,
			requirement: 500,
			logo: <FaMedal className='text-gray-400' />,
			color: 'from-gray-100 to-gray-50',
			bgColor: 'bg-gray-50',
		},
		{
			level: 'VIP3',
			commission: '2.80%-3.20%',
			orders: 3,
			min: 2000,
			max: 5000,
			requirement: 2000,
			logo: <FaMedal className='text-amber-600' />,
			color: 'from-orange-100 to-amber-50',
			bgColor: 'bg-amber-50',
		},
		{
			level: 'VIP4',
			commission: '3.20%-3.60%',
			orders: 3,
			min: 5000,
			max: 10000,
			requirement: 5000,
			logo: <FaTrophy className='text-yellow-500' />,
			color: 'from-yellow-100 to-yellow-50',
			bgColor: 'bg-yellow-50',
		},
		{
			level: 'VIP5',
			commission: '3.60%-4%',
			orders: 3,
			min: 10000,
			max: 20000,
			requirement: 10000,
			logo: <FaGem className='text-blue-400' />,
			color: 'from-blue-100 to-blue-50',
			bgColor: 'bg-blue-50',
		},
		{
			level: 'VIP6',
			commission: '5%-8%',
			orders: 3,
			min: 20000,
			requirement: 20000,
			logo: <FaCrown className='text-purple-500' />,
			color: 'from-purple-100 to-purple-50',
			bgColor: 'bg-purple-50',
		},
	];

	const vipTiers: VipTier[] = rawTiers.map((tier) => ({
		...tier,
		isTierUnlocked: user?.vipTier === tier.level,
	}));

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-800 px-4 py-8 flex flex-col items-center font-sans'>
			<div className='w-full max-w-6xl mb-8'>
				{/* Mobile Header */}
				<div className='md:hidden flex flex-col mb-6'>
					<div className='flex justify-between items-center'>
						<h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600'>
							VIP Tasks
						</h1>
						<button className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm shadow flex items-center'>
							<GiCash className='mr-1' /> ${user?.m_balance.toLocaleString()}
						</button>
					</div>
					<p className='text-sm text-gray-500 mt-2'>Earn commissions daily</p>
				</div>

				{/* Desktop Header */}
				<motion.div
					className='hidden md:flex justify-between items-center mb-6'
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
				>
					<div>
						<h2 className='text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600'>
							VIP Tasks
						</h2>
						<p className='text-sm text-gray-500'>
							Complete tasks and earn commissions daily
						</p>
					</div>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-xl flex items-center'
					>
						<GiCash className='mr-2' /> $
						{user?.m_balance?.toLocaleString() || 0}
					</motion.button>
				</motion.div>

				<AnimatePresence mode='wait'>
					<VipCards vipTiers={vipTiers} deposit={user?.m_balance || 0} />
				</AnimatePresence>
			</div>
		</div>
	);
}
