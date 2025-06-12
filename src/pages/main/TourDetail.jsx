import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderDetailParams from '../../components/HeaderDetailParams';
import { Back } from '../../components/itemIcon';
import PrestigeBanner from '../../components/PrestigeBanner';
import AirplaneIcon from '../../svg/AirplaneIcon';
import EarphoneIcon from '../../svg/EarphoneIcon';
import HotelIcon from '../../svg/HotelIcon';
import HotelRoom from '../../svg/HotelRoomIcon';
import InsuranceIcon from '../../svg/InsuranceIcon';
import MealIcon from '../../svg/MealIcon';
import PlusIcon from '../../svg/PlusIcon';
import TicketIcon from '../../svg/TicketIcon';
import TransferIcon from '../../svg/TransferIcon';
import { getSearchParams } from '../../utils/function';

const TourDetail = ({ darkmode }) => {
	const navigate = useNavigate();
	const paramsObject = getSearchParams();
	const { search } = useLocation();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	return (
		<div className={`  min-h-screen pb-[10px] bg-neutralSand dark:bg-[#141414] `}>
			<div className='container_main !px-0'>
				<div className=' fixed  container_main  z-999 w-full bg-white dark:bg-[#272829] rounded-bl-[20px] rounded-br-[20px]  h-[75px]  mb-3 p-[15px]'>
					<div className='flex items-center w-full  justify-between gap-[10px] '>
						<div className='flex gap-[10px]  items-center'>
							<Back
								fill={darkmode ? '#fff' : '#141414'}
								onClick={() => {
									navigate(
										`/?town_from_inc=${paramsObject?.town_from_inc}&tour_operator_id=${paramsObject?.tour_operator_id}&state_id=${paramsObject?.state_id}&checkin=${paramsObject?.checkin}&nights=${paramsObject?.nights}&adult=${paramsObject?.adult}&childs=${paramsObject?.childs}&tour_somo_id=${paramsObject?.tour_somo_id}&towns[]=${paramsObject?.towns}`
									);
								}}
								className='-translate-x-[15px]'
							/>
							<HeaderDetailParams darkmode={darkmode} />
						</div>
					</div>
				</div>
			</div>
			<div className='pt-[90px] container_main px-[15px] '>
				<div className='flex flex-col gap-[10px]'>
					<PrestigeBanner darkmode={darkmode} />
					<div className='px-[15px] py-[15px] rounded-xl bg-white border border-[#EEEEEE] dark:bg-[#272829] dark:border-[#272829]'>
						<div className='text-[#76787A] font-medium text-sm leading-6'>Всё просто</div>
						<div className='text-[#141414] font-medium leading-6 dark:text-white text-[14px]'>
							Выберите отель, тип номера и питание, заполните свои данные и забронируйте тур!
						</div>
					</div>
					{paramsObject?.tour_somo_id === 7 ? <img src='/images/lopez-banner.png' alt='' className='rounded-xl' /> : null}
					<h2 className=' font-medium text-lg dark:text-white'>Что входит в стоимость тура</h2>
					<div className='bg-white dark:bg-[#272829]  flex flex-col p-[15px] rounded-xl gap-2'>
						<h4 className=' font-medium  text-[#141414] dark:text-white flex items-center gap-2'>
							<HotelIcon />
							Отель
						</h4>
						<div
							onClick={() => {
								if (paramsObject?.rixos) {
									navigate(`/hotels/rixos-result${search}`);
								} else {
									navigate(`/hotels/result${search}`);
								}
							}}
							className='bg-[#EBF0F5] dark:text-white dark:bg-[#36393E] cursor-pointer h-[100px] rounded-lg flex justify-center items-center gap-2'
						>
							<PlusIcon />
							Добавить отель
						</div>
					</div>
					<div>
						<div className='flex flex-col gap-[10px]'>
							{[
								...(paramsObject?.tour_somo_id === 7 ? [{ icon: <TicketIcon />, desc: 'Бесплатный билет на концерт ', title: t('home.number') }] : []),
								{ icon: <HotelRoom />, desc: 'Выбранный тип номера в отеле', title: t('home.number') },
								{ icon: <MealIcon />, desc: 'Выбранный тип питания', title: t('home.nutrition2') },
								{ icon: <TransferIcon />, desc: t('home.transfet_group_title'), title: t('home.transfet_group') },
								{ icon: <InsuranceIcon />, desc: t('home.standart_medical'), title: t('home.insurance') },
							]?.map((item, index) => {
								return (
									<div
										key={index}
										className='py-[15px] items-center px-[20px] rounded-[15px] border bg-white dark:bg-[#272829] dark:border-[#272829] border-[#EEEEEE] flex  gap-3'
									>
										<span>{item?.icon}</span>
										<div className='flex flex-col justify-between'>
											<div className='text-[#76787A] text-sm'>{item?.title}:</div>
											<div className='text-[#141414]  dark:text-white font-medium'>{item?.desc}</div>
										</div>
									</div>
								);
							})}

							<div className='py-[15px] px-[20px] rounded-[15px] border bg-white dark:bg-[#272829] dark:border-[#272829] border-[#EEEEEE] flex  flex-col gap-5'>
								<div className=' flex  gap-3'>
									<AirplaneIcon />
									<div className='flex flex-col justify-between'>
										<div className='text-[#76787A] text-sm'>Перелет:</div>
										<div className='text-[#141414]  dark:text-white font-medium'>В тур включен перелет туда и обратно</div>
									</div>
								</div>
								<img src='/images/linedashed.svg' className='w-full object-cover h-[0.5px] ' alt='' />
								<div className=' flex items-center justify-between'>
									<div className='flex gap-[10px] items-center'>
										{Number(paramsObject?.tour_operator_id) === 4 || [248].includes(Number(paramsObject?.tour_somo_id)) ? (
											<img src='/images/centrum.svg' alt='' />
										) : (
											<img src='/images/uzairways.svg' alt='' />
										)}
										<div className='flex flex-col justify-between'>
											<div className='text-[#132339] dark:text-white font-medium text-[20px] leading-[120%]'>
												{Number(paramsObject?.tour_operator_id) === 4 || [248].includes(Number(paramsObject?.tour_somo_id))
													? 'Centrum Air'
													: 'Uzairways'}
											</div>
											<div className='text-[#76787A] text-sm '>
												{[34, 223, 221, 220, 173, 194].includes(Number(paramsObject?.tour_somo_id))
													? 'A320'
													: [7, 248].includes(Number(paramsObject?.tour_somo_id))
													? 'A321-NEO'
													: 'A320'}
											</div>
										</div>
									</div>
									<div className='flex flex-col   text-sm font-medium text-end'>
										<span className='text-[#132339] dark:text-white'>
											{t('home.on_the_way')}{' '}
											{[34, 7]?.includes(Number(paramsObject?.tour_somo_id))
												? i18n?.language === 'uz'
													? '5s 20m'
													: '5ч 20м'
												: [223, 221, 220]?.includes(Number(paramsObject?.tour_somo_id))
												? i18n?.language === 'uz'
													? '2s 55m'
													: '2ч 55м'
												: [248]?.includes(Number(paramsObject?.tour_somo_id))
												? i18n?.language === 'uz'
													? '7s 5m'
													: '7ч 5м'
												: [173, 194]?.includes(Number(paramsObject?.tour_somo_id))
												? i18n?.language === 'uz'
													? '3s 40m'
													: '3ч 40м'
												: ''}
										</span>
										<span className='text-[#34C759]'>{t('home.direct_flight')}</span>
									</div>
								</div>
							</div>
							{Number(paramsObject?.tour_operator_id) !== 4 ? (
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
										<img src='/images/team_prstg.svg' alt='' className='w-full' />
									</div>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TourDetail;
