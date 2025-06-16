'use client';
import React, { useState } from 'react';
import { FiFilter, FiUsers } from 'react-icons/fi';
import MemberCard from './MemberCard';
import { useGetMyTeamMembersQuery } from '@/redux/features/auth/authApi';

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

interface TeamData {
	members: TeamMember[];
}

const TeamTable = () => {
	const { data } = useGetMyTeamMembersQuery(undefined);

	const { members } = data || [{ members: [] }];

	const [statusFilter, setStatusFilter] = useState<
		'all' | 'active' | 'inactive'
	>('all');
	const [levelFilter, setLevelFilter] = useState<number | null>(null);
	const [expandedMember, setExpandedMember] = useState<string | null>(null);

	const teamData: TeamData = {
		members: data?.members || [],
	};

	const toggleMember = (id: string) => {
		setExpandedMember(expandedMember === id ? null : id);
	};

	const filteredMembers = teamData.members.filter((member) => {
		const statusMatch =
			statusFilter === 'all' || member.status === statusFilter;
		const levelMatch = levelFilter === null || member.level === levelFilter;
		return statusMatch && levelMatch;
	});

	return (
		<div>
			<div className='flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200'>
				<div className='flex-1 flex flex-col sm:flex-row gap-2 sm:gap-3'>
					<div className='flex-1 flex items-center bg-gray-50 rounded-lg p-2 border border-gray-200'>
						<FiFilter className='text-gray-500 mr-2 min-w-[16px]' />
						<select
							value={statusFilter}
							onChange={(e) =>
								setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')
							}
							className='bg-transparent w-full text-xs sm:text-sm outline-none'
						>
							<option value='all'>All Status</option>
							<option value='active'>Active</option>
							<option value='inactive'>Inactive</option>
						</select>
					</div>

					<div className='flex-1 flex items-center bg-gray-50 rounded-lg p-2 border border-gray-200'>
						<FiFilter className='text-gray-500 mr-2 min-w-[16px]' />
						<select
							value={levelFilter || ''}
							onChange={(e) =>
								setLevelFilter(e.target.value ? parseInt(e.target.value) : null)
							}
							className='bg-transparent w-full text-xs sm:text-sm outline-none'
						>
							<option value=''>All Levels</option>
							<option value='1'>Level 1</option>
							<option value='2'>Level 2</option>
							<option value='3'>Level 3</option>
						</select>
					</div>
				</div>
				<div className='sm:w-auto flex items-center justify-center bg-gray-50 rounded-lg p-2 border border-gray-200'>
					<span className='text-xs sm:text-sm text-gray-700'>
						Showing: {filteredMembers.length} members
					</span>
				</div>
			</div>

			<div className='bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200'>
				<h3 className='font-medium text-gray-700 mb-3 sm:mb-4 flex items-center text-sm sm:text-base'>
					<FiUsers className='mr-2 text-blue-500' />
					Team Members ({filteredMembers.length})
					<span className='ml-2 text-xs text-gray-500 hidden sm:inline'>
						{statusFilter === 'all' ? '' : `${statusFilter} `}
						{levelFilter ? `Level ${levelFilter}` : ''}
					</span>
				</h3>

				{filteredMembers.length === 0 ? (
					<div className='text-center py-6 sm:py-8 text-gray-500'>
						No members found matching your filters
					</div>
				) : (
					<div className='space-y-2 sm:space-y-3'>
						{filteredMembers.map((member) => (
							<MemberCard
								key={member.id}
								member={member}
								isExpanded={expandedMember === member.id}
								onToggle={toggleMember}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default TeamTable;
