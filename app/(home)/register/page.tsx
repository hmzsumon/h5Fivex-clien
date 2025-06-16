// app/signup/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
	FiUser,
	FiMail,
	FiPhone,
	FiLock,
	FiEye,
	FiEyeOff,
	FiRefreshCw,
	FiGift,
} from 'react-icons/fi';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, color } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Link from 'next/link';
import { useRegisterUserMutation } from '@/redux/features/admin/adminUsersApi';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import PulseLoader from 'react-spinners/PulseLoader';
import { useLazyCheckEmailExistOrNotQuery } from '@/redux/features/auth/authApi';

interface FormData {
	fullName: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
	referralCode: string;
	captcha: string;
}

export default function SignupPage() {
	const [checkEmail, { data: emailCheckResult, isFetching: checkingEmail }] =
		useLazyCheckEmailExistOrNotQuery();

	const [registerUser, { isLoading, isError, isSuccess, error }] =
		useRegisterUserMutation();
	const router = useRouter();

	const [edit, setEdit] = useState(true);

	const [formData, setFormData] = useState<FormData>({
		fullName: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: '',
		referralCode: '',
		captcha: '',
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const searchParams = useSearchParams();
	const referral_code = searchParams.get('referral_code');

	useEffect(() => {
		if (referral_code) {
			setFormData((prev) => ({
				...prev,
				referralCode: referral_code,
			}));
			setEdit(false);
		}
	}, [referral_code]);

	const [captchaText, setCaptchaText] = useState('');

	useEffect(() => {
		generateCaptcha();
	}, []);

	const generateCaptcha = () => {
		const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let captcha = '';
		for (let i = 0; i < 6; i++) {
			captcha += chars[Math.floor(Math.random() * chars.length)];
		}
		setCaptchaText(captcha);
		setFormData((prev) => ({ ...prev, captcha: '' }));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validateForm = () => {
		let valid = true;
		const newErrors: { [key: string]: string } = {};

		if (!formData.fullName.trim()) {
			newErrors.fullName = 'Full name is required';
			valid = false;
		}

		if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Valid email is required';
			valid = false;
		}

		if (!formData.phone || formData.phone.length < 6) {
			newErrors.phone = 'Valid phone number is required';
			valid = false;
		}

		if (!formData.password || formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
			valid = false;
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
			valid = false;
		}

		if (formData.captcha !== captchaText) {
			newErrors.captcha = 'Incorrect CAPTCHA';
			valid = false;
			generateCaptcha();
		}

		setErrors(newErrors);
		return valid;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) {
			toast.error('Please fix the errors!');
			return;
		}
		const data = {
			name: formData.fullName,
			email: formData.email,
			phone: formData.phone,
			password: formData.password,
			referralCode: formData.referralCode || null,
		};

		registerUser(data).unwrap();
	};

	const handleEmailBlur = async () => {
		if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
			return;

		const result = await checkEmail(formData.email).unwrap();

		if (result.exists) {
			setErrors((prev) => ({ ...prev, email: 'Email already exists' }));
		} else {
			setErrors((prev) => ({ ...prev, email: '' }));
		}
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Account created successfully! Redirecting...');
			router.push('/verify-otp?email=' + formData.email);
		}
		if (isError) {
			toast.error((error as fetchBaseQueryError).data.error);
		}
	}, [isError, isSuccess, error]);

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
						Create Account
					</h2>
					<p className='text-gray-700 mt-2 text-base'>Join & Grow With Us 🌍</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Full Name */}
					<div className='relative'>
						<FiUser className='absolute top-4 left-4 text-gray-400' />
						<input
							type='text'
							name='fullName'
							value={formData.fullName}
							onChange={handleChange}
							placeholder='Full Name'
							className={`w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 border ${
								errors.fullName ? 'border-red-400' : 'border-gray-300'
							} focus:ring-2 focus:ring-blue-300 focus:border-blue-300`}
						/>
						{errors.fullName && (
							<p className='text-xs text-red-500 pt-1'>{errors.fullName}</p>
						)}
					</div>

					{/* Email */}
					<div className='relative'>
						<FiMail className='absolute top-4 left-4 text-gray-400' />
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							onBlur={handleEmailBlur}
							placeholder='Email Address'
							className={`w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 border ${
								errors.email ? 'border-red-400' : 'border-gray-300'
							} focus:ring-2 focus:ring-blue-300 focus:border-blue-300`}
						/>
						{checkingEmail && (
							<span className='absolute right-4 top-4 text-xs text-blue-500 animate-pulse'>
								Checking...
							</span>
						)}
						{errors.email && (
							<p className='text-xs text-red-500 pt-1'>{errors.email}</p>
						)}
					</div>

					{/* Phone */}
					<div>
						<PhoneInput
							country={'gb'} // UK as the default
							value={formData.phone}
							onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
							inputClass='!w-full !pl-12 !pr-4 !py-3 !rounded-2xl !bg-white/80 !border-gray-300 focus:!ring-blue-300 focus:!border-blue-300'
							containerClass='relative'
							buttonClass='!bg-white/80'
							dropdownClass='!bg-white'
						/>
						{errors.phone && (
							<p className='text-xs text-red-500 pt-1'>{errors.phone}</p>
						)}
					</div>

					{/* Password */}
					<div className='relative'>
						<FiLock className='absolute top-4 left-4 text-gray-400' />
						<input
							type={showPassword ? 'text' : 'password'}
							name='password'
							value={formData.password}
							onChange={handleChange}
							placeholder='Password'
							className={`w-full pl-12 pr-12 py-3 rounded-2xl bg-white/80 border ${
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
						<FiLock className='absolute top-4 left-4 text-gray-400' />
						<input
							type={showConfirmPassword ? 'text' : 'password'}
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
							placeholder='Confirm Password'
							className={`w-full pl-12 pr-12 py-3 rounded-2xl bg-white/80 border ${
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

					{/* Referral Code */}
					<div className='relative'>
						<FiGift className='absolute top-4 left-4 text-gray-400' />
						<input
							type='text'
							name='referralCode'
							value={formData.referralCode}
							onChange={handleChange}
							placeholder='Referral code(Optional)'
							className='w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500'
							disabled={edit ? false : true}
						/>
					</div>

					{/* CAPTCHA */}
					<div className='text-center'>
						<div className='flex justify-center items-center gap-2 mb-3'>
							<div className='font-mono text-lg tracking-widest bg-gray-100 py-2 px-6 rounded-lg'>
								{captchaText}
							</div>
							<button
								type='button'
								onClick={generateCaptcha}
								className='p-2 rounded-full bg-gray-200 hover:bg-gray-300'
							>
								<FiRefreshCw className='text-gray-600' />
							</button>
						</div>
						<input
							type='text'
							name='captcha'
							value={formData.captcha}
							onChange={handleChange}
							placeholder='Enter CAPTCHA'
							className={`w-full px-4 py-3 rounded-2xl bg-white/80 border ${
								errors.captcha ? 'border-red-400' : 'border-gray-300'
							} focus:ring-2 focus:ring-blue-300 focus:border-blue-300`}
						/>
						{errors.captcha && (
							<p className='text-xs text-red-500 pt-1'>{errors.captcha}</p>
						)}
					</div>

					{/* Submit Button */}
					<div className='pt-4'>
						<button
							type='submit'
							disabled={isLoading}
							className='w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:from-indigo-600 hover:via-blue-600 hover:to-purple-600 py-3 rounded-2xl text-white font-bold shadow-md transition-transform transform hover:scale-105'
						>
							{isLoading ? (
								<PulseLoader color={'#FFF'} size={10} />
							) : (
								'Create Account'
							)}
						</button>
					</div>

					<div className='text-center text-sm text-gray-600 mt-6'>
						Already have an account?{' '}
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
