import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Back } from '../../components/itemIcon';
import PrestigeBanner from '../../components/main/PrestigeBanner';
import ButtonMain from '../../components/ui/ButtonMain';
import LoadingMain from '../../components/ui/loading';
import ArrowBroneIcon from '../../icons/ArrowBroneIcon';
import EarphoneIcon from '../../icons/EarphoneIcon';
import HotelRoom from '../../icons/HotelRoomIcon';
import InsuranceIcon from '../../icons/InsuranceIcon';
import MealIcon from '../../icons/MealIcon';
import TransferIcon from '../../icons/TransferIcon';
import VisaIcon from '../../icons/VisaIcon';
import { IMG_URL } from '../../utils/api';
import { getSearchParams } from '../../utils/function';
import Axios from '../../utils/httpsClinet';
import { PriceFormat } from '../../utils/PriceFormat';

const User = ({ width, height }) => {
	return (
		<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M3.71273 5.94591C3.71273 8.30508 5.63273 10.2251 7.99273 10.2251H8.02106C9.16023 10.2209 10.2311 9.77341 11.0327 8.96425C11.8361 8.15591 12.2769 7.08258 12.2719 5.94591C12.2719 3.58675 10.3519 1.66675 7.99273 1.66675C5.63273 1.66675 3.71273 3.58675 3.71273 5.94591ZM4.96273 5.94591C4.96273 4.27591 6.32189 2.91675 7.99273 2.91675C9.66273 2.91675 11.0219 4.27591 11.0219 5.94841C11.0252 6.75341 10.7144 7.51258 10.1461 8.08341C9.57856 8.65591 8.8219 8.97175 8.01856 8.97508H7.99273C6.32189 8.97508 4.96273 7.61591 4.96273 5.94591Z'
				fill='#235DFF'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M1.66602 14.5993C1.66602 17.5476 6.26268 17.5476 7.99268 17.5476C9.55768 17.5476 14.3193 17.5476 14.3193 14.5826C14.3193 11.9368 10.7085 11.6309 7.99268 11.6309C6.42768 11.6309 1.66602 11.6309 1.66602 14.5993ZM2.91602 14.5993C2.91602 13.1784 5.67685 12.8809 7.99268 12.8809C11.361 12.8809 13.0693 13.4534 13.0693 14.5826C13.0693 15.7201 11.361 16.2976 7.99268 16.2976C4.62435 16.2976 2.91602 15.7259 2.91602 14.5993Z'
				fill='#235DFF'
			/>
			<path
				d='M13.7349 9.27655C13.4282 9.27655 13.1607 9.05072 13.1166 8.73822C13.0691 8.39655 13.3066 8.07989 13.6482 8.03239C14.6882 7.88655 15.4732 6.98405 15.4749 5.93239C15.4749 4.88739 14.7266 4.00572 13.6974 3.83739C13.3566 3.78072 13.1257 3.45989 13.1816 3.11905C13.2374 2.77822 13.5599 2.54905 13.8991 2.60322C15.5366 2.87155 16.7249 4.27239 16.7249 5.93322C16.7216 7.60405 15.4741 9.03905 13.8224 9.27072C13.7932 9.27489 13.7641 9.27655 13.7349 9.27655Z'
				fill='#235DFF'
			/>
			<path
				d='M15.995 14.9809C16.0891 15.23 16.3266 15.3842 16.5791 15.3842C16.6533 15.3842 16.7283 15.3709 16.8008 15.3434C18.0533 14.8692 18.3158 14.0467 18.3158 13.4392C18.3158 12.6234 17.8433 11.5792 15.5883 11.2417C15.2533 11.1975 14.9291 11.4267 14.8775 11.7684C14.8266 12.1092 15.0625 12.4275 15.4041 12.4792C16.5066 12.6434 17.0658 12.9667 17.0658 13.4392C17.0658 13.5792 17.0658 13.9067 16.3575 14.175C16.035 14.2967 15.8725 14.6584 15.995 14.9809Z'
				fill='#235DFF'
			/>
		</svg>
	);
};

