'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
	FiInfo,
	FiDollarSign,
	FiCreditCard,
	FiClock,
	FiPieChart,
	FiTrendingUp,
	FiUsers,
	FiMessageSquare,
	FiSettings,
	FiLogOut,
	FiChevronRight,
	FiCheckCircle,
	FiEdit,
	FiUpload,
	FiImage,
	FiLock,
	FiKey,
	FiDownload,
	FiSmartphone,
	FiCopy,
	FiCheck,
} from 'react-icons/fi';
import {
	useLogoutUserMutation,
	useMyAssetDetailsQuery,
} from '@/redux/features/auth/authApi';
import PulseLoader from 'react-spinners/PulseLoader';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
	const router = useRouter();

	const { data, isLoading } = useMyAssetDetailsQuery(undefined);
	const { assetData } = data || {};
	console.log('Asset Data:', assetData);

	const { user } = useSelector((state: any) => state.auth);

	const [logoutUser] = useLogoutUserMutation(); // Assuming you have a logout mutation defined in your authApi

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [activeTab, setActiveTab] = useState('asset-details');
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
	const [profileImage, setProfileImage] = useState('/default-avatar.jpg');
	const [email, setEmail] = useState('user@example.com');
	const [newEmail, setNewEmail] = useState('');
	const [showEmailForm, setShowEmailForm] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [copiedItems, setCopiedItems] = useState<Record<string, boolean>>({});

	// User data with enhanced fields for copy functionality
	const userData = {
		id: user?.customerId,
		email: user?.email,
		balance: user?.m_balance || 0.0,
		yesterdayEarnings: assetData?.thisMonthEarnings || 0.0,
		pendingFunds: 0,
		totalEarnings: assetData?.totalEarnings || 0.0,
		availableFunds: user?.m_balance - 3 || 0.0,
		todayEarnings: assetData?.todyEarnings || 0.0,
		teamCommissions: assetData?.todayTeamCommission || 0.0,
		yesterdayTeamCommissions: assetData?.thisMonthCommission || 0.0,
		totalTeamCommissions: assetData?.totalTeamCommission || 0.0,
		vipChannel: user?.vipTier || 'VIP 1',
	};

	const transactionHistory = [
		{
			id: 1,
			type: 'Deposit',
			amount: 100.0,
			date: '2025-05-10',
			status: 'Completed',
			txId: '0x1234567890abcdef',
		},
		{
			id: 2,
			type: 'Withdrawal',
			amount: -50.0,
			date: '2025-05-08',
			status: 'Completed',
			txId: '0x9876543210fedcba',
		},
		{
			id: 3,
			type: 'Commission',
			amount: 12.5,
			date: '2025-05-07',
			status: 'Completed',
			txId: '0xabcdef1234567890',
		},
	];

	const appDownloadLinks = {
		android: 'https://play.google.com/store/apps/details?id=com.example.app',
		ios: 'https://apps.apple.com/us/app/example-app/id1234567890',
	};

	// Unified copy handler with item tracking
	const handleCopy = (text: string, itemKey: string) => {
		navigator.clipboard.writeText(text);
		setCopiedItems((prev) => ({ ...prev, [itemKey]: true }));
		setTimeout(() => {
			setCopiedItems((prev) => ({ ...prev, [itemKey]: false }));
		}, 2000);
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target?.result) {
					setProfileImage(event.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleLogout = () => {
		logoutUser(undefined)
			.unwrap()
			.then(() => {
				router.push('/login'); // Redirect to login page after logout
			})
			.catch((err) => {
				console.error('Logout failed:', err);
			});
		setShowLogoutConfirm(false);
	};

	const handleEmailChange = (e: React.FormEvent) => {
		e.preventDefault();
		setEmail(newEmail);
		setNewEmail('');
		setShowEmailForm(false);
	};

	const handlePasswordChange = (e: React.FormEvent) => {
		e.preventDefault();
		// Add password change logic here
		setCurrentPassword('');
		setNewPassword('');
		setConfirmPassword('');
	};

	// Format transaction IDs for display
	const formatTxId = (txId: string) => {
		return `${txId.substring(0, 6)}...${txId.substring(txId.length - 4)}`;
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case 'asset-details':
				return (
					<div className='bg-white rounded-xl shadow-sm p-6 mt-4'>
						<h3 className='font-bold text-lg mb-4 text-gray-800'>
							Asset Details
						</h3>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<AssetDetailCard
								icon={<FiDollarSign className='text-blue-500' />}
								label='Total Balance'
								value={`${userData.balance.toFixed(2)} USDT`}
								bgColor='bg-blue-50'
							/>
							<AssetDetailCard
								icon={<FiTrendingUp className='text-green-500' />}
								label='Available Funds'
								value={`${userData.availableFunds.toFixed(2)} USDT`}
								bgColor='bg-green-50'
							/>
							<AssetDetailCard
								icon={<FiClock className='text-yellow-500' />}
								label="Today's Earnings"
								value={`${userData.todayEarnings.toFixed(2)} USDT`}
								bgColor='bg-yellow-50'
							/>
							<AssetDetailCard
								icon={<FiPieChart className='text-purple-500' />}
								label="This Month's Earnings"
								value={`${userData.yesterdayEarnings.toFixed(2)} USDT`}
								bgColor='bg-purple-50'
							/>
							<AssetDetailCard
								icon={<FiUsers className='text-indigo-500' />}
								label='Today Team Commissions'
								value={`${userData.teamCommissions.toFixed(2)} USDT`}
								bgColor='bg-indigo-50'
							/>
							<AssetDetailCard
								icon={<FiUsers className='text-teal-500' />}
								label='This Month Team Commissions'
								value={`${userData.yesterdayTeamCommissions.toFixed(2)} USDT`}
								bgColor='bg-teal-50'
							/>
							<AssetDetailCard
								icon={<FiDollarSign className='text-blue-500' />}
								label='Total Earnings'
								value={`${userData.totalEarnings.toFixed(2)} USDT`}
								bgColor='bg-blue-50'
							/>
							<AssetDetailCard
								icon={<FiUsers className='text-purple-500' />}
								label='Total Team Commissions'
								value={`${userData.totalTeamCommissions.toFixed(2)} USDT`}
								bgColor='bg-purple-50'
							/>
						</div>
					</div>
				);

			case 'login-password':
			case 'withdrawal-password':
				return (
					<div className='bg-white rounded-xl shadow-sm p-6 mt-4'>
						<h3 className='font-bold text-lg mb-4 text-gray-800'>
							{activeTab === 'login-password'
								? 'Change Login Password'
								: 'Change Withdrawal Password'}
						</h3>
						<form onSubmit={handlePasswordChange} className='space-y-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Current Password
								</label>
								<input
									type='password'
									value={currentPassword}
									onChange={(e) => setCurrentPassword(e.target.value)}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
									required
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									New Password
								</label>
								<input
									type='password'
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
									required
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Confirm New Password
								</label>
								<input
									type='password'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
									required
								/>
							</div>
							<button
								type='submit'
								className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed'
								disabled={true}
							>
								Update Password
							</button>
						</form>
					</div>
				);
			case 'app-download':
				return (
					<div className='bg-white rounded-xl shadow-sm p-6 mt-4'>
						<h3 className='font-bold text-lg mb-6 text-gray-800 flex items-center'>
							<FiSmartphone className='mr-2 text-blue-500' />
							Download Our Mobile App
						</h3>

						<div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 border border-blue-100'>
							<div className='flex items-center mb-4'>
								<div className='bg-blue-100 p-3 rounded-lg mr-4'>
									<FiSmartphone className='text-blue-600 text-2xl' />
								</div>
								<div>
									<h4 className='font-bold text-gray-800'>
										Better Experience on Mobile
									</h4>
									<p className='text-sm text-gray-600'>
										Trade anytime, anywhere with our app
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
								<div className='space-y-3'>
									<a
										href={appDownloadLinks.android}
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition'
									>
										<div className='flex items-center'>
											<div className='bg-white/10 p-1.5 rounded mr-3'>
												{/* Android icon placeholder */}
											</div>
											<div>
												<p className='text-xs text-gray-300'>Download on</p>
												<p className='font-medium text-white'>Android</p>
											</div>
										</div>
										<FiDownload className='text-white' />
									</a>
								</div>
							</div>
						</div>

						<div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
							<h4 className='font-medium text-gray-800 mb-2 flex items-center'>
								<FiCheckCircle className='text-green-500 mr-2' />
								App Features
							</h4>
							<ul className='text-sm text-gray-600 space-y-2'>
								<li className='flex items-start'>
									<span className='text-green-500 mr-2'>✓</span>
									Real-time trading and notifications
								</li>
								<li className='flex items-start'>
									<span className='text-green-500 mr-2'>✓</span>
									Secure biometric authentication
								</li>
								<li className='flex items-start'>
									<span className='text-green-500 mr-2'>✓</span>
									Faster deposits and withdrawals
								</li>
								<li className='flex items-start'>
									<span className='text-green-500 mr-2'>✓</span>
									Exclusive mobile-only promotions
								</li>
							</ul>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className='min-h-screen bg-gray-50 p-4 md:p-6'>
			<div className='max-w-md mx-auto'>
				{/* Profile Header */}
				<div className='flex flex-col items-center pt-6'>
					<div className='relative mb-4'>
						{/* Binance-style graphical avatar */}
						<img
							src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(
								userData.id || 'user'
							)}`}
							alt='Profile'
							className='w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover ring-2 ring-yellow-400'
						/>

						{/* Small User Icon at bottom-right */}
						<div className='absolute bottom-0 right-0 bg-yellow-500 p-1.5 rounded-full shadow-md'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4 text-white'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.304.535 6.121 1.484M15 10a3 3 0 11-6 0 3 3 0 016 0z'
								/>
							</svg>
						</div>
					</div>

					{/* Account Info with Copy Buttons */}
					<div className='text-center mb-3'>
						<div className='flex items-center justify-center'>
							<p className='text-gray-600 mr-2'>ID: {userData.id}</p>
							<button
								onClick={() => handleCopy(userData.id, 'user-id')}
								className='text-gray-400 hover:text-blue-500'
								title='Copy user ID'
							>
								{copiedItems['user-id'] ? (
									<FiCheck className='text-green-500' size={14} />
								) : (
									<FiCopy size={14} />
								)}
							</button>
						</div>

						<div className='flex items-center justify-center'>
							<p className='text-gray-600 mr-2'>{userData.email}</p>
						</div>
					</div>

					{/* VIP Badge */}
					<div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm'>
						{userData.vipChannel}
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className='bg-white rounded-xl shadow-sm overflow-hidden mb-6'>
					<TabButton
						icon={<FiDollarSign className='text-gray-600' />}
						label='Asset Details'
						active={activeTab === 'asset-details'}
						onClick={() => setActiveTab('asset-details')}
					/>

					<TabButton
						icon={<FiLock className='text-gray-600' />}
						label='Login Password'
						active={activeTab === 'login-password'}
						onClick={() => setActiveTab('login-password')}
					/>
					<TabButton
						icon={<FiDownload className='text-gray-600' />}
						label='Download App'
						active={activeTab === 'app-download'}
						onClick={() => setActiveTab('app-download')}
					/>
				</div>

				{/* Tab Content */}
				{renderTabContent()}

				{/* Logout Button */}
				<button
					onClick={() => setShowLogoutConfirm(true)}
					className='w-full flex items-center justify-center py-3 bg-white text-red-600 rounded-xl hover:bg-red-50 transition mt-6 border border-red-100 shadow-sm'
				>
					<FiLogOut className='mr-2' />
					<span className='font-medium'>Logout</span>
				</button>

				{/* Logout Confirmation Modal */}
				{showLogoutConfirm && (
					<div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
						<div className='bg-white rounded-xl p-6 max-w-sm w-full animate-fade-in'>
							<h3 className='text-lg font-bold mb-4 text-gray-800'>
								Confirm Logout
							</h3>
							<p className='text-gray-600 mb-6'>
								Are you sure you want to log out of your account?
							</p>
							<div className='flex space-x-3'>
								<button
									onClick={() => setShowLogoutConfirm(false)}
									className='flex-1 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-medium'
								>
									Cancel
								</button>
								<button
									onClick={handleLogout}
									className='flex-1 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium'
								>
									{isLoading ? (
										<PulseLoader color={'#FFF'} size={10} />
									) : (
										'Logout'
									)}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

// Enhanced StatCard component with highlight option
const StatCard = ({
	icon,
	label,
	value,
	highlight = false,
}: {
	icon: React.ReactNode;
	label: string;
	value: number;
	highlight?: boolean;
}) => (
	<div
		className={`${
			highlight ? 'bg-white/20' : 'bg-white/10'
		} p-2.5 rounded-lg backdrop-blur-sm`}
	>
		<div className='flex items-center text-xs mb-1'>
			<span className='mr-1.5'>{icon}</span>
			<span className='font-medium'>{label}</span>
		</div>
		<span
			className={`font-bold text-sm ${
				highlight ? 'text-white' : 'text-white/90'
			}`}
		>
			{value.toFixed(2)}
		</span>
	</div>
);

// Enhanced AssetDetailCard with copy functionality
const AssetDetailCard = ({
	icon,
	label,
	value,
	bgColor,
	onCopy,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
	bgColor: string;
	onCopy?: () => void;
}) => (
	<div className={`${bgColor} p-4 rounded-lg relative`}>
		<div className='flex items-center mb-2'>
			<div className='p-2 rounded-full bg-white shadow-sm mr-3'>{icon}</div>
			<h4 className='font-medium text-gray-800'>{label}</h4>
		</div>
		<div className='flex justify-between items-end'>
			<p className='text-xl font-bold text-gray-900'>{value}</p>
			{onCopy && (
				<button
					onClick={onCopy}
					className='text-gray-400 hover:text-blue-500 p-1'
					title='Copy value'
				>
					<FiCopy size={14} />
				</button>
			)}
		</div>
	</div>
);

const TabButton = ({
	icon,
	label,
	active,
	onClick,
}: {
	icon: React.ReactNode;
	label: string;
	active: boolean;
	onClick: () => void;
}) => (
	<button
		onClick={onClick}
		className={`w-full flex items-center justify-between p-4 text-left border-b border-gray-100 last:border-0 transition ${
			active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'
		}`}
	>
		<div className='flex items-center'>
			<span className={`mr-3 ${active ? 'text-blue-500' : 'text-gray-500'}`}>
				{icon}
			</span>
			<span className='font-medium'>{label}</span>
		</div>
		<FiChevronRight
			className={`${active ? 'text-blue-500' : 'text-gray-400'}`}
		/>
	</button>
);

export default ProfilePage;
