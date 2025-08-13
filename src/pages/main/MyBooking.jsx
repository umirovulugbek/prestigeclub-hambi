import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import MobileTab from '../../components/main/mobiletab';
import TourCard from '../../components/pages/MyBooking/TourCard';
import Axios from '../../utils/httpsClinet';
const MyBooking = ({ darkmode }) => {
	const { t } = useTranslation();
	const [brone, setBrone] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		getBooking();
	}, []);

	const getBooking = () => {
		setLoading(true);
		Axios()
			.get(`api/v1/search/service/my-bron`)
			.then(res => {
				setBrone(res?.data?.orders);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<div className={`min-h-screen  pb-[65px] ${darkmode ? 'bg-[#141414]' : 'bg-neutralSand'}`}>
			<div className='container_main !px-0'>
				<div className='bg-white dark:bg-[#272829]  text-[#141414] dark:text-white text-lg font-normal py-[20px] text-center'>{t('home.my_reservations')}</div>
				<MobileTab darkmode={darkmode} />
				<div className='mt-[15px] flex flex-col gap-[15px] mb-[30px]'>
					{loading ? (
						<div className=' dark:text-white'>
							<Skeleton width={'100%'} height={230} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
							<Skeleton width={'100%'} height={230} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
							<Skeleton width={'100%'} height={230} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
						</div>
					) : (
						<>
							{brone?.map((item, index) => {
								return <TourCard key={index} status={item?.status} darkmode={darkmode} data={item} />;
							})}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default MyBooking;
