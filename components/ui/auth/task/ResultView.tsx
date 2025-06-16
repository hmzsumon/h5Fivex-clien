import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiDollarSign } from 'react-icons/fi';
import { Product, ViewType } from './types'; // Import from your types file
import { formatBalance } from '@/lib/functions';

interface ResultViewProps {
	selectedProduct: Product;
	todayProfit: number; // Assuming this is a formatted string like "$100.00"
	taskCount: number;
	maxTasks: number;
	setView: (view: ViewType) => void;
	handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
	selectedProduct,
	todayProfit,
	taskCount,
	maxTasks,
	setView,
	handleImageError,
}) => (
	<motion.div
		key='result'
		initial={{ opacity: 0, scale: 0.9 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.5 }}
		className='relative w-full max-w-md px-4'
	>
		<div className='absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl blur opacity-20 animate-pulse'></div>

		<div className='relative bg-gradient-to-br from-white to-emerald-50 text-gray-800 p-4 md:p-6 rounded-xl shadow-lg text-center border border-emerald-200'>
			<motion.div
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2 }}
				className='mb-4 md:mb-6'
			>
				<div className='text-4xl md:text-5xl mb-2'>🎉</div>
				<h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-1'>
					Task Completed!
				</h2>
				<p className='text-green-600 font-medium text-sm md:text-base'>
					Commission Earned
				</p>
			</motion.div>

			<motion.div
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.3 }}
				className='relative group mb-4 md:mb-6'
			>
				<img
					src={selectedProduct.gif} // Changed from image to gif for animation
					alt={selectedProduct.name}
					className='w-full h-40 md:h-48 object-contain rounded-lg border-2 border-white shadow-md mx-auto bg-white'
					onError={handleImageError}
				/>
			</motion.div>

			<motion.div
				initial={{ y: 10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.4 }}
				className='mb-4 md:mb-6'
			>
				<h3 className='text-lg md:text-xl font-semibold mb-1'>
					{selectedProduct.name}
				</h3>
				<div className='flex justify-center space-x-4 md:space-x-6 text-xs md:text-sm mb-3'>
					<div>
						<p className='text-gray-500'>Price</p>
						<p>{selectedProduct.price}</p>
					</div>
					<div>
						<p className='text-gray-500'>Refund</p>
						<p>{selectedProduct.refund}</p>
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ scale: 0.95 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.5 }}
				className='bg-gradient-to-r from-green-100 to-emerald-100 p-3 md:p-4 rounded-lg mb-4 md:mb-6 border border-green-200'
			>
				<p className='text-xs md:text-sm text-green-600 mb-1 uppercase tracking-wider'>
					Commission Earned
				</p>
				<p className='text-2xl md:text-3xl font-bold text-green-700'>
					${formatBalance(todayProfit)}
				</p>
			</motion.div>

			<motion.button
				whileHover={{ scale: window.innerWidth > 768 ? 1.02 : 1 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => setView(taskCount >= maxTasks ? 'summary' : 'preview')}
				className='w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 md:py-3 rounded-lg font-bold text-sm md:text-base shadow-md'
			>
				{taskCount >= maxTasks ? (
					<span className='flex items-center justify-center'>
						<FiArrowLeft className='mr-2' /> Return to Dashboard
					</span>
				) : (
					`Continue to Next Task (${taskCount}/${maxTasks})`
				)}
			</motion.button>
		</div>
	</motion.div>
);
