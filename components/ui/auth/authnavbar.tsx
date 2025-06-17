'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Bell } from 'lucide-react';
import Logo from '@/public/home/logo.png';
import { NotificationDrawer } from '../notifications/NotificationDrawer';
import { useSocket } from '@/context/SocketContext';
import { useGetUnreadNotificationsCountQuery } from '@/redux/features/notifications/notificationApi';

const AuthNavbar = () => {
	const { socket } = useSocket();

	const { data, refetch } = useGetUnreadNotificationsCountQuery();
	const { dataCount } = data || {};

	const [count, setCount] = React.useState(0);

	// set count from dataCount
	useEffect(() => {
		if (dataCount) {
			setCount(dataCount);
		}
	}, [dataCount]);

	useEffect(() => {
		if (!socket) return;
		console.log('🔗 Socket connected:', socket.id);
		const handleRefetch = (data: any) => {
			refetch();
		};

		socket.on('user-notification', handleRefetch);

		return () => {
			socket.off('user-notification', handleRefetch);
		};
	}, [socket]);
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

				{/* Notification Drawer with Bell icon */}
				<NotificationDrawer>
					<button
						className='relative p-2.5 bg-white bg-opacity-60 rounded-full hover:bg-opacity-80 transition-all duration-200 shadow-sm hover:shadow-md'
						aria-label='Notifications'
					>
						<Bell className='w-5 h-5 md:w-6 md:h-6 text-gray-700' />
						{count > 0 && (
							<span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium'>
								{count > 99 ? '99+' : count}
							</span>
						)}
					</button>
				</NotificationDrawer>
			</div>
		</header>
	);
};

export default AuthNavbar;
