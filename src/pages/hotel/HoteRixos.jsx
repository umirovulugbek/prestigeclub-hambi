import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import HotelCard from '../../components/card/HotelCard';
import { Back } from '../../components/itemIcon';
import HeaderDetailParams from '../../components/main/HeaderDetailParams';
import { getSearchParams } from '../../utils/function';
import Axios from '../../utils/httpsClinet';

const HoteRixos = ({ darkmode }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const paramsObject = getSearchParams();

	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState(1);
	const [items1, setItems1] = useState([]);
	const [items2, setItems2] = useState([]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		fetchData1();
		fetchData2();
	}, []);

	useEffect(() => {
		const updatedCheckin = activeTab === 1 ? '20250701' : '20250702';

		const searchParams = new URLSearchParams(paramsObject);
		searchParams.set('checkin', updatedCheckin);

		navigate({ search: searchParams.toString() }, { replace: true });
	}, [activeTab]);

	const fetchData1 = () => {
		setLoading(true);
		Axios()
			.get(
				`/api/v1/somo-travel/tour-prices-content2?town_from_inc=1853&tour_operator_id=1&state_id=10&checkin=20250701&nights=7&towns[]=7&adult=${paramsObject?.adult}&childs=${paramsObject?.childs}&tour_somo_id=7&page=1`
			)
			.then(r => {
				let data = r?.data?.data;
				setItems1(data || []);
			})
			.catch(e => console.log(e))
			.finally(() => setLoading(false));
	};

	const fetchData2 = () => {
		setLoading(true);
		Axios()
			.get(
				`/api/v1/somo-travel/tour-prices-content2?town_from_inc=1853&tour_operator_id=1&state_id=10&checkin=20250702&nights=7&towns[]=7&adult=${paramsObject?.adult}&childs=${paramsObject?.childs}&tour_somo_id=7&page=1`
			)
			.then(r => {
				let data = r?.data?.data;
				setItems2(data || []);
			})
			.catch(e => console.log(e))
			.finally(() => setLoading(false));
	};

	const currentItems = activeTab === 1 ? items1 : items2;

	return (
		<div className='min-h-screen pb-[10px] bg-neutralSand dark:bg-[#141414]'>
			<div className='container_main !px-0'>
				<div className='fixed container_main z-999 w-full bg-white dark:bg-[#272829] rounded-bl-[20px] rounded-br-[20px] h-[75px] mb-3 p-[15px]'>
					<div className='flex items-center w-full justify-between gap-[10px]'>
						<div className='flex gap-[10px] items-center'>
							<Back
								fill={darkmode ? '#fff' : '#141414'}
								onClick={() => {
									navigate(
										`/hotels/tour-info/?town_from_inc=${paramsObject?.town_from_inc}&tour_operator_id=${paramsObject?.tour_operator_id}&state_id=${
											paramsObject?.state_id
										}&checkin=${paramsObject?.checkin}&nights=${paramsObject?.nights}&adult=${paramsObject?.adult}&childs=${
											paramsObject?.childs
										}&tour_somo_id=${paramsObject?.tour_somo_id}&towns[]=${paramsObject?.towns}${paramsObject?.rixos ? '&rixos=true' : ''}`
									);
								}}
								className='-translate-x-[15px]'
							/>
							<HeaderDetailParams darkmode={darkmode} />
						</div>
					</div>
				</div>

				{loading ? (
					<>
						<div className='container_main z-999 w-full bg-white dark:bg-[#272829] rounded-bl-[20px] rounded-br-[20px] h-[75px] !mb-[14px] p-[15px]'></div>
						<div className='mb-[15px] mt-[5px] mx-[10px] gap-[15px] flex flex-col'>
							{[...Array(3)].map((_, index) => (
								<Skeleton key={index} height={300} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
							))}
						</div>
					</>
				) : (
					<div className='pt-[90px] flex flex-col gap-3'>
						<div className='bg-white dark:bg-[#272829]'>
							<div className='container_main py-[10px] flex flex-col gap-[10px]'>
								<div className='font-medium text-[#141414] dark:text-white'>Дата вылета на концерт</div>
								<div className='flex items-center gap-[10px]'>
									<div
										className={`w-full border-[0.5px] p-[10px] rounded-md flex justify-center cursor-pointer ${
											activeTab === 1 ? 'border-[#235DFF] bg-[#EBF0F5]  dark:bg-[#2d2e31]' : 'border-[#235DFF] '
										}`}
										onClick={() => setActiveTab(1)}
									>
										<div className='flex flex-col gap-2 items-center'>
											<div className='text-[#141414] dark:text-white font-medium'>01.06 - {paramsObject?.nights} ночей</div>
											<div className='text-[#235DFF] font-semibold text-lg'>
												{items1
													?.filter(i => [147, 146].includes(i?.hotel?.hotel_key))[0]
													?.converted_price_number.toLocaleString('en-US')
													.replace(/,/g, ' ')}{' '}
												сум
											</div>
										</div>
									</div>
									<div
										className={`w-full border-[0.5px] p-[10px] rounded-md flex justify-center cursor-pointer ${
											activeTab === 2 ? 'border-[#235DFF] bg-[#EBF0F5]   dark:bg-[#2d2e31] ' : ' border-[#235DFF]'
										}`}
										onClick={() => setActiveTab(2)}
									>
										<div className='flex flex-col gap-2 items-center'>
											<div className='text-[#141414] dark:text-white font-medium'>02.06 - {paramsObject?.nights} ночей</div>
											<div className='text-[#235DFF] font-semibold text-lg'>
												{' '}
												{items2
													?.filter(i => [147, 146].includes(i?.hotel?.hotel_key))[0]
													?.converted_price_number.toLocaleString('en-US')
													.replace(/,/g, ' ')}{' '}
												сум
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<InfiniteScroll
							dataLength={currentItems.length}
							className='flex flex-col gap-[15px] mx-[10px]'
							loader={<span className='flex justify-center mt-[15px] h-[50px]'></span>}
							endMessage={<p className='mb-0'></p>}
						>
							{currentItems
								?.filter(i => [147, 146].includes(i?.hotel?.hotel_key))
								?.map((item, index) => (
									<HotelCard key={index} item={item} index={index} darkmode={darkmode} />
								))}
						</InfiniteScroll>
					</div>
				)}
			</div>
		</div>
	);
};

export default HoteRixos;
