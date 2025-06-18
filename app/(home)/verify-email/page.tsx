// app/verify-email/page.tsx
'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setForgotPasswordState } from '@/redux/features/auth/authSlice';
import { useResendVerificationEmailMutation } from '@/redux/features/auth/authApi';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import PulseLoader from 'react-spinners/PulseLoader';

export default function VerifyEmailPage() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { isForgotPassword } = useSelector((state: any) => state.auth);
	//resend otp
	const [
		resendVerificationEmail,
		{
			isLoading: isResendLoading,
			isError: isResendError,
			isSuccess: isResendSuccess,
			error: resendApiError,
		},
	] = useResendVerificationEmailMutation();

	const [email, setEmail] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) {
			toast.error('Please enter your email');
			return;
		}

		resendVerificationEmail({ email });
		if (isForgotPassword) {
			dispatch(setForgotPasswordState({ emailForgotPassword: email }));
		}
	};

	//useEffect
	useEffect(() => {
		if (isResendError) {
			console.error('Error resending OTP:', resendApiError);
			toast.error((resendApiError as fetchBaseQueryError).data.error);
			setError((resendApiError as fetchBaseQueryError).data.error);
		} else if (isResendSuccess) {
			toast.success('OTP resent successfully! Please check your email.');
			router.push('/verify-otp-password?email=' + email);
		}
	}, [isResendError, isResendSuccess, resendApiError]);

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 p-4'>
			<Toaster position='top-center' />
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7 }}
				className='w-full max-w-md bg-white/40 backdrop-blur-2xl rounded-3xl shadow-xl p-10 border border-white/30'
			>
				<div className='text-center mb-10'>
					<h1 className='text-4xl font-extrabold text-indigo-700 drop-shadow-md'>
						h5Fivex
					</h1>
					<h2 className='text-2xl font-extrabold text-indigo-700 mt-2 drop-shadow-md'>
						Verify Email
					</h2>
					<p className='text-gray-700 mt-2 text-base'>
						Enter your registered email
					</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Email input */}
					<div className='relative'>
						<FiMail className='absolute top-4 left-4 text-gray-400' />
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Email Address'
							className='w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-300'
						/>
						{error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
					</div>

					{/* Submit button */}
					<button
						type='submit'
						disabled={isResendLoading || !email}
						className='w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:from-indigo-600 hover:via-blue-600 hover:to-purple-600 py-3 rounded-2xl text-white font-bold shadow-md transition-transform transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed'
					>
						{isResendLoading ? 'Sending...' : 'Send Verification'}
					</button>

					{/* Back to login */}
					<div className='text-center text-sm text-gray-600 mt-6'>
						Remember your password?{' '}
						<Link
							href='/login'
							className='font-bold text-indigo-600 hover:underline'
						>
							Login
						</Link>
					</div>
				</form>
			</motion.div>
		</div>
	);
}
