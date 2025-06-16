import React from 'react';
import HomeNavbar from '@/components/ui/home/Navbar';
import HomeFotter from '@/components/ui/home/Fotter';
const HomeLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div>
			<HomeNavbar></HomeNavbar>
			
			<div className='flex flex-col min-h-[53vh] md:min-h-[61vh] '>
				{children}
			</div>
			<footer className='bg-gray-800 text-white py-0 text-center'>
				<HomeFotter></HomeFotter>
			</footer>
		</div>
	);
};

export default HomeLayout;