const Calendar = () => {
	return (
		<svg width='17' height='19' viewBox='0 0 17 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M12.4994 14.7461C12.1544 14.7461 11.8711 14.4661 11.8711 14.1211C11.8711 13.7761 12.1469 13.4961 12.4919 13.4961H12.4994C12.8444 13.4961 13.1244 13.7761 13.1244 14.1211C13.1244 14.4661 12.8444 14.7461 12.4994 14.7461Z'
				fill='#235DFF'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8.80216 14.746C8.45716 14.746 8.17383 14.466 8.17383 14.121C8.17383 13.776 8.44966 13.496 8.79466 13.496H8.80216C9.14716 13.496 9.42716 13.776 9.42716 14.121C9.42716 14.466 9.14716 14.746 8.80216 14.746Z'
				fill='#235DFF'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M5.09792 14.7461C4.75292 14.7461 4.46875 14.4661 4.46875 14.1211C4.46875 13.7761 4.74542 13.4961 5.09042 13.4961H5.09792C5.44292 13.4961 5.72292 13.7761 5.72292 14.1211C5.72292 14.4661 5.44292 14.7461 5.09792 14.7461Z'
				fill='#235DFF'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M12.4994 11.5103C12.1544 11.5103 11.8711 11.2303 11.8711 10.8853C11.8711 10.5403 12.1469 10.2603 12.4919 10.2603H12.4994C12.8444 10.2603 13.1244 10.5403 13.1244 10.8853C13.1244 11.2303 12.8444 11.5103 12.4994 11.5103Z'
				fill='#235DFF'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8.80216 11.5103C8.45716 11.5103 8.17383 11.2303 8.17383 10.8853C8.17383 10.5403 8.44966 10.2603 8.79466 10.2603H8.80216C9.14716 10.2603 9.42716 10.5403 9.42716 10.8853C9.42716 11.2303 9.14716 11.5103 8.80216 11.5103Z'
				fill='#235DFF'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M5.09792 11.5103C4.75292 11.5103 4.46875 11.2303 4.46875 10.8853C4.46875 10.5403 4.74542 10.2603 5.09042 10.2603H5.09792C5.44292 10.2603 5.72292 10.5403 5.72292 10.8853C5.72292 11.2303 5.44292 11.5103 5.09792 11.5103Z'
				fill='#235DFF'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M16.2225 8.25513H1.36914C1.02414 8.25513 0.744141 7.97513 0.744141 7.63013C0.744141 7.28513 1.02414 7.00513 1.36914 7.00513H16.2225C16.5675 7.00513 16.8475 7.28513 16.8475 7.63013C16.8475 7.97513 16.5675 8.25513 16.2225 8.25513Z'
				fill='#235DFF'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M12.1602 4.82575C11.8152 4.82575 11.5352 4.54575 11.5352 4.20075V1.45825C11.5352 1.11325 11.8152 0.833252 12.1602 0.833252C12.5052 0.833252 12.7852 1.11325 12.7852 1.45825V4.20075C12.7852 4.54575 12.5052 4.82575 12.1602 4.82575Z'
				fill='#235DFF'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M5.42773 4.82575C5.08273 4.82575 4.80273 4.54575 4.80273 4.20075V1.45825C4.80273 1.11325 5.08273 0.833252 5.42773 0.833252C5.77273 0.833252 6.05273 1.11325 6.05273 1.45825V4.20075C6.05273 4.54575 5.77273 4.82575 5.42773 4.82575Z'
				fill='#235DFF'
			/>
			<mask id='mask0_5060_10281' maskUnits='userSpaceOnUse' x='0' y='2' width='17' height='17'>
				<path fillRule='evenodd' clipRule='evenodd' d='M0.666016 2.14835H16.916V18.7491H0.666016V2.14835Z' fill='white' />
			</mask>
			<g mask='url(#mask0_5060_10281)'>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M5.26685 3.39835C3.10602 3.39835 1.91602 4.55085 1.91602 6.64335V14.1842C1.91602 16.3225 3.10602 17.4992 5.26685 17.4992H12.3152C14.476 17.4992 15.666 16.3442 15.666 14.2475V6.64335C15.6693 5.61418 15.3927 4.81418 14.8435 4.26418C14.2785 3.69751 13.4077 3.39835 12.3227 3.39835H5.26685ZM12.3152 18.7492H5.26685C2.42935 18.7492 0.666016 17 0.666016 14.1842V6.64335C0.666016 3.87001 2.42935 2.14835 5.26685 2.14835H12.3227C13.7468 2.14835 14.9244 2.57501 15.7285 3.38085C16.5094 4.16501 16.9202 5.29251 16.916 6.64501V14.2475C16.916 17.0242 15.1527 18.7492 12.3152 18.7492Z'
					fill='#235DFF'
				/>
			</g>
		</svg>
	);
};

const getHotelTourBooking = async (id, tour_operator_id) => {
	const { data } = await Axios().get(`api/v1/search/service/broninit2?id=${id}&tour_from_id=${tour_operator_id}`);
	return data;
};

