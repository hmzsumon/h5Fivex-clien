import { useState, useEffect } from 'react';
import { Product, ViewType, VipTier } from './types';
import { useSelector } from 'react-redux';

export const useTaskFlow = (products: Product[], vipTiers: VipTier[]) => {
	const { user } = useSelector((state: any) => state.auth);
	const [view, setView] = useState<ViewType>('vip');
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [taskCount, setTaskCount] = useState(0);
	const [maxTasks, setMaxTasks] = useState(3);
	const [deposit, setDeposit] = useState(0);
	const [totalProfit, setTotalProfit] = useState(0);
	const [todayProfit, setTodayProfit] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [usedProductIds, setUsedProductIds] = useState<number[]>([]);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			if (now.getHours() === 0 && now.getMinutes() === 0) {
				setTaskCount(0);
				setTodayProfit(0);
				setUsedProductIds([]);
			}
		}, 60000);
		return () => clearInterval(interval);
	}, []);

	const getRandomProduct = () => {
		const available = products.filter((p) => !usedProductIds.includes(p.id));
		if (available.length === 0) {
			setUsedProductIds([]);
			return products[Math.floor(Math.random() * products.length)];
		}
		const selected = available[Math.floor(Math.random() * available.length)];
		setUsedProductIds((prev) => [...prev, selected.id]);
		return selected;
	};

	return {
		view,
		setView,
		selectedProduct,
		setSelectedProduct,
		taskCount,
		setTaskCount,
		maxTasks,
		setMaxTasks,
		deposit,
		setDeposit,
		totalProfit,
		setTotalProfit,
		todayProfit,
		setTodayProfit,
		isAnimating,
		setIsAnimating,
		getRandomProduct,
		user,
	};
};
