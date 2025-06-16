'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from '@/public/home/logo.png'; // Adjust the path as necessary

const HomeNavbar = () => {
	const router = useRouter();

	const handleJoinNowClick = () => {
		router.push('/register');
	};

	return (
		<header className='bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 px-4 py-3 shadow-md'>
			<div className='max-w-7xl mx-auto flex justify-between items-center'>
				{/* Logo and Name - Tightly grouped */}
				<div className='flex items-center gap-1.5 md:gap-2'>
					<Image
						src={Logo}
						alt='h5Fivex Logo'
						className='w-auto h-[30px] md:h-[40px]'
					/>
				</div>

				{/* Join Now Button */}
				<button
					onClick={handleJoinNowClick}
					className='bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all font-medium
                    px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm whitespace-nowrap'
				>
					Join Now
				</button>
			</div>
		</header>
	);
};

export default HomeNavbar;
