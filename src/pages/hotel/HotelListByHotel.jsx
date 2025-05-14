import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useNavigate } from 'react-router-dom';
import HeaderDetailParams from '../../components/HeaderDetailParams';
import TourIncludes from '../../components/TourIncludes';
import { Back } from '../../components/itemIcon';
import GetReviewWidget from '../../components/widget';
import Axios from '../../utils/httpsClinet';

// Import Swiper styles
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import HotelCard from '../../components/card/HotelCard';
import ModalEdit from '../../components/modal/ModalEdit';
import { getSearchParams } from '../../utils/function';

const HotelListByHotel = ({ darkmode }) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const paramsObject = getSearchParams();

	const [loading, setLoading] = useState(false);
	const [items, setItems] = useState([]);
	const [state, setState] = useState({});
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [modal, setModal] = useState(false);
	const [objError, setObjError] = useState({});
	const [anotherObj, setAnotherObj] = useState({});
	const [obj, setObj] = useState({
		adultCounter: 2,
		childrenCount: 0,
	});

	useEffect(() => {
		if (paramsObject?.town_from_inc && paramsObject?.tour_operator_id) {
			setAnotherObj(pV => ({
				...pV,
				town_from_inc: paramsObject?.town_from_inc,
				tour_operator_id: paramsObject?.tour_operator_id,
				state_id: paramsObject?.state_id,
				hotel_key: paramsObject?.hotel_key,
				towns: paramsObject?.towns,
				tour_somo_id: paramsObject?.tour_somo_id,
			}));
		}
		if (paramsObject?.adult || paramsObject?.childs) {
			setObj(pV => ({
				...pV,
				number_of_tourists: Number(paramsObject?.adult === undefined ? 2 : paramsObject?.adult) + Number(paramsObject?.childs === undefined ? 0 : paramsObject?.childs),
				childrenCount: Number(paramsObject?.childs === undefined ? 0 : paramsObject?.childs),
				adultCounter: Number(paramsObject?.adult === undefined ? 1 : paramsObject?.adult),
			}));
		}

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	useEffect(() => {
		// setLoading(true);
		let searchParams = window.location.search;

		if (searchParams.includes('&checkin=')) {
			fetchData();
		} else {
			setModal(true);
		}

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	const fetchData = searchParams => {
		Axios()
			.get(`api/v1/somo-travel/tour-price-top-hotel${searchParams === undefined ? window.location.search : '?' + searchParams}&page=${page}&per_page=3`)

			.then(r => {
				let data = r?.data?.data;

				let result = page == 1 ? data : [...items, ...data];

				setItems(result);
				setState(r?.data?.state);
				setPage(prevPage => prevPage + 1);
				setModal(false);
			})
			.catch(e => {
				console.log(e);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleFind = () => {
		let t = true,
			error = {};

		if (!obj?.departure_date) {
			t = false;
			error = { ...error, departure_date: true };
		}
		if (!obj?.number_of_tourists) {
			t = false;
			error = { ...error, number_of_tourists: true };
		}
		if (!obj?.number_of_days) {
			t = false;
			error = { ...error, number_of_days: true };
		}
		if (t) {
			const filter = {
				town_from_inc: anotherObj?.town_from_inc,
				tour_operator_id: anotherObj?.tour_operator_id,
				state_id: anotherObj?.state_id,
				checkin: obj?.departure_date,
				nights: obj?.number_of_days,
				tour_somo_id: anotherObj?.tour_somo_id,
				adult: obj?.adultCounter,
				childs: obj?.childrenCount,
				hotel_key: anotherObj?.hotel_key,
				towns: anotherObj?.towns ? [anotherObj?.towns] : [],
			};

			const formatDate = dateStr => {
				const [year, month, day] = dateStr.split('-');
				return `${year}${month}${day}`;
			};

			const searchParamss = Object.keys(filter)
				.map(key => {
					if (Array.isArray(filter[key])) {
						return filter[key].map(value => `${key}[]=${encodeURIComponent(value)}`).join('&');
					}
					if (key === 'checkin') {
						return `${key}=${encodeURIComponent(formatDate(filter[key]))}`;
					}
					return `${key}=${encodeURIComponent(filter[key])}`;
				})
				.join('&');

			fetchData(`${searchParamss}`);
			navigate(`/hotels/result-hotel/?${searchParamss}`);
		} else {
			setObjError(error);
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	};
	return (
		<div className={`min-h-screen pb-[75px] bg-neutralSand dark:bg-[#141414] `}>
			{loading ? (
				<div className='container_main !px-0'>
					<div className='bg-white dark:bg-[#272829] rounded-bl-[20px] rounded-br-[20px] py-[20px]'>
						<div className='flex items-center w-full pl-[15px]'>
							<Back fill={darkmode ? '#fff' : '#141414'} onClick={() => navigate(`/${window.location.search}`)} className='-translate-x-[15px]' />
						</div>
					</div>

					<div className='overflow-x-scroll flex gap-2 whitespace-nowrap mt-3'>
						{[...Array(5)].map((_, index) => (
							<Skeleton key={index} width={153} height={48} style={{ borderRadius: '15px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
						))}
					</div>
					<div className='mt-[25px]'>
						<Skeleton height={48} style={{ borderRadius: '15px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
					</div>
					<div className='mt-[15px]'>
						{[...Array(1)].map((_, index) => (
							<Skeleton key={index} height={200} style={{ borderRadius: '15px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
						))}
					</div>
					<TourIncludes />
					<div className='mt-[15px]'>
						{[...Array(1)].map((_, index) => (
							<Skeleton key={index} height={200} style={{ borderRadius: '15px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
						))}
					</div>
				</div>
			) : (
				<div className='container_main !px-0'>
					<div className=' fixed  container_main  z-999 w-full bg-white dark:bg-[#272829] rounded-bl-[20px] rounded-br-[20px]  h-[75px]  mb-[14px] p-[15px]'>
						<div className='flex items-center w-full  justify-between gap-[10px] '>
							<div className='flex gap-[10px]  items-center'>
								<Back className='-translate-x-[15px]' fill={darkmode ? '#fff' : '#141414'} onClick={() => navigate(`/${window.location.search}`)} />
								<HeaderDetailParams darkmode={darkmode} />
							</div>
						</div>
					</div>
					<div className='container_main !px-0'>
						<div className='pt-[75px]  mb-3'>
							<GetReviewWidget widgetId={state?.widget} />
						</div>
						{/* <PrestigeBanner darkmode={darkmode} /> */}
						<div className='mt-[25px] flex flex-col gap-[15px]'>
							{items.map((item, index) => {
								return <HotelCard item={item} index={index} darkmode={darkmode} />;
							})}
							<ModalEdit
								setEditModal={setModal}
								editModal={modal}
								setObjError={setObjError}
								darkmode={darkmode}
								setAnotherObj={setAnotherObj}
								setObj={setObj}
								obj={obj}
								objError={objError}
								handleFind={handleFind}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default HotelListByHotel;
