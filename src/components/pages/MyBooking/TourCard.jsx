import { t } from 'i18next';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapIcon } from '../../itemIcon';
import ButtonMain from '../../ui/ButtonMain';

const TourCard = ({ status, darkmode, data }) => {
	const navigate = useNavigate();

	function parseCustomDate(dateString) {
		const year = parseInt(dateString?.slice(0, 4), 10);
		const month = parseInt(dateString?.slice(4, 6), 10) - 1;
		const day = parseInt(dateString?.slice(6, 8), 10);
		return new Date(year, month, day);
	}

	function formatCustomDate(date) {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		return `${day}.${month}`;
	}

	function calculateDaysDifference(date1, date2) {
		const oneDay = 24 * 60 * 60 * 1000;
		return Math.round((date2 - date1) / oneDay);
	}

	const parsedCheckIn = parseCustomDate(data?.price?.check_in);
	const parsedCheckOut = parseCustomDate(data?.price?.check_out);

	// Check-in sanasini formatlash
	const formattedCheckInDate2 = formatCustomDate(parsedCheckIn);

	// Kunlar farqini hisoblash
	const daysDifference = calculateDaysDifference(parsedCheckIn, parsedCheckOut);
	return (
		<div>
			<div className={darkmode ? '!text-white bg-[#272829]  rounded-[15px]' : ' bg-white rounded-[15px]w '}>
				<div className='px-[20px] py-[15px]'>
					<div className='flex justify-between items-center mb-[10px]'>
						<h3 className='text-lg font-semibold'>
							{t('home.tour')} №{data?.price?.id}
						</h3>
						<span className={`px-2 py-1 rounded-[15px] text-sm ${status === 0 ? 'bg-[#54DA8A] text-white' : 'bg-[#FFD56C] text-white'}`}>
							{status === 0 ? t('home.paid') : t('home.awaiting_payment')}
						</span>
					</div>
					<div className='flex gap-2.5 items-center mb-[10px]'>
						<img
							onError={e => {
								e.target.src = 'https://cdn0.hitched.co.uk/vendor/4332/3_2/1280/png/frame-1_4_24332-169089063311545.webp';
							}}
							src={data?.image}
							className='w-[125px] h-[75px] rounded-[15px]'
							alt=''
						/>
						<div>
							<p className='font-semibold text-base '>{data?.price?.hotel?.name}</p>
							<p className='text-base flex gap-2 items-center mt-[10px] font-normal'>
								<MapIcon /> <span>{data?.price?.town?.name}</span>
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-1.5'>
						<div className='inline-flex gap-2'>
							<span className='font-normal text-base text-blueRibbon'>{t('home.tourists')}:</span>
							<span className='font-normal text-lg'>
								{data?.price?.adult} {t('home.adult2')}, {data?.price?.child} {t('home.child2')}
							</span>
						</div>
						<div className='inline-flex gap-2'>
							<span className='font-normal text-base text-blueRibbon'>{t('home.tour_dates')}:</span>
							<div className='font-normal text-lg'>
								{' '}
								{t('home.departure')} {formattedCheckInDate2} , {daysDifference} {t('home.nights')}
							</div>
						</div>
					</div>
				</div>
				<img src='/images/linedashed.svg' className='w-full object-cover ' alt='' />
				<div className='px-[20px] py-[15px]'>
					{status === 0 ? (
						<div className=' flex justify-center'>
							<Link to={`/mybooking/detail/${data?.price?.id}`} className=' !text-[#235DFF] underline'>
								{t('home.view_tour_details')}
							</Link>
						</div>
					) : (
						<ButtonMain
							type='button'
							type_color='t_blue'
							className='w-full '
							text={t('home.pay_tour')}
							onClick={() => {
								navigate(`/hotels/detail/hoteltourbooking/${data?.price?.id}`);
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default TourCard;
