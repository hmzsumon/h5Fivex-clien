'use client';

import { useState } from 'react';
import {
	FiArrowLeft,
	FiCopy,
	FiCheck,
	FiMail,
	FiAlertCircle,
	FiInfo,
} from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WithdrawPage() {
	const [amount, setAmount] = useState<string>('');
	const [walletAddress, setWalletAddress] = useState<string>('');
	const [network, setNetwork] = useState<'TRC20' | 'BEP20'>('TRC20');
	const [otp, setOtp] = useState<string>('');
	const [step, setStep] = useState<'form' | 'verify'>('form');
	const [copied, setCopied] = useState(false);

	const minWithdraw = 30;
	const fee = 5; // $1 withdrawal fee

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!amount || parseFloat(amount) < minWithdraw) {
			alert(`Minimum withdrawal amount is $${minWithdraw}`);
			return;
		}
		if (!walletAddress) {
			alert('Please enter your wallet address');
			return;
		}
		setStep('verify');
	};

	const handleVerify = (e: React.FormEvent) => {
		e.preventDefault();
		if (!otp) {
			alert('Please enter OTP');
			return;
		}
		alert(
			`Withdrawal request confirmed! $${amount} to ${walletAddress} (${network})`
		);
		setAmount('');
		setWalletAddress('');
		setOtp('');
		setStep('form');
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-8 flex items-center justify-center'>
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className='w-full max-w-md'
			>
				<div className='bg-white rounded-3xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-sm'>
					{/* Card Header */}
					<div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative'>
						<div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/pattern.svg')] bg-cover"></div>
						<div className='relative z-10'>
							<div className='flex items-center justify-between'>
								<Link
									href='/asset'
									className='flex items-center text-white/90 hover:text-white transition group'
								>
									<FiArrowLeft className='mr-2 group-hover:-translate-x-1 transition-transform' />
									<span className='text-sm'>Back</span>
								</Link>
								<h1 className='text-2xl font-bold bg-white/10 px-4 py-1 rounded-full'>
									Withdraw USDT
								</h1>
								<div className='w-6'></div>
							</div>
							<div className='mt-4 flex items-center justify-between'>
								<span className='bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm'>
									Min: {minWithdraw}$
								</span>
								<span className='text-sm bg-white/10 px-3 py-1 rounded-full'>
									Fee: {fee}%
								</span>
							</div>
						</div>
					</div>

					{/* Card Content */}
					<div className='p-6'>
						{step === 'form' ? (
							<motion.form
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.2 }}
								onSubmit={handleSubmit}
								className='space-y-6'
							>
								{/* Amount Input */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Amount to Withdraw (USDT)
									</label>
									<div className='relative'>
										<span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
											$
										</span>
										<input
											type='number'
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
											placeholder={`${minWithdraw} or more`}
											className='w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition'
											step='0.01'
											min={minWithdraw}
										/>
									</div>
									{amount && parseFloat(amount) < minWithdraw && (
										<motion.p
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className='text-red-500 text-xs mt-1 flex items-center'
										>
											<FiAlertCircle className='mr-1' />
											Minimum withdrawal is ${minWithdraw}
										</motion.p>
									)}
								</div>

								{/* Network Selection */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Select Network
									</label>
									<div className='grid grid-cols-2 gap-3'>
										<motion.button
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.98 }}
											type='button'
											onClick={() => setNetwork('TRC20')}
											className={`p-3 rounded-xl border ${
												network === 'TRC20'
													? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
													: 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
											} transition`}
										>
											TRC20
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.98 }}
											type='button'
											onClick={() => setNetwork('BEP20')}
											className={`p-3 rounded-xl border ${
												network === 'BEP20'
													? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
													: 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
											} transition`}
										>
											BEP20
										</motion.button>
									</div>
								</div>

								{/* Wallet Address */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										{network} Wallet Address
									</label>
									<input
										type='text'
										value={walletAddress}
										onChange={(e) => setWalletAddress(e.target.value)}
										placeholder={`Paste ${network} address`}
										className='w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono bg-gray-50/50 transition'
										required
									/>
								</div>

								{/* Submit Button */}
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									type='submit'
									disabled={true}
									className={`w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed `}
								>
									Request Withdrawal
								</motion.button>
							</motion.form>
						) : (
							/* OTP Verification Step */
							<motion.form
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								onSubmit={handleVerify}
								className='space-y-6'
							>
								<div className='text-center'>
									<motion.div
										animate={{
											rotate: [0, 10, -10, 0],
											scale: [1, 1.05, 1],
										}}
										transition={{ repeat: Infinity, duration: 2 }}
										className='mx-auto w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 shadow-inner'
									>
										<FiMail className='text-indigo-600 text-3xl' />
									</motion.div>
									<h2 className='text-2xl font-bold text-gray-800 mb-2'>
										Verify Withdrawal
									</h2>
									<p className='text-gray-600 mb-5'>
										We've sent a 6-digit OTP to your email
									</p>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										OTP Code
									</label>
									<div className='flex space-x-3'>
										{[...Array(6)].map((_, i) => (
											<motion.input
												key={i}
												type='text'
												maxLength={1}
												value={otp[i] || ''}
												onChange={(e) => {
													const newOtp = otp.split('');
													newOtp[i] = e.target.value;
													setOtp(newOtp.join('').slice(0, 6));
												}}
												className='w-full h-14 text-center text-2xl font-bold border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50'
												required
												whileFocus={{ scale: 1.05 }}
											/>
										))}
									</div>
								</div>

								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									type='submit'
									className='w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-500/20'
								>
									Confirm Withdrawal
								</motion.button>

								<button
									type='button'
									onClick={() => setStep('form')}
									className='w-full py-3 rounded-lg font-medium text-gray-600 hover:text-indigo-700 transition flex items-center justify-center'
								>
									<FiArrowLeft className='mr-2' />
									Back to Form
								</button>
							</motion.form>
						)}

						{/* Important Notes - Enhanced Version */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className='mt-8 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm'
						>
							<div className='bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-3 border-b border-gray-200 flex items-center'>
								<FiInfo className='text-indigo-600 mr-2' />
								<h4 className='text-sm font-semibold text-indigo-800'>
									Withdrawal Guidelines
								</h4>
							</div>
							<div className='p-4 space-y-3'>
								<div className='flex items-start'>
									<div className='flex-shrink-0 h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-0.5'>
										<span className='text-indigo-600 text-xs font-bold'>1</span>
									</div>
									<div>
										<p className='text-sm font-medium text-gray-800'>
											Minimum Withdrawal
										</p>
										<p className='text-xs text-gray-600'>
											${minWithdraw} USDT required for all withdrawals
										</p>
									</div>
								</div>

								<div className='flex items-start'>
									<div className='flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5'>
										<span className='text-purple-600 text-xs font-bold'>2</span>
									</div>
									<div>
										<p className='text-sm font-medium text-gray-800'>
											Network Fees
										</p>
										<p className='text-xs text-gray-600'>
											${fee} flat fee applies to all {network} transactions
										</p>
									</div>
								</div>

								<div className='flex items-start'>
									<div className='flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5'>
										<span className='text-blue-600 text-xs font-bold'>3</span>
									</div>
									<div>
										<p className='text-sm font-medium text-gray-800'>
											Processing Time
										</p>
										<p className='text-xs text-gray-600'>
											Typically completes within 5-30 minutes
										</p>
									</div>
								</div>

								<div className='flex items-start'>
									<div className='flex-shrink-0 h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-0.5'>
										<span className='text-amber-600 text-xs font-bold'>!</span>
									</div>
									<div>
										<p className='text-sm font-medium text-gray-800'>
											Address Verification
										</p>
										<p className='text-xs text-gray-600'>
											Ensure your {network} address is correct. Transactions
											cannot be reversed.
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
