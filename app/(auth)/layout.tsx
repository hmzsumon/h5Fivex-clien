import React from 'react';
import AuthFooter from '@/components/ui/auth/foternavbar';
import AuthNavbar from '@/components/ui/auth/authnavbar';
import CrispChat from '@/components/ui/auth/crisp';


const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<div className=''>
			<AuthNavbar></AuthNavbar>
			<CrispChat></CrispChat>
			
			<div className='py-[0.09rem] min-h-screen '>{children}</div>
			<footer className='bg-gray-800 text-white py-4 text-center'>
				<AuthFooter></AuthFooter>
			</footer>
		</div>
	);
};

export default AuthLayout;
