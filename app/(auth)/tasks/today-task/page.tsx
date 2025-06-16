// TaskPage.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FaCrown, FaGem, FaMedal, FaTrophy, FaCoins } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';
import confetti from 'canvas-confetti';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

import { useSelector } from 'react-redux';
import { useLoadUserQuery } from '@/redux/features/auth/authApi';
import {
	taskApi,
	useGetMyTaskReportQuery,
	useUpdateTaskMutation,
} from '@/redux/features/task/taskApi';
import {
	Product,
	ProductImages,
	ViewType,
	VipTier,
} from '@/components/ui/auth/task/types';

import { SummaryView } from '@/components/ui/auth/task/SummaryView';
import { PreviewView } from '@/components/ui/auth/task/PreviewView';
import { GrabView } from '@/components/ui/auth/task/GrabView';
import { ResultView } from '@/components/ui/auth/task/ResultView';
import { set } from 'react-hook-form';

const productImages: ProductImages = {
	tv: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
	speaker:
		'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
	headphones:
		'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
	laptop:
		'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
	smartphone:
		'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
	watch:
		'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
	camera:
		'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
	tablet:
		'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
	tvGif: 'https://i.giphy.com/media/3o7aD2d7hy9ktXNDP2/giphy.webp',
	speakerGif: 'https://i.giphy.com/media/3o7abB06u9bNzA8lu8/giphy.webp',
	headphonesGif: 'https://i.giphy.com/media/l378zKVk7Eh3yHoJi/giphy.webp',
	laptopGif: 'https://i.giphy.com/media/3oKIPsx2VAYAgEHC12/giphy.webp',
	smartphoneGif: 'https://i.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.webp',
	watchGif: 'https://i.giphy.com/media/3o7TKsQ8UQ0Z8vZQ7m/giphy.webp',
	cameraGif: 'https://i.giphy.com/media/3o7TKsQ8UQ0Z8vZQ7m/giphy.webp',
	tabletGif: 'https://i.giphy.com/media/3o7TKsQ8UQ0Z8vZQ7m/giphy.webp',
};

const products: Product[] = [
	{
		id: 1,
		name: 'Smart TV 4K UHD',
		brand: 'Samsung',
		price: '$999.00',
		refund: '$999.99',
		commission: '$0.99',
		image: productImages.tv,
		gif: productImages.tvGif,
		category: 'Electronics',
	},
	{
		id: 2,
		name: 'Premium Bluetooth Speaker',
		brand: 'Bose',
		price: '$149.00',
		refund: '$149.99',
		commission: '$0.45',
		image: productImages.speaker,
		gif: productImages.speakerGif,
		category: 'Audio',
	},
	{
		id: 3,
		name: 'Wireless Headphones Pro',
		brand: 'Sony',
		price: '$199.00',
		refund: '$199.99',
		commission: '$0.75',
		image: productImages.headphones,
		gif: productImages.headphonesGif,
		category: 'Audio',
	},
	{
		id: 4,
		name: 'Ultra Slim Laptop',
		brand: 'Apple',
		price: '$1299.00',
		refund: '$1299.99',
		commission: '$1.25',
		image: productImages.laptop,
		gif: productImages.laptopGif,
		category: 'Computers',
	},
	{
		id: 5,
		name: 'Flagship Smartphone',
		brand: 'iPhone',
		price: '$1099.00',
		refund: '$1099.99',
		commission: '$1.10',
		image: productImages.smartphone,
		gif: productImages.smartphoneGif,
		category: 'Mobile',
	},
	{
		id: 6,
		name: 'Smart Watch Pro',
		brand: 'Apple',
		price: '$399.00',
		refund: '$399.99',
		commission: '$0.60',
		image: productImages.watch,
		gif: productImages.watchGif,
		category: 'Wearables',
	},
	{
		id: 7,
		name: 'DSLR Camera',
		brand: 'Canon',
		price: '$799.00',
		refund: '$799.99',
		commission: '$0.85',
		image: productImages.camera,
		gif: productImages.cameraGif,
		category: 'Photography',
	},
	{
		id: 8,
		name: 'Premium Tablet',
		brand: 'Samsung',
		price: '$599.00',
		refund: '$599.99',
		commission: '$0.70',
		image: productImages.tablet,
		gif: productImages.tabletGif,
		category: 'Tablets',
	},
];

