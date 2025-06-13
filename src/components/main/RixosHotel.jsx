import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import RixosLogo from '../../svg/RixosLogo';
import TicketIcon from '../../svg/TicketIcon';
import Axios from '../../utils/httpsClinet';
import { trackEvent } from '../../utils/mixpanel';

const RixosHotel = ({ darkmode, setModalNumberOfTourists2, obj }) => {
	const { t, i18n } = useTranslation();
	const lang = i18n.language;
	const navigate = useNavigate();
	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		Axios()
			.get(
				`/api/v1/somo-travel/tour-prices-content2?town_from_inc=1853&tour_operator_id=1&state_id=10&checkin=20250702&nights=7&towns[]=7&adult=2&childs=0&tour_somo_id=7&&page=1&rixos=true`
			)
			.then(res => {
				console.log(res.data?.data);
			})
			.catch(err => {});
	};
	return (
		<div className='container_main  pt-[20px]'>
			<div
				onClick={() => {
					navigate(`/hotels/tour-info/?town_from_inc=1853&tour_operator_id=1&state_id=10&checkin=20250702&nights=7&adult=2&childs=0&tour_somo_id=7&towns[]=7&rixos=true`);
				}}
				className='cursor-pointer dark:text-white bg-white dark:bg-[#272829] rounded-lg  flex flex-col'
			>
				<div className='flex flex-col gap-3 px-4 pt-4 pb-3'>
					<div className='flex '>
						<h4 className='font-semibold'>{lang === 'uz' ? 'Jennifer Lopesning Sharm al-Shayxdagi konserti' : ' Концерт Дженнифер Лопес в Шарм-эль-Шейхе '}</h4>
						<div>
							<RixosLogo />
						</div>
					</div>
					<p className='text-[#141414] leading-[18px] dark:text-white'>
						{lang === 'uz'
							? '2025-yil 4-iyul kuni afsonaviy Jennifer Lopes Rixos sahnasida chiqish qiladi'
							: '4 июля 2025 года легендарная Дженнифер Лопес выступит на сцене в Rixos'}
					</p>
					<div className='bg-[#235DFF26] p-[10px] rounded-[6px] leading-[18px] flex items-center gap-3'>
						<div>
							<TicketIcon />
						</div>
						{lang === 'uz' ? 'Rixosda sayohat paketini band qilganda bepul chiptalar beriladi' : 'Бесплатные билеты при бронировании тура в Rixos'}
					</div>
					<div className='flex  gap-[10px] items-center '>
						<div className='relative'>
							<img
								onError={e => {
									e.target.src = '/images/def_img.png';
								}}
								src={'/images/rixos-hotel.jpg'}
								alt=''
								className='min-w-[100px] max-w-[100px] h-[88px] object-cover rounded-[15px]'
							/>
						</div>
						<div className='flex flex-col gap-1 text-[#141414] dark:text-white'>
							<h2 className=' font-semibold text-[17px] line-clamp-1 hover:underline cursor-pointer'>Rixos Sharm El Sheikh</h2>
							<p className=' text-base font-normal'>{lang === 'uz' ? 'Misr, Sharm al-Shayx' : 'Египет, Шарм-эль-Шейхе'}</p>
							<div className='flex gap-[5px] '>
								<div className=' text-[#141414] dark:text-white  font-medium'>{4.8}</div>
								{darkmode ? <img className='pl-2' src='/images/tripadvisor-white.svg' alt='' /> : <img src='/images/tripadvisor.svg' alt='' />}{' '}
							</div>
						</div>
					</div>
					<div className=''>
						{lang === 'uz' ? (
							<>
								2-aprelda jo‘nash <br /> Ultra hamma narsa kiritilgan ovqatlanish
							</>
						) : (
							<>
								Вылет 2го апреля <br />
								Питание ультра все включено
							</>
						)}
					</div>
				</div>
				<img src='/images/linedashed.svg' className='w-full object-cover h-[0.5px] mt-[1px]' alt='' />
				<div className='px-4 pb-4 pt-3'>
					<div
						onClick={() => {
							trackEvent('hotel_rixos', 'hotel_rixos');

							setModalNumberOfTourists2(true);
						}}
						className=' cursor-pointer'
					>
						<div className='flex gap-3 justify-between w-full relative items-center'>
							<div className={`text-base font-normal ${darkmode ? '!text-white' : ''}`}>
								<span>
									{obj?.childrenCountRixos + obj?.adultCounterRixos} {t('home.turist')},{' '}
								</span>
								<span>7 {t('home.nights')}</span>
							</div>
							<div className='flex flex-col items-end'>
								<p className={`font-medium text-xl ${darkmode ? 'text-[#235DFF]' : 'text-[#235DFF]'}`}>
									{Number(58000000).toLocaleString('en-US').replace(/,/g, ' ')} {t('home.uzs')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RixosHotel;
