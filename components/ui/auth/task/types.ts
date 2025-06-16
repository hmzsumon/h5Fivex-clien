// types.ts
import { ReactElement } from 'react';

export type ViewType = 'vip' | 'summary' | 'preview' | 'grab' | 'result';

export interface VipTier {
	level: string;
	commission: string;
	orders: number;
	requirement: number;
	logo: ReactElement;
	color: string;
	bgColor: string;
	isTierUnlocked: boolean;
}

export interface Product {
	id: number;
	name: string;
	brand: string;
	price: string;
	refund: string;
	commission: string;
	image: string;
	gif: string; // Using 'gif' consistently instead of 'tv'
	category: string;
}

export interface ProductImages {
	tv: string;
	speaker: string;
	headphones: string;
	laptop: string;
	smartphone: string;
	watch: string;
	camera: string;
	tablet: string;
	tvGif: string;
	speakerGif: string;
	headphonesGif: string;
	laptopGif: string;
	smartphoneGif: string;
	watchGif: string;
	cameraGif: string;
	tabletGif: string;
}
