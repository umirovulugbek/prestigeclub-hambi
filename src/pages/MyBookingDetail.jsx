import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PrestigeBanner from '../components/PrestigeBanner';
import { Back, MapIcon } from '../components/itemIcon';
import Accordion from '../components/ui/Accardion';
import Axios from '../utils/httpsClinet';

const MyBookingDetail = ({ darkmode, hotel_detail = {} }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		getHotelTourBookin();

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	const getHotelTourBookin = () => {
		setLoading(true);
		Axios()
			.get(`api/v1/search/service/my-bron`)
			.then(res => {
				setData(res?.data?.orders?.filter(item => item?.price?.id === Number(id)));
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const accordionData = [
		{
			title: 'Детали тура',
			content: (
				<>
					{data?.slice(0, 1)?.map((item, index) => {
						// const formattedCheckInDate2 = format(parseISO(item?.check_in), 'dd/MM');

						// // Tarixlarni sanash
						// const daysDifference = differenceInCalendarDays(parseISO(item?.check_out), parseISO(item?.check_in));

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

						const parsedCheckIn = parseCustomDate(item?.price?.check_in);
						const parsedCheckOut = parseCustomDate(item?.price?.check_out);

						// Check-in sanasini formatlash
						const formattedCheckInDate2 = formatCustomDate(parsedCheckIn);

						// Kunlar farqini hisoblash
						const daysDifference = calculateDaysDifference(parsedCheckIn, parsedCheckOut);
						return (
							<div key={index} className={darkmode ? '!text-white' : ''}>
								<div className='flex gap-2.5 items-center mb-[10px]'>
									<img
										onError={e => {
											e.target.src = 'https://cdn0.hitched.co.uk/vendor/4332/3_2/1280/png/frame-1_4_24332-169089063311545.webp';
										}}
										src={item?.image}
										className='w-[125px] h-[75px] rounded-[15px]'
										alt=''
									/>
									<div>
										<p className='font-semibold text-base '>{item?.price?.hotel?.name}</p>
										<p className='text-base flex gap-2 items-center mt-[10px] font-normal'>
											<MapIcon /> <span>{item?.price?.town?.name}</span>
										</p>
									</div>
								</div>
								<div className='flex flex-col gap-1.5'>
									<div className='inline-flex gap-2'>
										<span className='font-normal text-base text-blueRibbon'>Туристы:</span>
										<span className='font-normal text-lg'>
											{item?.price?.adult} взрослых, {item?.price?.child} детей
										</span>
									</div>
									<div className='inline-flex gap-2'>
										<span className='font-normal text-base text-blueRibbon'>Даты туры:</span>
										<div className='font-normal text-lg'>
											<span>
												Вылет {formattedCheckInDate2}, {daysDifference} ночей
											</span>
										</div>
									</div>
									<div className='inline-flex gap-2'>
										<span className='font-normal text-base text-blueRibbon'>Номер:</span>
										<span className='font-normal text-lg'>{item?.price?.room}</span>
									</div>
									<div className='inline-flex gap-2'>
										<span className='font-normal text-base text-blueRibbon'>Питаие:</span>
										<span className='font-normal text-lg'>{item?.price?.meal}</span>
									</div>
								</div>
							</div>
						);
					})}
				</>
			),
		},
	];
	return (
		<div className={`min-h-screen  pb-[65px] ${darkmode ? 'bg-[#141414]' : 'bg-neutralSand'}`}>
			<div className='container_main !px-0'>
				<section className={`py-[10px] container_main  rounded-bl-[20px] z-40 fixed w-full rounded-br-[20px] h-[65px] ${darkmode ? 'bg-[#272829]' : 'bg-white'}`}>
					<div className='flex items-center w-full'>
						<Back fill={darkmode ? '#fff' : '#141414'} onClick={() => navigate(-1)} />
						<div className={`text-lg font-semibold flex w-full justify-center ${darkmode ? 'text-white' : 'text-blueWood'}`}>Бронирование тура</div>
						<div className='w-[45px]'></div>
					</div>
				</section>
				<div className=' pt-[80px]'>
					<PrestigeBanner />
				</div>
				<Accordion list={accordionData} darkmode={darkmode} />
			</div>
		</div>
	);
};

export default MyBookingDetail;
