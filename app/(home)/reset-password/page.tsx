'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import PulseLoader from 'react-spinners/PulseLoader';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useResetForgotPasswordMutation } from '@/redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setForgotPasswordState } from '@/redux/features/auth/authSlice';

export default function ResetPasswordPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useDispatch();

	const [email, setEmail] = useState<string | null>(null);
	useEffect(() => {
		const emailParam = searchParams.get('email'); // 🛑 Use 'email', not 'emai'
		setEmail(emailParam);
	}, [searchParams]);

	const [
		resetForgotPassword,
		{
			isLoading,
			isSuccess: isResetSuccess,
			isError: isResetError,
			error: resetError,
		},
	] = useResetForgotPasswordMutation();

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		let valid = true;
		const newErrors: { [key: string]: string } = {};

		// Validate password
		if (!password || password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
			valid = false;
		}

		// Validate confirm password
		if (password !== confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
			valid = false;
		}

		// If validation fails, show errors
		if (!valid) {
			setErrors(newErrors);
			return;
		}

		const data = {
			email,
			newPassword: password,
		};

		resetForgotPassword(data).unwrap();
	};

	useEffect(() => {
		if (isResetError) {
			toast.error((resetError as fetchBaseQueryError).data.error);
			setErrors({ password: (resetError as fetchBaseQueryError).data.error });
		} else if (isResetSuccess) {
			toast.success('Password reset successfully!');
			dispatch(
				setForgotPasswordState({
					isForgotPassword: false,
					emailForgotPassword: '',
				})
			);
			router.push('/login');
		}
	}, [isResetError, isResetSuccess, resetError, router]);

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
					<h1 className='text-3xl font-extrabold text-indigo-700 drop-shadow-md'>
						h5Fivex
					</h1>
					<h2 className='text-xl font-bold text-indigo-700 drop-shadow-md'>
						Reset Password
					</h2>
					<p className='text-gray-700 mt-2 text-sm'>
						Enter your new password below
					</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Password */}
					<div className='relative'>
						<input
							type={showPassword ? 'text' : 'password'}
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='New Password'
							className={`w-full pl-4 pr-12 py-3 rounded-2xl bg-white/80 border ${
								errors.password ? 'border-red-400' : 'border-gray-300'
							} focus:ring-2 focus:ring-blue-300 focus:border-blue-300`}
						/>
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute top-4 right-4 text-gray-500'
						>
							{showPassword ? <FiEyeOff /> : <FiEye />}
						</button>
						{errors.password && (
							<p className='text-xs text-red-500 pt-1'>{errors.password}</p>
						)}
					</div>

					{/* Confirm Password */}
					<div className='relative'>
						<input
							type={showConfirmPassword ? 'text' : 'password'}
							name='confirmPassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder='Confirm Password'
							className={`w-full pl-4 pr-12 py-3 rounded-2xl bg-white/80 border ${
								errors.confirmPassword ? 'border-red-400' : 'border-gray-300'
							} focus:ring-2 focus:ring-blue-300 focus:border-blue-300`}
						/>
						<button
							type='button'
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className='absolute top-4 right-4 text-gray-500'
						>
							{showConfirmPassword ? <FiEyeOff /> : <FiEye />}
						</button>
						{errors.confirmPassword && (
							<p className='text-xs text-red-500 pt-1'>
								{errors.confirmPassword}
							</p>
						)}
					</div>

					{/* Submit Button */}
					<div className='pt-4'>
						<button
							type='submit'
							disabled={isLoading}
							className='w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:from-indigo-600 hover:via-blue-600 hover:to-purple-600 py-3 rounded-2xl text-white font-bold shadow-md transition-transform transform hover:scale-105'
						>
							{isLoading ? 'Resetting...' : 'Reset Password'}
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	);
}
