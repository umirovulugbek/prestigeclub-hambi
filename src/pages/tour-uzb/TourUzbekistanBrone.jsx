import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Back } from '../../components/itemIcon';
import PrestigeBanner from '../../components/main/PrestigeBanner';
import ButtonMain from '../../components/ui/ButtonMain';
import ArrowBroneIcon from '../../icons/ArrowBroneIcon';
import { getSearchParams } from '../../utils/function';
import Axios from '../../utils/httpsClinet';
import { PriceFormat } from '../../utils/PriceFormat';

const TourUzbekistanBrone = ({ darkmode }) => {
	const { id } = useParams();
	const { t, i18n } = useTranslation();
	const paramsObject = getSearchParams();
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [activeDate, setActiveDate] = useState(0);
	const [obj, setObj] = useState({
		adultCounter: 0,
		childrenCount: 0,
		available_seats: 0,
	});
	const navigate = useNavigate();

	useEffect(() => {
		getTourUzb();
	}, []);
	useEffect(() => {
		setActiveDate(paramsObject?.activeDate);
		setObj(pv => ({
			...pv,
			adultCounter: paramsObject?.adult,
			childrenCount: paramsObject?.child,
			available_seats: paramsObject?.available_seats,
		}));
	}, [window.location.search]);

	const getTourUzb = () => {
		setLoading(true);
		Axios()
			.get(`/api/uzb-tours/tour/${id}`)
			.then(res => {
				setData(res?.data?.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleAdultCounter = delta => {
		const newCount = obj?.adultCounter + delta;
		if (newCount >= 0 && newCount <= +obj?.available_seats - obj?.childrenCount) {
			setObj(pV => ({ ...pV, adultCounter: newCount }));
		}
	};

	const handleChildrenChange = delta => {
		const totalSeats = +obj?.available_seats;
		const newChildrenCount = obj?.childrenCount + delta;
		if (newChildrenCount >= 0) {
			if (obj?.adultCounter + newChildrenCount <= totalSeats) {
				setObj(pV => ({ ...pV, childrenCount: newChildrenCount }));
			}
		}
	};
	return (
		<div className={`min-h-screen `}>
			<div className='container_main !px-0'>
				<section className={`py-[10px] container_main  rounded-bl-[20px] z-40 fixed w-full rounded-br-[20px]  ${darkmode ? 'bg-[#272829]' : 'bg-white'}`}>
					<div className='flex items-center w-full'>
						<Back fill={darkmode ? '#fff' : '#141414'} onClick={() => navigate(-1)} />
						<div className={`text-lg font-normal flex w-full justify-center ${darkmode ? 'text-white' : 'text-blueWood'}`}>{t('home.toursInUzbekistan')}</div>
						<div className='w-[45px]'></div>
					</div>
					<div className='flex justify-center my-[15px] items-center'>
						<div className='flex  gap-2 items-center'>
							<div className='w-[30px] h-[30px]  rounded-full bg-[#F5F5F5] text-[#C4C8CC]  flex justify-center items-center'>1</div>
							<div className='text-[#C4C8CC] dark:text-white font-medium'>{t('home.tour_details')}</div>
						</div>
						<div className='w-[60px] flex justify-center'>
							<ArrowBroneIcon />
						</div>

						<div className='flex  gap-2 items-center'>
							<div className='w-[30px] h-[30px]  rounded-full bg-[#00AA6C]  text-white   flex justify-center items-center'>2</div>
							<div className=' text-[#141414] font-normal'>{t('home.booking')}</div>
						</div>
					</div>
				</section>
			</div>
			<div className='pt-[140px]  !px-0 flex flex-col gap-[10px]'>
				<div className=' container_main w-full flex flex-col  gap-[10px]'>
					<PrestigeBanner darkmode={darkmode} />
					<div className='p-[15px]  border rounded-xl  bg-white'>
						<div dangerouslySetInnerHTML={{ __html: data?.included_info }} />
					</div>
				</div>
				<div className=' bg-white rounded-t-[10px] container_main !px-0  w-full '>
					<div className=' !pr-0 pl-[13px] py-[10px] '>
						<div className='flex gap-[10px] overflow-x-scroll'>
							{data?.available_dates.map((item, index) => {
								return (
									<div
										key={index}
										onClick={() => {
											setActiveDate(item?.start_date);
											setObj(pV => ({ ...pV, adultCounter: 0, childrenCount: 0, available_seats: item?.available_seats }));
										}}
										className={`bg-[#EBF0F5] rounded-lg  cursor-pointer h-[70px] flex justify-center items-center border min-w-[160px] ${item?.start_date === activeDate ? 'border-[#0077FF] text-[#0077FF]' : ''
											}`}
									>
										<div>
											<div className='flex flex-col'>
												<div className=' font-medium text-[17px] leading-[22px]'>{item?.start_date}</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className='flex flex-col gap-[20px] container_main w-full '>
						<div className='flex items-center justify-between  dark:bg-[#272829] bg-[#EBF0F5] rounded-xl px-[15px] py-[15px]'>
							<span className='mr-2  flex flex-col'>
								<span className='text-[17px] font-normal select-none dark:text-white'>{t('home.adults')}</span>
								<span className=' text-sm text-[#76787A]'>{t('home.over_16_years_old')}</span>
							</span>
							<div className='flex items-center gap-1  bg-white dark:bg-[#141414] rounded-full p-1'>
								<button
									onClick={() => handleAdultCounter(-1)}
									className={`select-none  w-[27px] h-[27px] ${obj?.adultCounter > 0 ? 'bg-[#0077FF] ' : 'bg-[#D7DBE0] !cursor-no-drop'
										}  flex justify-center items-center text-white	 font-normal text-base rounded-full`}
								>
									-
								</button>

								<span className='select-none mx-2 font-normal text-lg dark:text-white'>{obj?.adultCounter}</span>
								<button
									onClick={() => handleAdultCounter(1)}
									className={` ${obj?.childrenCount + obj?.adultCounter < obj?.available_seats ? 'bg-[#0077FF]' : 'bg-[#D7DBE0] !cursor-no-drop'
										}  select-none w-[27px] h-[27px]  flex justify-center items-center text-white font-normal text-base rounded-full`}
								>
									+
								</button>
							</div>
						</div>
						<div className='flex items-center justify-between bg-[#EBF0F5] dark:bg-[#272829] rounded-xl px-[15px]'>
							<div className='flex items-center justify-between w-full py-[15px] '>
								<div className='flex flex-col '>
									<span className='mr-2 font-normal text-[17px] dark:text-white'>{t('home.childs')}</span>
									<span className=' text-sm text-[#76787A]'>{t('home.2_to_12_years_old')}</span>
								</div>
								<div className='flex items-center gap-1 bg-white dark:bg-[#141414]  rounded-full p-1'>
									<button
										onClick={() => handleChildrenChange(-1)}
										className={`select-none w-[27px] h-[27px] ${obj?.childrenCount > 0 ? 'bg-[#0077FF] ' : 'bg-[#D7DBE0] !cursor-no-drop'
											} flex justify-center items-center text-white font-normal text-base rounded-full`}
									>
										-
									</button>
									<span className='select-none mx-2 font-normal text-lg dark:text-white'>{obj?.childrenCount}</span>
									<button
										onClick={() => handleChildrenChange(1)}
										className={` ${obj?.childrenCount + obj?.adultCounter < obj?.available_seats ? 'bg-[#0077FF]' : 'bg-[#D7DBE0] !cursor-no-drop'
											}  select-none w-[27px] h-[27px]  flex justify-center items-center text-white font-normal text-base rounded-full`}
									>
										+
									</button>
								</div>
							</div>
						</div>
					</div>
					<section className={`py-[20px]   dark:bg-[#272829]  bg-white rounded-tl-[15px] rounded-tr-[15px]  ${darkmode ? '' : ''}`}>
						<div className='container_main'>
							<div className='flex flex-col gap-[15px]'>
								<div className='flex justify-between w-full items-center gap-2'>
									<p className='dark:text-white  font-normal text-[#141414B2]'>{t('home.tour_cost')} : </p>
									<p className='font-medium text-xl dark:text-white text-[#141414]'>
										{PriceFormat(Number(+data?.child_price * obj?.childrenCount + +data?.adult_price * obj?.adultCounter))} {t('home.uzs')}
									</p>
								</div>
								<ButtonMain
									onClick={() => {
										// navigate(`/tour-uzbekistan/${id}/brone`);
									}}
									type_color='t_blue'
									disabled={obj?.adultCounter === 0 && obj?.childrenCount === 0}
									type='button'
									className='w-full'
									text={t('home.proceed_to_booking')}
								/>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default TourUzbekistanBrone;
