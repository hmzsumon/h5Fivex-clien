'use client';
import React from 'react';
import CompanyOffersTicker from '@/components/ui/home/welcomenotice';
import BannerSlider from '@/components/ui/home/BannerSlider';
import Navigation from '@/components/ui/auth/navigation';
import TaskRecordComponent from '@/components/ui/home/taskrecord';
import Partners from '@/components/ui/home/Partners';
import HomeFooter from '@/components/ui/home/Fotter';
import DashboardModal from '@/components/ui/home/dashboardmodel';
import { useLoadUserQuery } from '@/redux/features/auth/authApi';

const DashboardPage = () => {
	// const { data, error } = useLoadUserQuery();

	return (
		<div>
			<CompanyOffersTicker></CompanyOffersTicker>
			<BannerSlider></BannerSlider>
			<Navigation></Navigation>
			<TaskRecordComponent></TaskRecordComponent>
			<Partners></Partners>
			<HomeFooter></HomeFooter>
			<DashboardModal></DashboardModal>
		</div>
	);
};

export default DashboardPage;
