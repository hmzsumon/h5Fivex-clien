import HomeLayout from './(home)/layout';
import BannerSlider from '@/components/ui/home/BannerSlider';
import UserCountdown from '@/components/ui/home/UserGrowth';
import Testimonials from '@/components/ui/home/Testimonials';
import Benefits from '@/components/ui/home/Benefits';
import FAQ from '@/components/ui/home/Faq';
import Partners from '@/components/ui/home/Partners';
import Conference from '@/components/ui/home/confernce';
import TaskRecordComponent from '@/components/ui/home/taskrecord';
import Crisp from '@/components/ui/auth/crisp';
import CompanyOffersTicker from '@/components/ui/home/welcomenotice';

export default function Home() {
	return (
		<HomeLayout>
			<CompanyOffersTicker></CompanyOffersTicker>
			<BannerSlider></BannerSlider>
			<UserCountdown></UserCountdown>
			<TaskRecordComponent></TaskRecordComponent>

			<Benefits></Benefits>
			<Conference></Conference>
			<Testimonials></Testimonials>
			<FAQ></FAQ>
			<Partners></Partners>
			<Crisp></Crisp>
			
		</HomeLayout>
	);
}
