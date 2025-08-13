import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import LazyImage from '../../components/ui/LazyImage';
import TourIncludesDarkIcon from '../../icons/TourIncludesDarkIcon';
import TourIncludesIcon from '../../icons/TourIncludesIcon';
import { trackEvent } from '../../utils/mixpanel';
import Title from '../ui/Title';

const HotelCard = ({ index, item, darkmode }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	useEffect(() => {
		// getFavourites();
	}, []);

	let clickTag = [];
	item?.hotel?.nearbyItems?.forEach(el => {
		clickTag = [
			...clickTag,
			{
				title: el?.title,
				color: el?.color,
			},
		];
	});
	return (
		<React.Fragment key={index}>
			<div className='min-h-[271px]  overflow-hidden rounded-[8px] bg-white dark:bg-[#272829]'>
				<div className='relative h-[193px] overflow-hidden custom-hotel-card'>
					{item?.hotel?.photos?.length > 0 ? (
						<Swiper
							pagination={{
								dynamicBullets: true,
							}}
							modules={[Pagination]}
							className='mySwiper'
						>
							{item?.hotel?.photos?.map((item_in, index_in) => (
								<SwiperSlide key={index_in}>
									<LazyImage
										key={index_in}
										src={item_in?.full_path}
										onError={e => {
											e.target.src = '/images/def_img.png';
										}}
										loading='lazy'
										className='w-full h-[193px] object-cover rounded-tl-[8px] rounded-tr-[8px]'
										alt=''
									/>
								</SwiperSlide>
							))}
						</Swiper>
					) : (
						<img loading='lazy' src={'/images/def_img.png'} className='w-full h-full object-cover rounded-tl-[18.07px] rounded-tr-[18.07px]' alt='' />
					)}
					<div className='absolute z-20 top-[16.5px] left-[16.5px] inline-flex gap-1 items-center bg-white rounded-[10px] px-[8.5px] py-[5.5px]'>
						<img src='/images/star.svg' alt='' />
						<p className='font-medium text-sm'>{item?.hotel?.star_alt}</p>
					</div>

					{item?.hotel?.detail?.ratings?.overall ? (
						<div className='absolute z-20 bottom-[16.5px] left-[16.5px] inline-flex gap-10  items-center text-white bg-white dark:bg-[#272829] rounded-[10px] px-[10px] h-[30px] py-[10px]'>
							<div className='flex gap-[5px] '>
								<div className=' text-[#141414] dark:text-white text-[17px] font-normal'>{item?.hotel?.detail?.ratings?.overall}</div>
								{darkmode ? <img className='pl-1' src='/images/tripadvisor-white.svg' alt='' /> : <img src='/images/tripadvisor.svg' alt='' />}{' '}
							</div>
						</div>
					) : null}
				</div>
				<div className=' my-[10px] flex flex-col px-[14px] '>
					<Title
						darkmode={darkmode}
						size='[20px]'
						weight='medium'
						className='cursor-pointer hover:underline leading-[150%] !block !text-[#141414] !my-0'
						text={item?.hotel?.detail?.name}
						color='#141414'
						onClick={() => {
							trackEvent('hotel_info_name', item?.hotel?.detail?.name);
							navigate(`/hotels/detail/${window.location.search}&catclaim=${item?.id}&hotel_key=${item?.hotel_key}&converted_price=${item?.converted_price_number}`);
						}}
					/>
					<div className='text-[#141414] dark:text-white  font-medium text-sm flex items-center gap-[5px]'>
						<img src='/images/location.svg' alt='' /> {item?.town_name}
					</div>
				</div>
				<div className='px-[14px]'>{darkmode ? <TourIncludesDarkIcon /> : <TourIncludesIcon />}</div>
				{item?.hotel?.short_description ? <p className='text-[#141414] dark:text-white py-[10px] px-[14px]'>{item?.hotel?.short_description}</p> : null}
				{clickTag?.length > 0 ? (
					<div className='flex gap-[5px]  overflow-x-scroll  py-[10px] px-[14px]'>
						{clickTag?.map((item, index_tag) => {
							return (
								<div
									key={index_tag}
									className='bg-[#EBF0F5] whitespace-nowrap dark:bg-[#141414] dark:text-white px-[10px] py-[5px] rounded-[20px] text-[#76787A] font-normal text-sm !font-urbanist '
								>
									{item?.title}
								</div>
							);
						})}
					</div>
				) : null}
				<div className=''>
					<img src='/images/linedashed.svg' className='w-full object-cover h-[0.5px] mt-[15px]' alt='' />
					<div
						onClick={() => {
							trackEvent('hotel_info_name', item?.hotel?.name);
							navigate(`/hotels/detail/${window.location.search}&catclaim=${item?.id}&hotel_key=${item?.hotel_key}&converted_price=${item?.converted_price_number}`);
						}}
						className=' cursor-pointer'
					>
						<div className='p-[14px] flex gap-3 justify-between w-full relative items-center'>
							<div className={`text-base font-normal ${darkmode ? '!text-white' : ''}`}>
								<span>
									{item?.adult + item?.child} {t('home.turist')},{' '}
								</span>
								<span>
									{item?.nights} {t('home.nights')}
									{/* , {item?.price?.room_key} номер */}
								</span>
							</div>
							<div className='flex flex-col items-end'>
								{item?.converted_price_old !== '' || item?.converted_price_old === null || item?.converted_price_old === undefined ? (
									<span className='text-[#FF8800]  text-sm line-through'>
										{Number(item?.converted_price_old?.slice(0, -4)).toLocaleString('en-US').replace(/,/g, ' ')} {t('home.uzs')}
									</span>
								) : null}
								<p className={`font-medium text-xl ${darkmode ? 'text-[#235DFF]' : 'text-[#235DFF]'}`}>
									{item?.converted_price_number?.toLocaleString('en-US').replace(/,/g, ' ')} {t('home.uzs')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* {index === 0 ? <TourIncludes /> : null} */}
		</React.Fragment>
	);
};

export default HotelCard;
