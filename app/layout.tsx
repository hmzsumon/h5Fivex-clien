import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import StoreProvider from './StoreProvider';
import SocketProvider from '@/providers/SocketProvider';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'h5Fivex',
	description: 'H5FivexEcommerce',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className='light'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning={true}
			>
				<StoreProvider>
					<SocketProvider>
						<div className='flex flex-col  bg-wrapper  '>{children}</div>
						<Toaster />
					</SocketProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
