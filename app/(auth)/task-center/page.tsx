'use client';

import React, { use, useEffect, useState } from 'react';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import PulseLoader from 'react-spinners/PulseLoader';
import { toast } from 'react-hot-toast';
import {
	FiUsers,
	FiUserPlus,
	FiLayers,
	FiAward,
	FiDollarSign,
	FiCheckCircle,
	FiZap,
	FiTrendingUp,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useGetTaskCenterDataQuery } from '@/redux/features/rank/rankApi';
import { formatBalance } from '@/lib/functions';
import { useClaimGenerationRewardMutation } from '@/redux/features/auth/authApi';
import { useSelector } from 'react-redux';

interface TaskLevel {
	id: number;
	level: string;
	amount: number;
	requirement: string;
	bonus: string;
	progress: number;
	completed: boolean;
	generations: number;
	icon: React.ReactNode;
	color: string;
	gradient: string;
	isClaimed: boolean;
}

const TaskCenterPage = () => {
	const { user } = useSelector((state: any) => state.auth);
	const { data, isLoading } = useGetTaskCenterDataQuery(undefined);
	const { taskCenterData } = data || {};

	const [claimedLevels, setClaimedLevels] = useState<number[]>([]);
	useEffect(() => {
		if (user?.generationRewardLevels) {
			setClaimedLevels(user.generationRewardLevels);
		}
	}, [user]);

	const [
		claimGenerationReward,
		{ isLoading: isClaiming, isSuccess: isClaimed, error: claimError },
	] = useClaimGenerationRewardMutation();

	const taskLevels: TaskLevel[] = [
		{
			id: 1,
			level: 'Bronze Tier',
			amount: 10,
			requirement: '10 Active Members (3 Generations)',
			bonus: '10 USDT',
			progress: taskCenterData?.activeMembers || 0,
			completed: false,
			generations: 3,
			icon: <FiUsers className='text-amber-600' />,
			color: 'border-amber-200',
			gradient: 'from-amber-100 to-amber-50',
			isClaimed: claimedLevels.includes(1),
		},
		{
			id: 2,
			level: 'Silver Tier',
			amount: 20,
			requirement: '20 Active Members (3 Generations)',
			bonus: '20 USDT',
			progress: taskCenterData?.activeMembers || 0,
			completed: false,
			generations: 3,
			icon: <FiUserPlus className='text-gray-400' />,
			color: 'border-gray-200',
			gradient: 'from-gray-100 to-gray-50',
			isClaimed: claimedLevels.includes(2),
		},
		{
			id: 3,
			level: 'Gold Tier',
			amount: 30,
			requirement: '30 Active Members (3 Generations)',
			bonus: '30 USDT',
			progress: taskCenterData?.activeMembers || 0,
			completed: false,
			generations: 3,
			icon: <FiTrendingUp className='text-yellow-500' />,
			color: 'border-yellow-200',
			gradient: 'from-yellow-100 to-yellow-50',
			isClaimed: claimedLevels.includes(3),
		},
		{
			id: 4,
			level: 'Platinum Tier',
			amount: 40,
			requirement: '40 Active Members (3 Generations)',
			bonus: '40 USDT',
			progress: taskCenterData?.activeMembers || 0,
			completed: false,
			generations: 3,
			icon: <FiZap className='text-blue-400' />,
			color: 'border-blue-200',
			gradient: 'from-blue-100 to-blue-50',
			isClaimed: claimedLevels.includes(4),
		},
		{
			id: 5,
			level: 'Diamond Tier',
			amount: 50,
			requirement: '50 Active Members (3 Generations)',
			bonus: '50 USDT',
			progress: taskCenterData?.activeMembers || 0,
			completed: false,
			generations: 3,
			icon: <FiAward className='text-purple-500' />,
			color: 'border-purple-200',
			gradient: 'from-purple-100 to-purple-50',
			isClaimed: claimedLevels.includes(5),
		},
		{
			id: 6,
			level: 'Elite Tier',
			amount: 70,
			requirement: '60 Active Members (3 Generations)',
			bonus: '70 USDT',
			progress: taskCenterData?.activeMembers || 0,
			completed: false,
			generations: 3,
			icon: <FiDollarSign className='text-pink-500' />,
			color: 'border-pink-200',
			gradient: 'from-pink-100 to-pink-50',
			isClaimed: claimedLevels.includes(6),
		},
	];

	const stats = {
		totalMembers: taskCenterData?.totalMembers || 0,
		activeMembers: taskCenterData?.activeMembers || 0,
		generation1: taskCenterData?.level_1Members || 0,
		generation2: taskCenterData?.level_2Members || 0,
		generation3: taskCenterData?.level_3Members || 0,

		totalEarned: formatBalance(taskCenterData?.totalEarnings || 0),
	};

	const handleClaimBonus = (id: number) => {
		setClaimedLevels([...claimedLevels, id]);
		const level = taskLevels.find((l) => l.id === id);
		if (!level) {
			toast.error('Invalid task level');
			return;
		}

		const data = {
			tireName: level.level,
			rewardAmount: level.amount,
			level_id: id,
		};
		claimGenerationReward(data).unwrap();
	};

	useEffect(() => {
		if (isClaimed) {
			toast.success('Bonus claimed successfully!');
		}
		if (claimError) {
			toast.error((claimError as fetchBaseQueryError).data?.error);
		}
	}, [isClaimed, claimError]);

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8'>
			<div className='max-w-7xl mx-auto'>
				{/* Premium Header */}
				<div className='text-center mb-12'>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='inline-block mb-4'
					>
						<div className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium inline-flex items-center'>
							<FiAward className='mr-2' /> TASK CENTER
						</div>
					</motion.div>
					<h3 className='text-4xl md:text-5xl font-bold text-gray-900 mb-3'>
						Multi-Generation{' '}
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600'>
							Rewards
						</span>
					</h3>
					<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
						Grow your network across 3 generations and unlock tiered bonuses
					</p>
				</div>

				{/* Stats Cards with Glass Morphism */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12'>
					<GlassStatCard
						icon={<FiUsers className='text-indigo-500' />}
						title='Total Network'
						value={stats.totalMembers}
						trend='up'
					/>
					<GlassStatCard
						icon={<FiUserPlus className='text-green-500' />}
						title='Active Members'
						value={stats.activeMembers}
						trend='up'
					/>
					<GlassStatCard
						icon={<FiLayers className='text-purple-500' />}
						title='3 Gen. Members'
						value={`${stats.generation1}/${stats.generation2}/${stats.generation3}`}
					/>
					<GlassStatCard
						icon={<FiDollarSign className='text-amber-500' />}
						title='Total Earned'
						value={`$${stats.totalEarned}`}
						currency='USDT'
					/>
				</div>

				{/* Tiered Task Cards */}
				<div className='mb-16'>
					<div className='flex justify-between items-center mb-8'>
						<h2 className='text-2xl font-bold text-gray-900'>
							Your Progress Tiers
						</h2>
						<div className='flex items-center text-sm text-gray-500'>
							<div className='w-3 h-3 rounded-full bg-green-400 mr-2'></div>
							Completed
							<div className='w-3 h-3 rounded-full bg-blue-400 mx-3 mr-2'></div>
							In Progress
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{taskLevels.map((level) => (
							<PremiumTaskCard
								key={level.id}
								level={level}
								onClaim={handleClaimBonus}
								isClaimed={level.isClaimed}
								isClaiming={isClaiming}
							/>
						))}
					</div>
				</div>

				{/* Generation Visualization */}
				<div className='bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100'>
					<div className='flex justify-between items-center mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 flex items-center'>
							<FiLayers className='mr-3 text-indigo-500' />
							Generation Network
						</h2>
						<div className='text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full'>
							Total: {stats.generation1 + stats.generation2 + stats.generation3}{' '}
							Members
						</div>
					</div>

					<div className='relative'>
						{/* Generation Tree Visualization */}
						<div className='flex justify-center items-start space-x-4 md:space-x-12 lg:space-x-24'>
							{/* 1st Gen */}
							<div className='text-center'>
								<div className='w-20 h-20 rounded-full bg-indigo-100 border-4 border-indigo-300 flex items-center justify-center mx-auto mb-3'>
									<FiUserPlus className='text-indigo-600 text-2xl' />
								</div>
								<h3 className='font-bold text-indigo-700'>1st Generation</h3>
								<p className='text-2xl font-bold'>{stats.generation1}</p>
								<p className='text-xs text-gray-500'>Direct Members</p>
							</div>

							{/* 2nd Gen */}
							<div className='text-center mt-12'>
								<div className='w-20 h-20 rounded-full bg-purple-100 border-4 border-purple-300 flex items-center justify-center mx-auto mb-3'>
									<FiUsers className='text-purple-600 text-2xl' />
								</div>
								<h3 className='font-bold text-purple-700'>2nd Generation</h3>
								<p className='text-2xl font-bold'>{stats.generation2}</p>
								<p className='text-xs text-gray-500'>Indirect Members</p>
							</div>

							{/* 3rd Gen */}
							<div className='text-center mt-24'>
								<div className='w-20 h-20 rounded-full bg-pink-100 border-4 border-pink-300 flex items-center justify-center mx-auto mb-3'>
									<FiLayers className='text-pink-600 text-2xl' />
								</div>
								<h3 className='font-bold text-pink-700'>3rd Generation</h3>
								<p className='text-2xl font-bold'>{stats.generation3}</p>
								<p className='text-xs text-gray-500'>Extended Network</p>
							</div>
						</div>

						{/* Connecting Lines */}
						<div className='absolute top-1/4 left-1/4 right-1/4 h-1 bg-gradient-to-r from-indigo-200 to-purple-200 z-0'></div>
						<div className='absolute top-1/2 left-1/2 right-1/4 h-1 bg-gradient-to-r from-purple-200 to-pink-200 z-0'></div>
					</div>

					<div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='bg-indigo-50 p-6 rounded-xl'>
							<h3 className='font-bold text-indigo-800 mb-3'>How It Works</h3>
							<ul className='space-y-3'>
								<li className='flex items-start'>
									<div className='bg-indigo-100 p-1 rounded-full mr-3'>
										<FiCheckCircle className='text-indigo-600' />
									</div>
									<span className='text-gray-700'>
										Each level unlocks higher bonuses
									</span>
								</li>
								<li className='flex items-start'>
									<div className='bg-indigo-100 p-1 rounded-full mr-3'>
										<FiCheckCircle className='text-indigo-600' />
									</div>
									<span className='text-gray-700'>
										Members count across 3 generations
									</span>
								</li>
								<li className='flex items-start'>
									<div className='bg-indigo-100 p-1 rounded-full mr-3'>
										<FiCheckCircle className='text-indigo-600' />
									</div>
									<span className='text-gray-700'>
										Claim rewards instantly when achieved
									</span>
								</li>
							</ul>
						</div>

						<div className='bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl'>
							<h3 className='font-bold text-purple-800 mb-3'>Pro Tips</h3>
							<ul className='space-y-3'>
								<li className='flex items-start'>
									<div className='bg-purple-100 p-1 rounded-full mr-3'>
										<FiZap className='text-purple-600' />
									</div>
									<span className='text-gray-700'>
										Focus on activating your 1st generation
									</span>
								</li>
								<li className='flex items-start'>
									<div className='bg-purple-100 p-1 rounded-full mr-3'>
										<FiZap className='text-purple-600' />
									</div>
									<span className='text-gray-700'>
										Help your team grow their network
									</span>
								</li>
								<li className='flex items-start'>
									<div className='bg-purple-100 p-1 rounded-full mr-3'>
										<FiZap className='text-purple-600' />
									</div>
									<span className='text-gray-700'>
										Higher tiers offer exponential rewards
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// Glassmorphism Stat Card
const GlassStatCard: React.FC<{
	icon: React.ReactNode;
	title: string;
	value: string | number;
	trend?: 'up' | 'down';
	currency?: string;
}> = ({ icon, title, value, trend, currency }) => {
	return (
		<motion.div
			whileHover={{ y: -5 }}
			className='bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-5 border border-gray-100'
		>
			<div className='flex justify-between'>
				<div>
					<p className='text-sm font-medium text-gray-500'>{title}</p>
					<div className='flex items-end mt-2'>
						<p className='text-2xl font-bold text-gray-800'>
							{value}
							{currency && (
								<span className='text-sm ml-1 font-normal text-gray-500'>
									{currency}
								</span>
							)}
						</p>
						{trend === 'up' && (
							<span className='flex items-center ml-2 text-green-500 text-sm'>
								<FiTrendingUp className='mr-1' /> +12%
							</span>
						)}
						{trend === 'down' && (
							<span className='flex items-center ml-2 text-red-500 text-sm'>
								<FiTrendingUp className='mr-1 rotate-180' /> -5%
							</span>
						)}
					</div>
				</div>
				<div className='p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50'>
					{icon}
				</div>
			</div>
		</motion.div>
	);
};

const PremiumTaskCard: React.FC<{
	level: TaskLevel;
	onClaim: (id: number) => void;
	isClaimed: boolean;
	isClaiming: boolean;
}> = ({ level, onClaim, isClaimed, isClaiming }) => {
	const requiredMembers = parseInt(level.requirement.split(' ')[0]);
	const progressPercentage = Math.min(
		100,
		(level.progress / requiredMembers) * 100
	);
	const isCompleted = progressPercentage >= 100;

	return (
		<motion.div
			whileHover={{ y: -5 }}
			className={`border rounded-xl overflow-hidden bg-white shadow-sm ${level.color}`}
		>
			<div
				className={`h-2 w-full ${
					isCompleted
						? 'bg-gradient-to-r from-green-400 to-teal-400'
						: 'bg-gradient-to-r from-blue-400 to-indigo-400'
				}`}
			></div>

			<div className={`p-5 bg-gradient-to-b ${level.gradient}`}>
				<div className='flex justify-between items-start mb-4'>
					<div>
						<div className='flex items-center mb-2'>
							{level.icon}
							<span className='ml-2 text-sm font-medium text-gray-500'>
								{level.level}
							</span>
						</div>
						<h3 className='text-xl font-bold text-gray-800'>{level.bonus}</h3>
						<p className='text-sm text-gray-600 mt-1'>{level.requirement}</p>
					</div>
					{isCompleted && (
						<span
							className={`text-xs px-2 py-1 rounded-full flex items-center ${
								isClaimed
									? 'bg-gray-100 text-gray-600'
									: 'bg-green-100 text-green-600'
							}`}
						>
							{isClaimed ? 'Claimed' : 'Ready'}
						</span>
					)}
				</div>

				<div className='mb-5'>
					<div className='flex justify-between text-xs mb-1'>
						<span className='text-gray-500'>Progress</span>
						<span className='font-bold'>
							{level.progress}/{requiredMembers} (
							{progressPercentage.toFixed(0)}%)
						</span>
					</div>
					<div className='w-full bg-gray-200 rounded-full h-2'>
						<div
							className={`h-2 rounded-full ${
								isCompleted
									? 'bg-gradient-to-r from-green-400 to-teal-400'
									: 'bg-gradient-to-r from-blue-400 to-indigo-400'
							}`}
							style={{ width: `${progressPercentage}%` }}
						></div>
					</div>
				</div>

				<div className='flex justify-between items-center'>
					<div className='text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded'>
						{level.generations} Gen. Network
					</div>

					<button
						onClick={() => onClaim(level.id)}
						className={`px-4 py-2 rounded-lg text-sm font-medium ${
							isClaimed
								? 'bg-gray-200 text-gray-600 cursor-not-allowed'
								: isCompleted
								? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-md'
								: 'bg-gray-100 text-gray-500 cursor-not-allowed'
						} transition-all`}
						disabled={!isCompleted || isClaimed || isClaiming}
					>
						{isClaimed
							? 'Claimed'
							: isCompleted
							? 'Claim Bonus'
							: 'In Progress'}
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default TaskCenterPage;
