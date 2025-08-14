import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import LazyImage from '../../components/ui/LazyImage';
import NavigationOne from '../../components/ui/NavigationOne';
import { API_URL } from '../../utils/api';
import Axios from '../../utils/httpsClinet';
import { useTranslation } from 'react-i18next';
const ProgramTour = () => {
	const [activeTab, setActiveTab] = useState(0);
	const { id } = useParams();
	const [data, setData] = useState();
	const { t } = useTranslation()

	useEffect(() => {
		getTourUzb();
	}, []);

	const getTourUzb = () => {
		Axios()
			.get(`/api/uzb-tours/tour/${id}`)
			.then(res => {
				setData(res?.data?.data);
				setActiveTab(res?.data?.data?.days[0]?.day_number);
			});
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div>
			<NavigationOne darkmode={false} text={t('translations.home.tourPrograms')} />
			<div className='flex flex-col py-[15px] gap-[15px]'>
				<div className='mt-[65px]   '>
					<div className='container_main flex'>
						{data?.days
							?.map(o => o?.day_number)
							?.map((item, index) => {
								return (
									<div
										key={index}
										onClick={() => setActiveTab(item)}
										className={`h-[44px] flex justify-center items-center w-full cursor-pointer ${activeTab === item ? 'bg-[#0077FF] text-white' : ' bg-white'
											} ${index === 0 ? 'rounded-l-[12px]' : item === data?.days?.length ? 'rounded-r-[12px]' : ''} `}
									>
										{item} kun
									</div>
								);
							})}
					</div>
				</div>

				{data?.days
					.find(o => o?.day_number === activeTab)
					?.stages?.map((item, index) => {
						return (
							<div key={index} className='flex flex-col gap-[14px] container_main  w-full'>
								<Swiper
									// pagination={{
									// 	dynamicBullets: true,
									// }}
									pagination={true}
									modules={[Pagination]}
									className='mySwiper w-full  h-[220px]'
									parallax={true}
								>
									{item?.images?.map((item_in, index_in) => (
										<SwiperSlide key={index_in}>
											<LazyImage
												key={index_in}
												src={API_URL + item_in}
												loading='lazy'
												classNameF='object-cover'
												className='w-full  h-[220px]  object-cover rounded-lg'
												alt=''
											/>
										</SwiperSlide>
									))}
								</Swiper>
								<div
									className=' bg-white px-[15px] py-[20px] rounded-lg leading-[20px] text-[#141414]'
									dangerouslySetInnerHTML={{
										__html: item?.content,
									}}
								/>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default ProgramTour;