export default function TodayTaskPage() {
	const { refetch } = useLoadUserQuery();

	const { user } = useSelector((state: any) => state.auth);

	const { data, isLoading } = useGetMyTaskReportQuery(undefined);
	const { taskReport } = data || {};
	console.log('taskReport', taskReport);

	const [
		updateTask,
		{
			isLoading: isUpdatingTask,
			isSuccess: isUpdateTaskSuccess,
			isError: isUpdateTaskError,
			error: updateTaskError,
			data: updateTaskData,
		},
	] = useUpdateTaskMutation();

	const rawTiers = [
		{
			level: 'VIP1',
			commission: '1.80%-2.20%',
			orders: 3,
			min: 30,
			max: 500,
			requirement: 30,
			logo: <FaMedal className='text-amber-400' />,
			color: 'from-amber-100 to-amber-50',
			bgColor: 'bg-amber-50',
		},
		{
			level: 'VIP2',
			commission: '2.20%-2.80%',
			orders: 3,
			min: 500,
			max: 2000,
			requirement: 500,
			logo: <FaMedal className='text-gray-400' />,
			color: 'from-gray-100 to-gray-50',
			bgColor: 'bg-gray-50',
		},
		{
			level: 'VIP3',
			commission: '2.80%-3.20%',
			orders: 3,
			min: 2000,
			max: 5000,
			requirement: 2000,
			logo: <FaMedal className='text-amber-600' />,
			color: 'from-orange-100 to-amber-50',
			bgColor: 'bg-amber-50',
		},
		{
			level: 'VIP4',
			commission: '3.20%-3.60%',
			orders: 3,
			min: 5000,
			max: 10000,
			requirement: 5000,
			logo: <FaTrophy className='text-yellow-500' />,
			color: 'from-yellow-100 to-yellow-50',
			bgColor: 'bg-yellow-50',
		},
		{
			level: 'VIP5',
			commission: '3.60%-4%',
			orders: 3,
			min: 10000,
			max: 20000,
			requirement: 10000,
			logo: <FaGem className='text-blue-400' />,
			color: 'from-blue-100 to-blue-50',
			bgColor: 'bg-blue-50',
		},
		{
			level: 'VIP6',
			commission: '5%-8%',
			orders: 3,
			min: 20000,
			requirement: 20000,
			logo: <FaCrown className='text-purple-500' />,
			color: 'from-purple-100 to-purple-50',
			bgColor: 'bg-purple-50',
		},
	];

	const vipTiers: VipTier[] = rawTiers.map((tier) => ({
		...tier,
		isTierUnlocked: user?.vipTier === tier.level,
	}));

	const [view, setView] = useState<ViewType>('summary');
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [taskCount, setTaskCount] = useState(0);
	const [maxTasks, setMaxTasks] = useState(3);
	const [deposit, setDeposit] = useState(0);
	const [totalProfit, setTotalProfit] = useState(taskReport?.totalProfit || 0);
	const [todayProfit, setTodayProfit] = useState(taskReport?.todayProfit || 0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [usedProductIds, setUsedProductIds] = useState<number[]>([]);
	const [productList, setProductList] = useState<Product[]>(products); // initial static list

	useEffect(() => {
		if (taskReport?.taskValue) {
			const updatedProducts = products.map((product) => ({
				...product,
				commission: `$${taskReport.taskValue.toFixed(2)}`,
			}));
			setProductList(updatedProducts);
		}
	}, [taskReport?.taskValue]);

	useEffect(() => {
		if (taskReport) {
			setTotalProfit(taskReport.totalProfit || 0);
			setTodayProfit(taskReport.todayProfit || 0);
			setTaskCount(taskReport.todayTaskCount || 0);
			setMaxTasks(taskReport.maxTasks || 3); // fallback if 0
		}

		if (taskReport?.todayTaskCount >= 3) {
			setView('result');
			setSelectedProduct(productList[0]); // Default to first product if no selection
		}
	}, [taskReport]);

	useEffect(() => {
		const reset = setInterval(() => {
			const now = new Date();
			if (now.getHours() === 0 && now.getMinutes() === 0) {
				setTaskCount(0);
				setTodayProfit(0);
				setUsedProductIds([]); // Reset used products at midnight
			}
		}, 60000);
		return () => clearInterval(reset);
	}, []);

	useEffect(() => {
		if (view === 'summary') {
			const currentTier = vipTiers.find((tier) => deposit >= tier.requirement);
			if (currentTier) {
				setMaxTasks(currentTier.orders);
			}
		}
	}, [view, deposit]);

	const handleImageError = (
		e: React.SyntheticEvent<HTMLImageElement, Event>
	) => {
		const target = e.target as HTMLImageElement;
		target.onerror = null;
		target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
	};

	const getRandomProduct = (): Product => {
		// Filter out used products
		const availableProducts = productList.filter(
			(product) => !usedProductIds.includes(product.id)
		);

		// If all products have been used, reset the used products list
		if (availableProducts.length === 0) {
			setUsedProductIds([]);
			return productList[Math.floor(Math.random() * productList.length)];
		}

		// Get a random product from available ones
		const randomIndex = Math.floor(Math.random() * availableProducts.length);
		const selected = availableProducts[randomIndex];

		// Mark this product as used
		setUsedProductIds((prev) => [...prev, selected.id]);

		return selected;
	};

	const startPreview = () => {
		setIsAnimating(true);
		setTimeout(() => {
			const product = getRandomProduct();
			setSelectedProduct(product);
			setView('preview');
			setIsAnimating(false);
		}, 800);
	};

	const handleGrab = () => {
		if (taskCount >= maxTasks || !selectedProduct) return;

		// Update task in the backend
		updateTask(undefined);

		// Play sound effect
		new Audio(
			'https://cdn.pixabay.com/download/audio/2022/03/15/audio_f8fcbbe2a3.mp3'
		)
			.play()
			.catch(() => {});
		setView('grab');

		setTimeout(() => {
			confetti({
				particleCount: 200,
				spread: 100,
				origin: { y: 0.6 },
				colors: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#9370DB'],
				shapes: ['circle', 'star'],
				scalar: 1.2,
			});

			const profit = parseFloat(selectedProduct.commission.slice(1));
			setTodayProfit((prev: any) => +(prev + profit).toFixed(4));
			setTotalProfit((prev: any) => +(prev + profit).toFixed(4));

			toast.success(
				<div className='flex items-center'>
					<FaCoins className='text-yellow-500 mr-2' />
					<span>+{selectedProduct.commission} commission earned!</span>
				</div>,
				{
					duration: 5000,
					style: {
						background: 'linear-gradient(to right, #ffffff, #f9fafb)',
						boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
						border: '1px solid rgba(209, 213, 219, 0.5)',
					},
				}
			);

			setView('result');
		}, 3500);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-800 px-4 py-8 flex flex-col items-center font-sans'>
			<Toaster position='top-center' />

			<div className='w-full max-w-6xl mb-8'>
				{/* Mobile Header */}
				<div className='md:hidden flex flex-col mb-6'>
					<div className='flex justify-between items-center'>
						<h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600'>
							VIP Tasks
						</h1>
						<button className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm shadow flex items-center'>
							<GiCash className='mr-1' /> ${deposit.toLocaleString()}
						</button>
					</div>
					<p className='text-sm text-gray-500 mt-2'>Earn commissions daily</p>
				</div>

				{/* Desktop Header */}
				<motion.div
					className='hidden md:flex justify-between items-center mb-6'
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
				>
					<div>
						<h2 className='text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600'>
							VIP Tasks
						</h2>
						<p className='text-sm text-gray-500'>
							Complete tasks and earn commissions daily
						</p>
					</div>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-xl flex items-center'
					>
						<GiCash className='mr-2' /> $
						{user?.m_balance?.toLocaleString() || 0}
					</motion.button>
				</motion.div>

				<AnimatePresence mode='wait'>
					{view === 'summary' && (
						<SummaryView
							selectedProduct={selectedProduct}
							taskCount={taskCount}
							maxTasks={maxTasks}
							totalProfit={totalProfit}
							todayProfit={todayProfit}
							isAnimating={isAnimating}
							startPreview={startPreview}
							handleImageError={handleImageError}
						/>
					)}

					{view === 'preview' && selectedProduct && (
						<PreviewView
							selectedProduct={selectedProduct}
							handleGrab={handleGrab}
							handleImageError={handleImageError}
						/>
					)}

					{view === 'grab' && <GrabView selectedProduct={selectedProduct} />}

					{view === 'result' && selectedProduct && (
						<ResultView
							selectedProduct={selectedProduct}
							taskCount={taskCount}
							maxTasks={maxTasks}
							setView={setView}
							handleImageError={handleImageError}
							todayProfit={taskReport?.todayProfit || 0}
						/>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