const useHotelTourBooking = (id, tour_operator_id) => {
	return useQuery({
		queryKey: ['hotelTourBooking', id, tour_operator_id],
		queryFn: () => getHotelTourBooking(id, tour_operator_id),
		enabled: !!(id && tour_operator_id),
		staleTime: 1000 * 60 * 5,
		cacheTime: 1000 * 60 * 10,
		refetchOnWindowFocus: false,
	});
};

const HotelTourBooking = ({ darkmode }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const paramsObject = getSearchParams();
	const { t, i18n } = useTranslation();
	const [soon_modal, setSoonModal] = useState(false);
	const { data, isLoading, isError, refetch, isFetching } = useHotelTourBooking(id, paramsObject?.tour_operator_id);

	const formatDate = dateString => {
		const monthNames_uz = {
			1: 'yanvar',
			2: 'fevral',
			3: 'mart',
			4: 'aprel',
			5: 'may',
			6: 'iyun',
			7: 'iyul',
			8: 'avgust',
			9: 'sentyabr',
			10: 'oktyabr',
			11: 'noyabr',
			12: 'dekabr',
		};
		const monthNames = {
			1: 'января',
			2: 'февраля',
			3: 'марта',
			4: 'апреля',
			5: 'мая',
			6: 'июня',
			7: 'июля',
			8: 'августа',
			9: 'сентября',
			10: 'октября',
			11: 'ноября',
			12: 'декабря',
		};

		if (!dateString) return '';

		const year = dateString?.slice(0, 4);
		const month = dateString?.slice(4, 6);
		const day = dateString?.slice(6, 8);

		return `${parseInt(day)} ${(i18n?.language === 'uz' ? monthNames_uz : monthNames)[parseInt(month)]}`;
	};

	const formatDate2 = dateString => {
		const monthNames_uz = {
			1: 'yanvar',
			2: 'fevral',
			3: 'mart',
			4: 'aprel',
			5: 'may',
			6: 'iyun',
			7: 'iyul',
			8: 'avgust',
			9: 'sentyabr',
			10: 'oktyabr',
			11: 'noyabr',
			12: 'dekabr',
		};
		const monthNames = {
			1: 'января',
			2: 'февраля',
			3: 'марта',
			4: 'апреля',
			5: 'мая',
			6: 'июня',
			7: 'июля',
			8: 'августа',
			9: 'сентября',
			10: 'октября',
			11: 'ноября',
			12: 'декабря',
		};

		const [year, month, day] = dateString?.split('-');
		return `${parseInt(day)}-${(i18n?.language === 'uz' ? monthNames_uz : monthNames)[parseInt(month)]}`;
	};

	useEffect(() => {
		if (!isLoading && !isError) {
			if (!data?.data?.claimDocument) {
				setSoonModal(true);
			} else {
				setSoonModal(false);
			}
		}
		if (isError) setSoonModal(true);
	}, [data, isLoading, isError]);

	const handleRefetch = () => {
		refetch({ exact: true }).then(() => {
			setSoonModal(false);
		});
	};

	if (isFetching) {
		return (
			<LoadingMain
				text={
					<span
						dangerouslySetInnerHTML={{
							__html:
								i18n?.language === 'ru'
									? 'Готовим ваш тур для оформления.<br /> Осталось совсем немного — скоро всё будет готово для вашего идеального путешествия!'
									: 'Biz sizning sayohatingizni ro‘yxatdan o‘tishga tayyorlayapmiz.<br /> Juda oz qoldi – tez orada sizning mukammal sayohatingiz uchun hammasi tayyor bo‘ladi!',
						}}
					/>
				}
			/>
		);
	}
	return (
		<div className={`min-h-screen   ${darkmode ? 'bg-[#141414]' : 'bg-[#F5F5F5]'}`}>
			<div className='container_main !px-0'>
				<section className={`py-[10px] container_main  rounded-bl-[20px] z-40 fixed w-full rounded-br-[20px]  ${darkmode ? 'bg-[#272829]' : 'bg-white'}`}>
					<div className='flex items-center w-full'>
						<Back fill={darkmode ? '#fff' : '#141414'} onClick={() => navigate(-1)} />
						<div className={`text-lg font-normal flex w-full justify-center ${darkmode ? 'text-white' : 'text-blueWood'}`}>{t('home.tour_booking')}</div>
						<div className='w-[45px]'></div>
					</div>
					<div className='flex justify-center my-[15px] items-center'>
						<div className='flex  gap-2 items-center'>
							<div className='w-[30px] h-[30px]  rounded-full bg-[#00AA6C] text-white  flex justify-center items-center'>1</div>
							<div className='text-[#141414] dark:text-white font-medium'>{t('home.tour_details')}</div>
						</div>
						<div className='w-[60px] flex justify-center'>
							<ArrowBroneIcon />
						</div>

						<div className='flex  gap-2 items-center'>
							<div className='w-[30px] h-[30px]  rounded-full bg-[#F5F5F5] text-[#C4C8CC]  flex justify-center items-center'>2</div>
							<div className='text-[#C4C8CC] font-normal'>{t('home.booking')}</div>
						</div>
					</div>
				</section>
			</div>

			<div className='container_main !px-[10px] flex flex-col gap-[10px] pb-[10px]'>
				<div className=' pt-[140px] flex flex-col gap-[10px]'>
					<div className='bg-[#EBF2FF]  px-[20px] py-2 rounded-[10px] text-[#042B50] font-normal leading-[150%]  text-base flex gap-[11px] items-center  justify-center'>
						<div className='max-w-[25px]  max-h-[25px]'>
							<svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none'>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M13.2865 17.2354H11.724L11.7135 15.6729H13.2865V17.2354ZM11.7135 13.9302H13.276V7.76458H11.7135V13.9302ZM12.5 2.34375C6.9 2.34375 2.34375 6.9 2.34375 12.5C2.34375 18.1 6.9 22.6562 12.5 22.6562C18.1 22.6562 22.6562 18.1 22.6562 12.5C22.6562 6.9 18.1 2.34375 12.5 2.34375Z'
									fill='#235DFF'
								/>
							</svg>
						</div>
						<p className=' leading-[20px]'>{t('home.change_within_a_few_minutes')}</p>
					</div>
					<PrestigeBanner darkmode={darkmode} />
				</div>
				<div className='p-[15px] rounded-[15px] border bg-white dark:bg-[#272829]  dark:border-[#272829]  border-[#EEEEEE] flex flex-col gap-4'>
					<div className='flex  gap-[10px] items-center '>
						<div className='relative'>
							<img
								onError={e => {
									e.target.src = '/images/def_img.png';
								}}
								src={IMG_URL + data?.hotel_data?.main_photo || '/images/def_img.png'}
								alt=''
								className='min-w-[150px] max-w-[150px] h-[132px] object-cover rounded-[15px]'
							/>
							<div className='absolute z-20 top-[10px] left-[10px] inline-flex gap-1 items-center bg-white dark:bg-[#272829] dark:text-white rounded-[10px] px-[5px] py-1'>
								<img src='/images/star.svg' alt='' />
								<p className='font-medium text-sm'>{data?.hotel_data?.star_key}</p>
							</div>
						</div>
						<div className='flex flex-col gap-1 text-[#141414] dark:text-white'>
							<h2 className=' font-semibold text-[17px] line-clamp-1'> {data?.hotel_data?.detail?.name}</h2>
							<p className=' text-base font-normal'>
								{data?.hotel_data?.detail?.location?.country}, {data?.hotel_data?.detail?.location?.city}
							</p>
							<div className='flex gap-[5px] '>
								<div className=' text-[#141414] dark:text-white  font-medium'>{data?.hotel_data?.detail?.ratings?.overall}</div>
								{darkmode ? <img className='pl-2' src='/images/tripadvisor-white.svg' alt='' /> : <img src='/images/tripadvisor.svg' alt='' />}{' '}
							</div>
						</div>
					</div>
					<img src='/images/linedashed.svg' className='w-full object-cover h-[0.5px] ' alt='' />
					<div className='flex flex-col gap-2'>
						<div className='flex  justify-between items-center'>
							<div className='flex items-center gap-[5px] text-[#76787A]  font-medium text-sm'>
								<User />
								{t('home.tourists_2')}
							</div>
							<div className=' dark:text-white'>
								{data?.price_data?.adult} {t('home.adult2')}, {data?.price_data?.child} {t('home.child2')}
							</div>
						</div>
						<div className='flex  justify-between items-center'>
							<div className='flex gap-[5px] text-[#76787A] font-medium text-sm'>
								<Calendar />
								{t('home.tour_date')}
							</div>
							<div className=' dark:text-white'>
								{data?.price_data?.check_in_date ? formatDate(data?.price_data?.check_in) : ''} -{' '}
								{data?.price_data?.check_out ? formatDate(data?.price_data?.check_out) : ''}, {data?.price_data?.nights} {t('home.nights')}
							</div>
						</div>
					</div>
				</div>
				<h2 className=' leading-[35px] font-medium text-lg ml-2 dark:text-white'>{t('home.tour_price_includes')}</h2>
				<div className='flex flex-col gap-[10px]'>
					{[
						{ icon: <HotelRoom />, desc: data?.price_data?.room, title: t('home.number') },
						{ icon: <MealIcon />, desc: data?.price_data?.meal, title: t('home.nutrition2') },
						{ icon: <TransferIcon />, desc: t('home.transfet_group_title'), title: t('home.transfet_group') },
						{ icon: <InsuranceIcon />, desc: t('home.standart_medical'), title: t('home.insurance') },
					]?.map((item, index) => {
						return (
							<div
								key={index}
								className='py-[15px] items-center px-[20px] rounded-[15px] border bg-white dark:bg-[#272829] dark:border-[#272829] border-[#EEEEEE] flex  gap-3'
							>
								{item?.icon}
								<div className='flex flex-col justify-between'>
									<div className='text-[#76787A] text-sm'>{item?.title}:</div>
									<div className='text-[#141414]  dark:text-white font-medium'>{item?.desc}</div>
								</div>
							</div>
						);
					})}
					{data?.price?.tour_data?.visa_text ? (
						<div className='py-[15px] items-center px-[20px] rounded-[15px] border bg-white dark:bg-[#272829] dark:border-[#272829] border-[#EEEEEE] flex  gap-3'>
							<VisaIcon />
							<div className='flex flex-col justify-between'>
								<div className='text-[#76787A] text-sm'>{t('home.visaf')}:</div>
								<div className='text-[#141414]  dark:text-white font-medium'>{data?.price?.tour_data?.visa_text}</div>
							</div>
						</div>
					) : null}
				</div>
				<div className='py-[15px] px-[20px] rounded-[15px] border bg-white dark:bg-[#272829] dark:border-[#272829] border-[#EEEEEE] flex flex-col gap-[20px]'>
					<div className='flex flex-col '>
						<div className='text-[#76787A] text-sm'>{t('home.flight')}:</div>
						<div className='text-[#141414] dark:text-white font-medium'>{t('home.the_tour_includes_roundtrip_flights')}</div>
					</div>
					<img src='/images/linedashed.svg' className='w-full object-cover h-[0.5px] ' alt='' />
					<div className='flex  justify-between items-center'>
						<div>
							{data?.price_data?.town?.tour_operator_id === 4 ? (
								<>
									{darkmode ? (
										<img src='/images/centrum_air_white.svg' className='w-[129px] mt-2' alt='' />
									) : (
										<img src='/images/centrum_air.svg' className='w-[129px] mt-2' alt='' />
									)}
								</>
							) : (
								<>
									{darkmode ? (
										<img src='/images/uzaiways.png' className='w-[129px] mt-2' alt='' />
									) : (
										<img src='/images/uzaiways.png' className='w-[129px] mt-2' alt='' />
									)}
								</>
							)}
						</div>
						<div className=' flex flex-col  text-[#9E9E9E] text-sm mt-2'>
							{data?.data?.claimDocument?.[0]?.transports?.[0]?.transport?.[0]?.tariff_attributes?.[0]?.tariff_attribute?.slice(0, 2)?.map((item_at, index_at) => {
								return (
									<div key={index_at}>
										{item_at?.group} {item_at?.value}
									</div>
								);
							})}
						</div>
					</div>
					{data?.data?.claimDocument?.[0]?.transports?.[0]?.transport?.map((item, index) => {
						const departure = item?.departure?.[0];
						const arrival = item?.arrival?.[0];
						const date1 = item?.dateend;
						const date2 = item?.datebeg;

						const start = new Date(`${date2}T${departure?.time}`);
						const end = new Date(`${date1}T${arrival?.time}`);

						const diffMs = end - start;
						const totalMinutes = Math.floor(diffMs / (1000 * 60));
						const hours = Math.floor(totalMinutes / 60);
						const minutes = totalMinutes % 60;

						const resultDate = hours ? `${hours}ч ${minutes}мин` : '';

						return (
							<div key={index} className={darkmode ? '!text-white' : ''}>
								<div className='flex justify-between w-full gap-[9px]'>
									<div className='flex flex-col gap-2 items-baseline w-1/4'>
										<p className='font-medium text-base'>{departure?.state}</p>
										<p className={`font-semibold text-2xl text-right ${darkmode ? 'text-white' : 'text-[#212121]'}`}>{departure?.time}</p>
										<p className='font-medium text-base whitespace-nowrap'>{formatDate2(date1)}</p>
									</div>
									<div className='flex flex-col justify-center  items-center w-2/4'>
										<div>
											<img src='/images/fromtoplane.svg' className='w-full' alt='' />
										</div>
										{/* <div>
											{item?.name} {item?.trantype}
										</div> */}
										<div>{resultDate}</div>
									</div>
									<div className='flex flex-col gap-2 w-1/4'>
										<p className='font-medium text-base text-right'>{arrival?.state}</p>
										<p className={`font-semibold text-2xl text-right ${darkmode ? 'text-white' : 'text-[#212121]'}`}>{arrival?.time}</p>
										<p className='font-medium text-base text-right whitespace-nowrap'>{formatDate2(date2)}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className='py-[15px] px-[20px] rounded-[15px] border bg-white border-[#EEEEEE] dark:bg-[#272829] dark:border-[#272829] flex flex-col gap-[15px]'>
					<div className='flex gap-2 items-center'>
						<EarphoneIcon />
						<div className='flex flex-col '>
							<div className='text-[#76787A] text-sm'>{t('home.support_from_presrige')}:</div>
							<div className='text-[#141414] dark:text-white font-medium'>{t('home.24_7_with_you_before_and_during_the_tour')}</div>
						</div>
					</div>
					<img src='/images/linedashed.svg' className='w-full object-cover h-[0.5px] ' alt='' />
					<p className=' text-center dark:text-white text-[#141414] text-base '>
						{t('home.prestige_team1')} <span className='!text-[#235DFF] cursor-pointer leading-4'>Prestige DMC</span>, {t('home.prestige_team2')}
					</p>
					<div className='flex  gap-[10px]  items-center'>
						{/* <div className='bg-[#00000033]  rounded-xl w-[100px] h-[142px]' /> */}

						<img src='/images/team_prstg.svg' alt='' className='w-full' />
					</div>
				</div>
			</div>
			<div className='container_main !px-[0px]'>
				<section className={`py-[20px]   dark:bg-[#272829]  bg-white rounded-tl-[15px] rounded-tr-[15px]  ${darkmode ? '' : ''}`}>
					<div className='container_main'>
						<div className='flex flex-col gap-[15px]'>
							<div className='flex justify-between w-full items-center gap-2'>
								<p className='dark:text-white  font-normal text-[#141414B2]'>{t('home.tour_cost')} : </p>
								<p className='font-medium text-xl dark:text-white text-[#141414]'>
									{PriceFormat(Number(data?.data?.claimDocument?.[0]?.moneys?.[0]?.money?.[1]?.price))} {t('home.uzs')}
								</p>
							</div>

							<ButtonMain
								onClick={() => {
									navigate(`/hotels/detail/hoteltourbooking/${id}/brone?tour_operator_id=${paramsObject?.tour_operator_id}`);
								}}
								type_color='t_blue'
								type='button'
								className='w-full'
								text={t('home.proceed_to_booking')}
							/>
						</div>
					</div>
				</section>
			</div>

			{soon_modal && (
				<div className='fixed z-9999 inset-0 bg-white dark:bg-[#141414]  flex items-center justify-center'>
					<div className='container_main  relative flex  justify-center items-center w-full flex-col gap-[35px] px-6 '>
						<div>
							<img src='/images/soon-towns.svg' alt='' className='w-[144px] h-[144px]' />
						</div>
						<div className='flex flex-col gap-[10px] text-center text-[#141414] text-lg'>
							<h4 className=' font-semibold dark:text-white'>{t('home.brone_err1')}</h4>
							<p className='font-medium dark:text-white'>{t('home.brone_err2')}</p>
						</div>
						<div className='flex flex-col  gap-3 w-full'>
							<div
								onClick={() => {
									handleRefetch();
								}}
								className=' cursor-pointer flex justify-center items-center text-base bg-[#235DFF] rounded-xl p-4 w-full text-center text-white h-[50px]'
							>
								{t('home.update_btn')}
							</div>
							<div
								onClick={() => {
									navigate(-1);
								}}
								className=' cursor-pointer flex justify-center items-center text-base bg-[#9DA0A3] rounded-xl p-4 w-full text-center text-white  h-[50px] '
							>
								{t('home.go_back_btn')}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default HotelTourBooking;
