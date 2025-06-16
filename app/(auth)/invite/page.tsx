'use client';

import React, { useState } from 'react';
import {
	FiCopy,
	FiShare2,
	FiUsers,
	FiDollarSign,
	FiArrowLeft,
	FiCheck,
} from 'react-icons/fi';
import {
	FaWhatsapp,
	FaTelegram,
	FaFacebook,
	FaTwitter,
	FaLinkedin,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useGetInviteDataQuery } from '@/redux/features/auth/authApi';

// Simplified type definitions
type ShareOption = {
	platform: string;
	icon: JSX.Element;
	color: string;
	url: string;
};

type StatItem = {
	value: number;
	label: string;
	icon: JSX.Element;
	color: string;
};

export default function InvitePage() {
	const { user } = useSelector((state: any) => state.auth);

	const { data, isLoading } = useGetInviteDataQuery(undefined);
	const { inviteData } = data || {};

	const [copied, setCopied] = useState(false);

	// get host
	const host = window.location.host;
	// create referral link wit user customer_id
	let referralLink = '';
	if (process.env.NODE_ENV === 'development') {
		referralLink = `http://${host}/register?referral_code=${user?.customerId}`;
	} else {
		referralLink = `https://${host}/register?referral_code=${user?.customerId}`;
	}

	const referralCode = user?.customerId;
	const [activeShare, setActiveShare] = useState<string | null>(null);

	const stats: StatItem[] = [
		{
			value: inviteData?.totalTeamMember || 0,
			label: 'Friends Joined',
			icon: <FiUsers className='text-cyan-600' />,
			color: 'bg-gradient-to-br from-cyan-200 to-cyan-300',
		},
		{
			value: inviteData?.totalEarning || 0,
			label: 'Total Earnings',
			icon: <FiDollarSign className='text-sky-600' />,
			color: 'bg-gradient-to-br from-sky-200 to-sky-300',
		},
	];

	const shareOptions: ShareOption[] = [
		{
			platform: 'WhatsApp',
			icon: <FaWhatsapp className='text-white' size={20} />,
			color: 'bg-green-500 hover:bg-green-600',
			url: `https://wa.me/?text=${encodeURIComponent(
				`Join me on VIP Tasks and earn together! Use my code ${referralCode} or link: ${referralLink}`
			)}`,
		},
		{
			platform: 'Telegram',
			icon: <FaTelegram className='text-white' size={20} />,
			color: 'bg-blue-400 hover:bg-blue-500',
			url: `https://t.me/share/url?url=${encodeURIComponent(
				referralLink
			)}&text=${encodeURIComponent(`Use my VIP code: ${referralCode}`)}`,
		},
		{
			platform: 'Facebook',
			icon: <FaFacebook className='text-white' size={20} />,
			color: 'bg-blue-600 hover:bg-blue-700',
			url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
				referralLink
			)}&quote=${encodeURIComponent(`Join with my VIP code: ${referralCode}`)}`,
		},
		{
			platform: 'Twitter',
			icon: <FaTwitter className='text-white' size={20} />,
			color: 'bg-sky-400 hover:bg-sky-500',
			url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
				`Join VIP Tasks using my code ${referralCode} and earn together! ${referralLink}`
			)}`,
		},
		{
			platform: 'LinkedIn',
			icon: <FaLinkedin className='text-white' size={20} />,
			color: 'bg-blue-700 hover:bg-blue-800',
			url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
				referralLink
			)}`,
		},
	];

	const copyToClipboard = () => {
		navigator.clipboard.writeText(referralLink);
		setCopied(true);
		toast.success(
			<div className='flex items-center'>
				<FiCheck className='mr-2 text-green-500' />
				Link copied to clipboard!
			</div>
		);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleShare = (platform: string, url: string) => {
		setActiveShare(platform);
		setTimeout(() => {
			window.open(url, '_blank', 'noopener,noreferrer');
			setActiveShare(null);
		}, 300);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-100 p-8'>
			<Toaster position='top-center' />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/30'
			>
				{/* Header */}
				<div className='relative bg-gradient-to-r from-cyan-600 to-sky-600 p-6 text-white rounded-t-2xl'>
					<div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
					<div className='relative z-10'>
						<div className='flex items-center justify-between'>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='p-2 rounded-full hover:bg-white/20 transition'
							>
								<FiArrowLeft size={20} />
							</motion.button>
							<h2 className='text-xl md:text-2xl font-bold text-center flex-1'>
								Invite Friends
							</h2>
							<div className='w-8'></div>
						</div>
						<p className='text-center text-cyan-100 mt-2 text-sm md:text-base'>
							Earn <span className='font-semibold'>10% commission</span> on your
							friends' profits
						</p>
					</div>
				</div>

				{/* Stats */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className={`${stat.color} rounded-xl p-4 text-center border border-white/10 shadow-md`}
						>
							<div className='flex justify-center text-3xl mb-2'>
								{stat.icon}
							</div>
							<h3 className='text-3xl font-bold text-gray-800'>{stat.value}</h3>
							<p className='text-gray-600 text-sm'>{stat.label}</p>
						</motion.div>
					))}
				</div>

				{/* Referral Section */}
				<div className='px-6 pb-6'>
					{/* Referral Link */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className='mb-6'
					>
						<div className='flex items-center justify-between mb-2'>
							<h3 className='text-sm font-medium text-gray-600'>
								Your Referral Link
							</h3>
							<span className='text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full'>
								10% Commission
							</span>
						</div>
						<div className='flex shadow-sm'>
							<input
								type='text'
								value={referralLink}
								readOnly
								className='flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm bg-white/50'
							/>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={copyToClipboard}
								className={`px-4 py-3 rounded-r-lg font-medium text-sm flex items-center justify-center transition-all ${
									copied
										? 'bg-green-500 text-white shadow-inner'
										: 'bg-gradient-to-r from-cyan-500 to-sky-500 text-white hover:from-cyan-600 hover:to-sky-600 shadow-md'
								}`}
							>
								{copied ? (
									<span className='flex items-center'>
										<FiCheck className='mr-1' /> Copied
									</span>
								) : (
									<span className='flex items-center'>
										<FiCopy className='mr-1' /> Copy
									</span>
								)}
							</motion.button>
						</div>
					</motion.div>

					{/* Referral Code */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className='mb-8'
					>
						<h3 className='text-sm font-medium text-gray-600 mb-2'>
							Your Referral Code
						</h3>
						<motion.div
							whileHover={{ scale: 1.02 }}
							className='flex justify-center'
						>
							<div className='px-6 py-3 bg-gradient-to-r from-cyan-100 to-sky-100 border-2 border-dashed border-cyan-300 rounded-full text-cyan-700 font-bold text-lg shadow-inner cursor-default'>
								{referralCode}
							</div>
						</motion.div>
					</motion.div>

					{/* Share Buttons */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						<h3 className='text-sm font-medium text-gray-600 mb-3 text-center'>
							Share Via
						</h3>
						<div className='grid grid-cols-3 md:grid-cols-5 gap-4'>
							{shareOptions.map((option, index) => (
								<motion.div
									key={index}
									whileHover={{ y: -3 }}
									className='flex flex-col items-center'
								>
									<motion.button
										whileTap={{ scale: 0.9 }}
										onClick={() => handleShare(option.platform, option.url)}
										className={`w-12 h-12 flex items-center justify-center rounded-full ${option.color} shadow-md transition-all relative overflow-hidden group`}
									>
										<AnimatePresence>
											{activeShare === option.platform && (
												<motion.span
													initial={{ scale: 0 }}
													animate={{ scale: 10, opacity: 0 }}
													exit={{ scale: 0 }}
													className='absolute inset-0 bg-white/30 rounded-full'
													transition={{ duration: 0.6 }}
												/>
											)}
										</AnimatePresence>
										<span className='group-hover:scale-110 transition-transform'>
											{option.icon}
										</span>
									</motion.button>
									<span className='text-xs font-medium mt-2 text-gray-600'>
										{option.platform}
									</span>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>

				{/* How It Works */}
				<div className='bg-gradient-to-br from-cyan-50/70 to-sky-50/70 border-t border-white/30 p-6 backdrop-blur-sm'>
					<h3 className='font-bold text-gray-800 mb-4 flex items-center'>
						<FiShare2 className='mr-2 text-cyan-500' />
						How It Works
					</h3>
					<ul className='space-y-3'>
						{[
							'Share your referral link with friends',
							'They sign up and make a deposit',
							'You earn 10% of their profits',
						].map((step, index) => (
							<motion.li
								key={index}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6 + index * 0.1 }}
								className='flex items-start'
							>
								<div className='bg-cyan-100 text-cyan-600 rounded-full p-1 mr-3 flex-shrink-0'>
									<span className='block w-5 h-5 text-center text-sm font-bold'>
										{index + 1}
									</span>
								</div>
								<span className='text-gray-600 text-sm'>{step}</span>
							</motion.li>
						))}
					</ul>
				</div>
			</motion.div>
		</div>
	);
}
