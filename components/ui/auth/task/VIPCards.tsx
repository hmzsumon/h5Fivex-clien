// VIPCards.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiLock } from 'react-icons/fi';
import { VipTier, ViewType } from './types';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

interface VipCardsProps {
	vipTiers: VipTier[];
	deposit: number;
}

export const VipCards: React.FC<VipCardsProps> = ({ vipTiers, deposit }) => {
	const router = useRouter();

	const { user } = useSelector((state: any) => state.auth);

	const currentTier = vipTiers.find((tier) => tier.isTierUnlocked);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4 sm:px-0'
		>
			{vipTiers.map((tier, i) => (
				<motion.div
					key={i}
					whileHover={{ scale: 1.02 }}
					className={`relative rounded-xl p-4 shadow-md transition-all duration-300 ${
						tier.isTierUnlocked
							? `bg-gradient-to-br ${tier.color} border-2 border-yellow-400`
							: 'bg-gray-50 border border-gray-200'
					}`}
				>
					<div className='flex items-center justify-between mb-3'>
						<div className='flex items-center'>
							<div className='text-2xl mr-2'>
								{React.cloneElement(tier.logo, {
									className: `${tier.logo.props.className} ${
										tier.isTierUnlocked ? 'opacity-100' : 'opacity-60'
									}`,
								})}
							</div>
							<h3 className='text-lg font-bold text-gray-800'>{tier.level}</h3>
						</div>
						{!tier.isTierUnlocked && (
							<FiLock className='text-gray-400 text-xl' />
						)}
					</div>

					<div className='space-y-3 mb-4'>
						<div className='flex justify-between'>
							<span className='text-sm text-gray-600'>Daily Tasks:</span>
							<span className='font-medium'>{tier.orders}</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-sm text-gray-600'>Commission:</span>
							<span className='font-bold text-amber-600'>
								{tier.commission}
							</span>
						</div>

						<div className='mt-4'>
							<div className='h-2 w-full bg-gray-200 rounded-full overflow-hidden'>
								<div
									className={`h-full ${
										deposit >= tier.requirement
											? 'bg-green-500'
											: 'bg-yellow-500'
									}`}
									style={{
										width: `${Math.min(
											100,
											(deposit / tier.requirement) * 100
										)}%`,
									}}
								></div>
							</div>
							<p className='text-xs text-gray-500 mt-1 text-right'>
								${tier.requirement.toLocaleString()} required
							</p>
						</div>
					</div>

					<motion.button
						whileTap={{ scale: 0.98 }}
						onClick={() => {
							if (currentTier?.level === tier.level) {
								router.push('/tasks/today-task');
							} else if (user?.m_balance >= tier.requirement) {
								// Already unlocked but not current tier
								return;
							} else {
								router.push('/deposit');
							}
						}}
						className={`w-full py-2 rounded-lg text-sm font-medium ${
							currentTier?.level === tier.level
								? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
								: user?.m_balance >= tier.requirement
								? 'bg-green-100 text-green-600'
								: 'bg-gray-200 text-gray-700'
						}`}
					>
						{currentTier?.level === tier.level
							? 'Go to Tasks'
							: user?.m_balance >= tier.requirement
							? 'Unlock Now'
							: 'Unlock Tier'}
					</motion.button>
				</motion.div>
			))}
		</motion.div>
	);
};
