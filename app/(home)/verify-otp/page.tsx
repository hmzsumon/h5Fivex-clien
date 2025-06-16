'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';
import {
	useResendVerificationEmailMutation,
	useVerifyEmailMutation,
} from '@/redux/features/auth/authApi';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import PulseLoader from 'react-spinners/PulseLoader';

export default function VerifyOtpPage() {
	const searchParams = useSearchParams();
	const [verifyEmail, { isLoading, isError, isSuccess, error: apiError }] =
		useVerifyEmailMutation();

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

	const router = useRouter();
	const [email, setEmail] = useState<string | null>(null);
	useEffect(() => {
		const emailParam = searchParams.get('email'); // 🛑 Use 'email', not 'emai'
		setEmail(emailParam);
	}, [searchParams]);

	const [otp, setOtp] = useState('');
	const [error, setError] = useState('');
	const [resendTimer, setResendTimer] = useState(120);
	const [isResendEnabled, setIsResendEnabled] = useState(false);

	useEffect(() => {
		let timer: any;
		if (resendTimer > 0) {
			timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
		} else {
			setIsResendEnabled(true);
		}
		return () => clearTimeout(timer);
	}, [resendTimer]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOtp(e.target.value);
		setError('');
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const data = {
			email: email,
			code: otp,
		};
		verifyEmail(data);
	};

	useEffect(() => {
		if (isError) {
			console.error('Error verifying email:', apiError);
			toast.error((apiError as fetchBaseQueryError).data.error);
			setError((apiError as fetchBaseQueryError).data.error);
		} else if (isSuccess) {
			toast.success('Email verified successfully! Redirecting to login...');
			router.push('/login');
		}
	}, [isError, isSuccess, apiError]);

	const handleResend = () => {
		setIsResendEnabled(true);
		resendVerificationEmail({ email });
	};

	//useEffect
	useEffect(() => {
		if (isResendError) {
			console.error('Error resending OTP:', resendApiError);
			toast.error((resendApiError as fetchBaseQueryError).data.error);
			setError((resendApiError as fetchBaseQueryError).data.error);
		} else if (isResendSuccess) {
			toast.success('OTP resent successfully! Please check your email.');
			setResendTimer(120);
			setIsResendEnabled(false);
		}
	}, [isResendError, isResendSuccess, resendApiError]);

	return (
		<div className='min-h-screen bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 flex items-center justify-center p-4'>
			<Toaster position='top-center' reverseOrder={false} />
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
					<h2 className='text-2xl font-extrabold text-indigo-700 drop-shadow-md'>
						Verify OTP
					</h2>
					<p className='text-gray-700 mt-2 text-base'>
						Enter the 6-digit code sent to your email
					</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='relative'>
						<input
							type='text'
							name='otp'
							value={otp}
							onChange={handleChange}
							maxLength={6}
							placeholder='Enter OTP'
							className={`w-full px-4 py-3 rounded-2xl bg-white/80 border ${
								error ? 'border-red-400' : 'border-gray-300'
							} focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-center tracking-widest text-xl`}
						/>
						{error && (
							<p className='text-xs text-red-500 pt-1 text-center'>{error}</p>
						)}
					</div>

					{/* Submit Button */}
					<div className='pt-4'>
						<button
							type='submit'
							className='w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:from-indigo-600 hover:via-blue-600 hover:to-purple-600 py-3 rounded-2xl text-white font-bold shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
							disabled={isLoading || !otp || otp.length < 6}
						>
							{isLoading ? (
								<PulseLoader color={'#FFF'} size={10} />
							) : (
								'Verify OTP'
							)}
						</button>
					</div>

					{/* Resend OTP */}
					<div className='text-center mt-6'>
						{isResendEnabled ? (
							<button
								type='button'
								onClick={handleResend}
								className='text-indigo-600 hover:underline font-bold text-sm'
							>
								Resend OTP
							</button>
						) : (
							<p className='text-gray-600 text-sm'>
								Resend in {resendTimer} sec
							</p>
						)}
					</div>

					{/* Back to Login */}
					<div className='text-center text-sm text-gray-600 mt-6'>
						Remember password?{' '}
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
