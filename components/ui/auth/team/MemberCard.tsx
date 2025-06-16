'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
	FiActivity,
	FiAward,
	FiChevronDown,
	FiChevronUp,
	FiDollarSign,
	FiPhone,
	FiUser,
	FiUserCheck,
	FiUsers,
	FiUserX,
} from 'react-icons/fi';
import { formatDate, maskEmail } from '@/lib/functions';

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
	customerId: string;
}

interface MemberCardProps {
	member: TeamMember;
	isExpanded: boolean;
	onToggle: (id: string) => void;
}

const DetailItem: React.FC<{
	label: string;
	value: string | React.ReactNode;
	icon?: React.ReactNode;
}> = ({ label, value, icon }) => {
	return (
		<div className='flex items-start'>
			{icon && <div className='mr-2 mt-0.5 text-gray-500'>{icon}</div>}
			<div>
				<p className='text-xs text-gray-500'>{label}</p>
				<div className='font-medium text-sm'>
					{typeof value === 'string' ? (
						<span className='break-all'>{value}</span>
					) : (
						value
					)}
				</div>
			</div>
		</div>
	);
};

const MemberCard = ({ member, isExpanded, onToggle }: MemberCardProps) => {
	const statusColor =
		member.status === 'active'
			? 'bg-green-100 text-green-800'
			: 'bg-red-100 text-red-800';
	const levelColors = [
		'bg-purple-100 text-purple-800',
		'bg-green-100 text-green-800',
		'bg-amber-100 text-amber-800',
	];

	return (
		<motion.div
			layout
			className={`border rounded-lg overflow-hidden ${
				isExpanded ? 'border-blue-300' : 'border-gray-200'
			}`}
		>
			<div
				className={`p-3 sm:p-4 cursor-pointer ${
					isExpanded ? 'bg-blue-50' : 'bg-white'
				}`}
				onClick={() => onToggle(member.id)}
			>
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
					<div className='flex items-start sm:items-center space-x-3 flex-1 min-w-0'>
						<div className={`p-1.5 sm:p-2 rounded-full ${statusColor}`}>
							{member.status === 'active' ? (
								<FiUserCheck size={16} />
							) : (
								<FiUserX size={16} />
							)}
						</div>
						<div className='min-w-0 flex-1'>
							<div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
								<h3 className='font-medium text-sm sm:text-base truncate'>
									{member.name}
								</h3>
								<span
									className={`text-xs font-medium px-2 py-0.5 rounded-full ${
										levelColors[member.level - 1]
									} mt-1 sm:mt-0`}
								>
									Level {member.level}
								</span>
							</div>
							<p className='text-xs sm:text-sm text-gray-600 truncate'>
								{maskEmail(member.email)}
							</p>

							<div className='sm:hidden mt-1 grid grid-cols-2 gap-1 text-xs'>
								<div>
									<p className='text-gray-500'>Deposit</p>
									<p className='font-semibold text-blue-600'>
										${member?.deposit?.toFixed(2)}
									</p>
								</div>
								<div>
									<p className='text-gray-500'>Withdrawal</p>
									<p className='font-semibold text-green-600'>
										${member?.withdrawal?.toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className='hidden sm:flex items-center justify-end gap-3'>
						<div className='grid grid-cols-3 gap-2 text-sm'>
							<div className='text-center min-w-[70px]'>
								<p className='text-xs text-gray-500'>Deposit</p>
								<p className='font-semibold text-blue-600'>
									${member?.deposit?.toFixed(2)}
								</p>
							</div>
							<div className='text-center min-w-[70px]'>
								<p className='text-xs text-gray-500'>Withdrawal</p>
								<p className='font-semibold text-green-600'>
									${member?.withdrawal?.toFixed(2)}
								</p>
							</div>
							<div className='flex items-center justify-center'>
								<button className='p-1 rounded-full hover:bg-gray-200'>
									{isExpanded ? <FiChevronUp /> : <FiChevronDown />}
								</button>
							</div>
						</div>
					</div>

					<div className='sm:hidden flex justify-end'>
						<button
							className='p-1 rounded-full hover:bg-gray-200'
							onClick={(e) => {
								e.stopPropagation();
								onToggle(member.id);
							}}
						>
							{isExpanded ? <FiChevronUp /> : <FiChevronDown />}
						</button>
					</div>
				</div>
			</div>

			{isExpanded && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.2 }}
					className='bg-gray-50 p-3 sm:p-4 border-t'
				>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
						<div className='space-y-2'>
							<DetailItem
								label='Member ID'
								value={member.customerId}
								icon={<FiUser />}
							/>
							<DetailItem
								label='Sponsor'
								value={member.sponsorId}
								icon={<FiUsers />}
							/>
							<DetailItem
								label='Phone'
								value={member.phone}
								icon={<FiPhone />}
							/>
							<DetailItem
								label='Joined Date'
								value={formatDate(new Date(member.joinDate))}
								icon={<FiActivity />}
							/>
						</div>
						<div className='space-y-2'>
							<DetailItem
								label='Status'
								value={
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
									>
										{member.status.charAt(0).toUpperCase() +
											member.status.slice(1)}
									</span>
								}
								icon={
									member.status === 'active' ? <FiUserCheck /> : <FiUserX />
								}
							/>
							<DetailItem
								label='Commission'
								value={`$${member.commission.toFixed(2)}`}
								icon={<FiDollarSign />}
							/>
							<DetailItem
								label='Level'
								value={member.level}
								icon={<FiAward />}
							/>
						</div>
					</div>
				</motion.div>
			)}
		</motion.div>
	);
};

export default MemberCard;
