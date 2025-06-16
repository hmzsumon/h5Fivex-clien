'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import PulseLoader from 'react-spinners/PulseLoader';

import { useRouter } from 'next/navigation';
import {
	useResendVerificationEmailMutation,
	useSecurityVerifyMutation,
} from '@/redux/features/auth/authApi';
import { addEmail } from '@/redux/resetPassSlice';
import { useDispatch } from 'react-redux';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const ForgotPassword = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	// call resend email verification api
	const [
		resendVerificationEmail,
		{
			isLoading: isResendLoading,
			isSuccess: isResendSuccess,
			isError: isResendError,
			error: resendError,
		},
	] = useResendVerificationEmailMutation();

	// call verify security code api
	const [
		verifySecurityCode,
		{
			isLoading: isVerifyLoading,
			isSuccess: isVerifySuccess,
			isError: isVerifyError,
			error: verifyError,
		},
	] = useSecurityVerifyMutation();
	// State variables for verification code and timer
	const [email, setEmail] = useState('');
	const [verificationCode, setVerificationCode] = useState('');
	const [codeError, setCodeError] = useState(false);
	const [resendDisabled, setResendDisabled] = useState(false);
	const [timer, setTimer] = useState(30);
	const [send, setSend] = useState(false);
	const [sendError, setSendError] = useState(false);

	//handle change email
	const handleChangeEmail = (e: any) => {
		setEmail(e.target.value);
		setSendError(false);
	};

	// Handle resend click
	const handleResend = (e: any) => {
		e.preventDefault();
		resendVerificationEmail({ email });
		setResendDisabled(true); // Disable resend button
		setTimer(60); // Reset timer
	};

	// handle verification
	const handleVerify = (e: any) => {
		e.preventDefault();
		const data = {
			email,
			code: verificationCode,
			url: '/',
		};
		verifySecurityCode(data);
	};

	// useEffect to handle timer countdown
	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		if (timer > 0 && resendDisabled) {
			intervalId = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		} else {
			setResendDisabled(false); // Enable resend button when timer finishes
		}

		return () => clearInterval(intervalId); // Cleanup interval
	}, [timer, resendDisabled]);

	// use effect to handle resend success
	useEffect(() => {
		if (isResendSuccess) {
			toast.success('Email sent successfully');
			setSend(true);
		}

		if (resendError) {
			if (isResendError) {
				toast.error((resendError as fetchBaseQueryError).data?.message);
				setSendError(true);
			}
		}
	}, [isResendSuccess, resendError, isResendError]);

	// use effect to handle verification success
	useEffect(() => {
		if (isVerifySuccess) {
			toast.success('Verification successful');
			dispatch(addEmail(email));
			router.push('/reset-password');
		}

		if (verifyError) {
			if (isVerifyError) {
				toast.error((verifyError as fetchBaseQueryError).data?.message);
				setCodeError(true);
			}
		}
	}, [isVerifySuccess, verifyError, isVerifyError]);
	return (
		<div className=' bg-white p-4 mt-20'>
			{send ? (
				<Card className='max-w-sm mx-auto p-4'>
					<div className=' space-y-1'>
						<h2 className=' text-gray-800 font-bold text-center'>
							Sent a verification code to{' '}
						</h2>
						<p className='font-semibold text-htx-blue text-xs text-center'>
							{email}
						</p>
					</div>
					<form className='flex flex-col gap-4' onSubmit={handleVerify}>
						<div>
							<div className='mb-2 block'>
								<Label
									htmlFor='email1'
									className='text-gray-800 text-sm font-semibold ml-1'
								>
									Your Code
								</Label>
							</div>
							<div>
								<Input
									id='text1'
									type='text'
									required
									placeholder=' e.g. 123456'
									value={verificationCode}
									onChange={(e) => setVerificationCode(e.target.value)}
								/>
								{codeError && (
									<span className='text-xs text-red-500 ml-1'>
										Please enter the correct code
									</span>
								)}
							</div>
							<span className='mt-1 flex justify-end pr-2 text-xs'>
								Didn’t get the code?{' '}
								<span
									className={`font-bold cursor-pointer hover:text-icm-green ml-1 ${
										resendDisabled ? 'text-icm-green' : ''
									}`}
									onClick={handleResend}
								>
									{resendDisabled ? `Resend in ${timer} seconds` : 'Resend'}
								</span>
							</span>
						</div>

						<Button type='submit' className=' bg-htx-blue hover:bg-blue-700'>
							{isResendLoading || isVerifyLoading ? (
								<PulseLoader color='#fff' size={8} margin={2} />
							) : (
								'Submit'
							)}
						</Button>
					</form>
				</Card>
			) : (
				<Card className='max-w-sm mx-auto  p-4'>
					<div>
						<h2 className=' text-htx-blue font-bold text-center'>
							Forgot your password?
						</h2>
					</div>
					<form className='flex flex-col gap-4' onSubmit={handleResend}>
						<div>
							<Label
								htmlFor='email1'
								className='text-gray-800 text-sm font-semibold ml-1'
							>
								Enter Your email
							</Label>

							<Input
								id='email1'
								type='email'
								placeholder='e.g. example@gmail.com'
								required
								value={email}
								autoComplete='off'
								onChange={handleChangeEmail}
								className='w-full px-3 py-2 border rounded-md text-xs mt-1 placeholder:text-xs'
							/>
							{sendError && (
								<span className='text-xs text-red-500'>
									It seem we are having trouble sending the email.
								</span>
							)}
						</div>

						<Button type='submit' className=' bg-htx-blue hover:bg-blue-700'>
							{isResendLoading || isVerifyLoading ? (
								<PulseLoader color='#fff' size={8} margin={2} />
							) : (
								'Continue'
							)}
						</Button>
					</form>
				</Card>
			)}
		</div>
	);
};

export default ForgotPassword;
