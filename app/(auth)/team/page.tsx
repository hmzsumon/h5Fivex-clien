'use client';

import React, { useState } from 'react';
import {
	FiChevronDown,
	FiChevronUp,
	FiPhone,
	FiDollarSign,
	FiUserCheck,
	FiUserX,
	FiUsers,
	FiActivity,
	FiUser,
	FiFilter,
	FiCreditCard,
	FiTrendingUp,
	FiTrendingDown,
	FiAward,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useGetMyTeamQuery } from '@/redux/features/auth/authApi';
import { BeatLoader } from 'react-spinners';
import TeamTable from '@/components/ui/auth/team/TeamTable';

interface TeamMember {
	id: string;
	name: string;
	email: string;
	phone: string;
	level: number;
	status: 'active' | 'inactive';
	deposit: number;
	withdrawal: number;
	commission: number;
	joinDate: string;
	sponsorId: string;
}

interface LevelStats {
	total: number;
	activeUsers: number;
	inactiveUsers: number;
	deposit: number;
	activeDeposit: number;
	withdraw: number;
	commission: number;
	users: TeamMember[];
}

const StatCard: React.FC<{
	icon: React.ReactNode;
	title: string;
	value: string | number;
	subtitle?: string;
	color?: 'blue' | 'purple' | 'green' | 'red';
	isLoading?: boolean;
}> = ({ icon, title, value, subtitle = '', color = 'blue', isLoading }) => {
	const colors = {
		blue: 'bg-blue-50 text-blue-600 border-blue-200',
		purple: 'bg-purple-50 text-purple-600 border-purple-200',
		green: 'bg-green-50 text-green-600 border-green-200',
		red: 'bg-red-50 text-red-600 border-red-200',
	};

	return (
		<motion.div
			whileHover={{ y: -2 }}
			className={`p-3 rounded-lg shadow-sm border ${colors[color]}`}
		>
			<div className='flex items-center justify-between'>
				<div>
					<p className='text-xs sm:text-sm font-medium'>{title}</p>
					<p className='text-xl sm:text-2xl font-bold'>
						{isLoading ? (
							<BeatLoader size={10} color='#4F46E5' />
						) : typeof value === 'number' ? (
							value.toLocaleString()
						) : (
							value
						)}
					</p>
					{subtitle && <p className='text-xs opacity-80'>{subtitle}</p>}
				</div>
				<div className='p-1 sm:p-2 rounded-full bg-white/50'>{icon}</div>
			</div>
		</motion.div>
	);
};

const LevelStatItem: React.FC<{ level: number; stats: LevelStats }> = ({
	level,
	stats,
}) => {
	const levelColors = [
		'bg-purple-100 text-purple-800',
		'bg-green-100 text-green-800',
		'bg-amber-100 text-amber-800',
	];

	return (
		<div>
			<div className='flex justify-between items-center mb-1'>
				<span
					className={`text-xs font-medium px-2 py-1 rounded-full ${
						levelColors[level - 1]
					}`}
				>
					Level {level}
				</span>
				<span className='text-xs sm:text-sm font-medium'>
					{stats?.users?.length} members ({stats?.activeUsers} active /{' '}
					{stats?.inactiveUsers} inactive)
				</span>
			</div>
			<div className='grid grid-cols-2 gap-2 text-xs'>
				<div className='bg-gray-50 p-1 sm:p-2 rounded'>
					<p className='text-gray-500'>Deposit</p>
					<p className='font-medium'>${stats?.deposit.toFixed(2)}</p>
				</div>
				<div className='bg-gray-50 p-1 sm:p-2 rounded'>
					<p className='text-gray-500'>Withdrawal</p>
					<p className='font-medium'>${stats?.withdraw.toFixed(2)}</p>
				</div>
				<div className='bg-gray-50 p-1 sm:p-2 rounded'>
					<p className='text-gray-500'>Commission</p>
					<p className='font-medium'>${stats?.commission.toFixed(2)}</p>
				</div>
				<div className='bg-gray-50 p-1 sm:p-2 rounded'>
					<p className='text-gray-500'>Active Deposit</p>
					<p className='font-medium'>${stats?.activeDeposit.toFixed(2)}</p>
				</div>
			</div>
		</div>
	);
};

