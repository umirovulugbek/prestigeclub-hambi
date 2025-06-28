import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Back } from '../../components/itemIcon';
import GetReviewWidget from '../../components/widget';
import Axios from '../../utils/httpsClinet';

import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import HotelCard from '../../components/card/HotelCard';
import SelectDiv2 from '../../components/form/SelectDiv2';
import HeaderDetailParams from '../../components/HeaderDetailParams';
import ModalEdit from '../../components/modal/ModalEdit';
import ModalFilter from '../../components/pages/searchresult/ModalFilter';
import ModalRecommended from '../../components/pages/searchresult/ModalRecommended';
import PrestigeBanner from '../../components/PrestigeBanner';
import FilterPill from '../../components/ui/FilterPill';
import { StyleCom } from '../../style/Styled';
import { getSearchParams } from '../../utils/function';
import { trackEvent } from '../../utils/mixpanel';
import SearchMap from '../SearchMap';
const fetchDataMap = async () => {
	const { data } = await Axios().get(`/api/v1/somo-travel/tour-prices-content-map2${window.location.search}`);
	return data?.data || [];
};

const HotelListBySearch = ({ darkmode }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const paramsObject = getSearchParams();
	const [modalFiler, setModalFilter] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loading_inf, setLoadingInf] = useState(false);
	const [items, setItems] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [editModal, setEditModal] = useState(false);
	const [modalRec, setModalRec] = useState(false);
	const [paramsObj, setParamsObj] = useState({});
	const [modalMap, setModalMap] = useState(false);
	const [selectedSort, setSelectedSort] = useState('cheapest');
	const [obj, setObj] = useState({
		adultCounter: 2,
		childrenCount: 0,
	});
	const [objError, setObjError] = useState({});
	const [anotherObj, setAnotherObj] = useState({});

	useEffect(() => {
		let searchParamss = window.location.search;
		fetchData(searchParamss, 1);

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	useEffect(() => {
		setParamsObj(paramsObject);
		if (paramsObject?.town_from_inc && paramsObject?.tour_operator_id) {
			setAnotherObj(pV => ({
				...pV,
				town_from_inc: paramsObject?.town_from_inc,
				tour_operator_id: paramsObject?.tour_operator_id,
				state_id: paramsObject?.state_id,
				hotel_key: paramsObject?.hotel_key,
				towns: +paramsObject?.towns,
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

	const {
		data: data_map,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['hotelLocations', window.location.search],
		queryFn: () => fetchDataMap(),
		enabled: !!window.location.search,
		staleTime: 1000 * 60 * 5,
		cacheTime: 1000 * 60 * 10,
		refetchOnWindowFocus: false,
	});

	const fetchData = (searchParams, page_p) => {
		if (searchParams) {
			setLoading(true);
		} else {
			setLoadingInf(true);
		}

		Axios()
			.get(`api/v1/somo-travel/tour-prices-content2${searchParams === undefined ? window.location.search : searchParams}&page=${+page_p ? +page_p : page}`)
			.then(r => {
				let data = r?.data?.data;
				trackEvent('result_count', { result_count: r?.data?.data?.total });

				setObj(pV => ({
					...pV,
					widget: r?.data?.tour_data?.widget,
					filters: r?.data?.filters,
				}));

				if (searchParams) {
					setItems(data);
				} else {
					setItems(prevItems => [...prevItems, ...data]);
				}
				setPage(prevPage => prevPage + 1);

				if (data?.data?.length === 0) {
					setHasMore(false);
				} else {
					setHasMore(true);
				}
			})
			.catch(e => {
				console.log(e);
			})
			.finally(() => {
				if (searchParams) {
					setLoading(false);
				} else {
					setLoadingInf(false);
				}
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
				adult: obj?.adultCounter,
				childs: obj?.childrenCount,
				tour_somo_id: paramsObj?.tour_somo_id,
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
			navigate(`/hotels/result/?${searchParamss}`);
			fetchData('?' + searchParamss, 1);
			setEditModal(false);
			setPage(0);
		} else {
			setObjError(error);
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	};

	const removeStars = starToRemove => {
		const searchParams = new URLSearchParams(location.search);
		const stars = searchParams.getAll('stars[]');
		const updatedStars = stars.filter(star => Number(star) !== Number(starToRemove));

		searchParams.delete('stars[]');
		updatedStars.forEach(star => searchParams.append('stars[]', star));

		navigate(`?${searchParams.toString()}`, { replace: true });
	};

	const tags = paramsObject?.tags || [];
	const stars = paramsObject?.stars || [];

	const minPrice = paramsObject?.price_min || 0;
	const maxPrice = paramsObject?.price_max || Infinity;

	return (
		<>
			<div className={`  min-h-screen pb-[10px] bg-neutralSand dark:bg-[#141414] `}>
				<div className='container_main !px-0'>
					<div className=' fixed  container_main  z-999 w-full bg-white dark:bg-[#272829] rounded-bl-[20px] rounded-br-[20px]  h-[75px]  mb-3 p-[15px]'>
						<div className='flex items-center w-full  justify-between gap-[10px] '>
							<div className='flex gap-[10px]  items-center'>
								<Back
									fill={darkmode ? '#fff' : '#141414'}
									onClick={() => {
										navigate(
											`/hotels/tour-info/?town_from_inc=${paramsObj?.town_from_inc}&tour_operator_id=${paramsObj?.tour_operator_id}&state_id=${paramsObj?.state_id}&checkin=${paramsObj?.checkin}&nights=${paramsObj?.nights}&adult=${paramsObj?.adult}&childs=${paramsObj?.childs}&tour_somo_id=${paramsObj?.tour_somo_id}&towns[]=${paramsObj?.towns}`
										);
									}}
									className='-translate-x-[15px]'
								/>
								<HeaderDetailParams darkmode={darkmode} />
							</div>

							<img
								src='/images/edit.svg'
								alt=''
								loading='lazy'
								className=' cursor-pointer p-[6px] w-8 h-8 bg-[#235DFF26] rounded-[10px]'
								onClick={() => {
									setEditModal(true);
								}}
							/>
						</div>
					</div>

					{loading ? (
						<>
							<div className='container_main  z-999 w-full bg-white dark:bg-[#272829] rounded-bl-[20px] rounded-br-[20px]  h-[75px]  !mb-[14px] p-[15px]'></div>
							<div className='container_main'>
								<PrestigeBanner darkmode={darkmode} guarantee={false} />
							</div>

							<div className='flex  mt-[5px] gap-1 items-center mx-[10px]'>
								<div className='w-full'>
									<Skeleton height={50} style={{ borderRadius: '8px', width: '100%' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
								</div>
								<div className='w-full'>
									<Skeleton height={50} style={{ borderRadius: '8px', width: '100%' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
								</div>
								<div className='w-full'>
									<Skeleton height={50} style={{ borderRadius: '8px', width: '100%' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
								</div>
							</div>
							<div className='mx-[10px]  mt-[12px]'>
								<div className='container_main w-full !px-0 '>
									<Link
										to={'https://t.me/Prestigeagent_bot'}
										target='blank'
										className='bg-white dark:bg-[#272829] cursor-pointer  flex gap-[15px] items-center px-[15px] py-[18px] rounded-xl w-full'
									>
										<img src='/images/chatgpt-user.svg' alt='' className='w-14 h-14' />
										<div className='flex flex-col justify-between gap-1'>
											<div className='text-[#141414] text-[15px] dark:text-white font-medium leading-[18.47px]  '>{t('home.trevel_managers_1')}</div>
											<div className='text-sm leading-[18.47px] dark:text-white text-[#141414]'>{t('home.trevel_managers_2')}</div>
										</div>
									</Link>
								</div>
							</div>
							<div className='mb-[15px] mt-[5px] mx-[10px] gap-[15px] flex flex-col'>
								{[...Array(3)].map((_, index) => (
									<Skeleton key={index} height={300} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
								))}
							</div>
						</>
					) : (
						<>
							<StyleCom className='pt-[75px] flex flex-col gap-3'>
								<GetReviewWidget
									widgetId={
										paramsObj?.town_names?.[0] === 'Фукуок'
											? 'vcD1qbpHzwIKPr7L'
											: paramsObj?.town_names?.[0] === 'Китайские Гавайи - Хайнань ( Китай )'
											? 'bXVAxiJkj6x1fdws'
											: paramsObj?.town_names?.[0] === 'Шарм эль Шейх'
											? 'HFPX5xD7UjHFiRLb'
											: Number(paramsObj?.tour_somo_id) === 248
											? '4WXrqVI8RvFJ5HVG'
											: obj?.widget
									}
								/>
								<div className='container_main '>
									<PrestigeBanner darkmode={darkmode} guarantee={false} />
								</div>

								<div className='flex gap-1 items-center mx-[10px]'>
									<SelectDiv2
										placeholder={t('home.filters')}
										title={t('home.filters')}
										onClick={() => setModalFilter(true)}
										darkmode={darkmode}
										icon={<img src='/images/union.svg' alt='' />}
									/>
									<SelectDiv2
										placeholder='Сортировка'
										title='Сортировка'
										onClick={() => setModalRec(true)}
										darkmode={darkmode}
										icon={
											selectedSort === 'cheapest' ? (
												<img src='/images/huge-icon-2.svg' alt='' />
											) : selectedSort === 'recommended' ? (
												<img src='/images/huge-icon.svg' alt='' />
											) : selectedSort === 'expensive' ? (
												<img src='/images/huge-icon-3.svg' alt='' />
											) : (
												<img src='/images/huge-icon-4.svg' alt='' />
											)
										}
									/>
									<button
										onClick={() => {
											setModalMap(true);
										}}
										className='bg-[#0077FF]  w-full text-sm text-white flex justify-center items-center whitespace-nowrap rounded-lg px-4 py-[18px] h-[50px] gap-1'
									>
										<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
											<path
												d='M1.33325 3.33325L5.99992 1.33325L9.99992 3.33325L14.2019 1.53239C14.3712 1.45987 14.5671 1.53825 14.6397 1.70746C14.6574 1.74895 14.6666 1.79363 14.6666 1.83877V12.6666L9.99992 14.6666L5.99992 12.6666L1.79789 14.4675C1.62868 14.54 1.43273 14.4616 1.36021 14.2924C1.34242 14.2509 1.33325 14.2062 1.33325 14.1611V3.33325ZM9.99992 13.1759V4.78388L9.95672 4.80238L5.99992 2.82397V11.216L6.04309 11.1975L9.99992 13.1759Z'
												fill='white'
											/>
										</svg>
										{t('home.on_the_map')}
									</button>
								</div>

								<div className='mx-[10px]'>
									<div className='container_main w-full !px-0 '>
										<Link
											to={'https://t.me/Prestigeagent_bot'}
											target='blank'
											className='bg-white dark:bg-[#272829] cursor-pointer  flex gap-[15px] items-center px-[15px] py-[18px] rounded-xl w-full'
										>
											<img src='/images/chatgpt-user.svg' alt='' className='w-14 h-14' />
											<div className='flex flex-col gap-1 justify-between'>
												<div className='text-[#141414] text-[15px] dark:text-white font-medium leading-[18.47px]'>{t('home.trevel_managers_1')}</div>
												<div className='text-sm leading-[18.47px] dark:text-white text-[#141414]'>{t('home.trevel_managers_2')}</div>
											</div>
										</Link>
									</div>
								</div>
								{/* <ChooseDistrict /> */}
								{stars?.length > 0 ? (
									<div className='mx-[10px]'>
										<div className='flex gap-2'>
											{stars?.map((item, index) => {
												return (
													<FilterPill
														index={index}
														label={item}
														onRemove={() => {
															removeStars(item);
														}}
													/>
												);
											})}
										</div>
									</div>
								) : null}
								<InfiniteScroll
									dataLength={items.length}
									next={() => fetchData(undefined)}
									hasMore={hasMore}
									className='flex flex-col gap-[15px] mx-[10px]'
									loader={<span className='flex justify-center mt-[15px] h-[50px] '></span>}
									endMessage={<p className='mb-0'></p>}
								>
									{items
										?.filter(
											item =>
												(tags.length === 0 || item.hotel.tags.some(tag => tags.includes(tag.id))) &&
												(stars.length === 0 || stars.includes(+item?.hotel?.star_alt)) &&
												item?.converted_price_number >= minPrice &&
												item?.converted_price_number <= maxPrice
										)
										?.map((item, index) => {
											return <HotelCard item={item} index={index} darkmode={darkmode} />;
										})}
								</InfiniteScroll>
								<div className='flex  justify-center mb-3'>{loading_inf ? <ClipLoader size={24} color={darkmode ? 'white' : 'black'} /> : null}</div>
							</StyleCom>
						</>
					)}
				</div>
				<ModalEdit
					setEditModal={setEditModal}
					editModal={editModal}
					setObjError={setObjError}
					darkmode={darkmode}
					setAnotherObj={setAnotherObj}
					setObj={setObj}
					obj={obj}
					objError={objError}
					handleFind={handleFind}
				/>

				<ModalRecommended
					setModal={setModalRec}
					setItems={setItems}
					selectedSort={selectedSort}
					setSelectedSort={setSelectedSort}
					modal={modalRec}
					list={[
						{ name: 'Рекомендуемые', value: 'recommended', icon: 'huge-icon.svg' },
						{ name: 'Самые дешевые', value: 'cheapest', icon: 'huge-icon-2.svg' },
						{ name: 'Самые дорогие', value: 'expensive', icon: 'huge-icon-3.svg' },
						{ name: 'Лучший рейтинг и низкая цена', value: 'best-rating-low-price', icon: 'huge-icon-4.svg' },
					]}
				/>

				<ModalFilter setPage={setPage} modal={modalFiler} setModal={setModalFilter} filter_option={obj?.filters} />
				{modalMap && (
					<div className='fixed z-9999 inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center'>
						<SearchMap
							items={data_map}
							loading={isLoading}
							isError={isError}
							darkmode={darkmode}
							close={() => {
								setModalMap(false);
							}}
							modalMap={modalMap}
							setModalMap={setModalMap}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default HotelListBySearch;