const FinancialStatItem: React.FC<{
	title: string;
	value: string;
	icon: React.ReactNode;
}> = ({ title, value, icon }) => {
	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center'>
				<div className='mr-2 p-1 sm:p-2 rounded-full bg-gray-100'>{icon}</div>
				<span className='text-xs sm:text-sm font-medium text-gray-700'>
					{title}
				</span>
			</div>
			<span className='text-sm sm:text-base font-medium'>{value}</span>
		</div>
	);
};

const CommissionItem: React.FC<{ level: number; value: number }> = ({
	level,
	value,
}) => {
	const levelColors = [
		'bg-purple-100 text-purple-800',
		'bg-green-100 text-green-800',
		'bg-amber-100 text-amber-800',
	];

	return (
		<div className='flex justify-between items-center'>
			<span
				className={`text-xs font-medium px-2 py-1 rounded-full ${
					levelColors[level - 1]
				}`}
			>
				Level {level} Commission
			</span>
			<span className='font-medium'>${value?.toFixed(2)}</span>
		</div>
	);
};

const TeamDashboard: React.FC = () => {
	const { data, isLoading } = useGetMyTeamQuery(undefined);
	const { team } = data || {};

	return (
		<div className='min-h-screen bg-gray-50 p-3 sm:p-6'>
			<div className='max-w-7xl mx-auto'>
				<h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center'>
					<FiUsers className='mr-2 text-blue-500' />
					Team Details
				</h1>

				<div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6'>
					<StatCard
						icon={<FiUser className='text-blue-500' />}
						title='Direct Members'
						value={team?.level_1?.users?.length || 0}
						color='blue'
						isLoading={isLoading}
					/>
					<StatCard
						icon={<FiUsers className='text-purple-500' />}
						title='Team Members'
						value={`${team?.teamActiveMember} / ${
							team?.totalTeamMember - team?.teamActiveMember
						}`}
						subtitle={`Active / Inactive`}
						color='purple'
					/>
					<StatCard
						icon={<FiTrendingUp className='text-green-500' />}
						title='Team Deposits'
						value={`$${team?.totalTeamDeposit.toFixed(2)}`}
						subtitle={`Active: $${team?.totalTeamActiveDeposit.toFixed(2)}`}
						color='green'
					/>
					<StatCard
						icon={<FiTrendingDown className='text-red-500' />}
						title='Team Withdrawals'
						value={`$${team?.totalTeamWithdraw.toFixed(2)}`}
						color='red'
					/>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6'>
					<div className='bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200'>
						<h3 className='font-medium text-gray-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base'>
							<FiActivity className='mr-2 text-blue-500' />
							Level-wise Statistics
						</h3>
						<div className='space-y-2 sm:space-y-3'>
							<LevelStatItem level={1} stats={team?.level_1} />
							<LevelStatItem level={2} stats={team?.level_2} />
							<LevelStatItem level={3} stats={team?.level_3} />
						</div>
					</div>

					<div className='bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200'>
						<h3 className='font-medium text-gray-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base'>
							<FiCreditCard className='mr-2 text-green-500' />
							Financial Overview
						</h3>
						<div className='space-y-2 sm:space-y-3'>
							<FinancialStatItem
								title='Total Team Deposit'
								value={`$${team?.totalTeamDeposit.toFixed(2)}`}
								icon={<FiTrendingUp className='text-green-500' />}
							/>
							<FinancialStatItem
								title='Active Team Deposit'
								value={`$${team?.totalTeamActiveDeposit.toFixed(2)}`}
								icon={<FiTrendingUp className='text-blue-500' />}
							/>
							<FinancialStatItem
								title='Total Team Withdrawal'
								value={`$${team?.totalTeamWithdraw.toFixed(2)}`}
								icon={<FiTrendingDown className='text-red-500' />}
							/>
						</div>
					</div>

					<div className='bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200'>
						<h3 className='font-medium text-gray-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base'>
							<FiDollarSign className='mr-2 text-purple-500' />
							Commission Breakdown
						</h3>
						<div className='space-y-2 sm:space-y-3'>
							<CommissionItem level={1} value={team?.level_1?.commission} />
							<CommissionItem level={2} value={team?.level_2?.commission} />
							<CommissionItem level={3} value={team?.level_3?.commission} />
							<div className='pt-2 border-t border-gray-100'>
								<div className='flex justify-between items-center'>
									<span className='text-sm sm:text-base font-medium'>
										Total Commission
									</span>
									<span className='font-bold text-purple-600'>
										${team?.totalTeamCommission.toFixed(2)}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* MemberCard */}
				<div>
					<TeamTable />
				</div>
			</div>
		</div>
	);
};

export default TeamDashboard;
