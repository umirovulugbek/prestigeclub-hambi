import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import SelectDiv from '../../components/form/SelectDiv';
import InfoSelectingNumber2 from '../../components/InfoSelectingNumber2';
import { Back3 } from '../../components/itemIcon';
import ModalEdit from '../../components/modal/ModalEdit';
import ModalNutrition from '../../components/pages/searchresult/ModalNutrition';
import ModalPopular from '../../components/pages/searchresult/ModalPopular';
import FilterPill from '../../components/ui/FilterPill';
import { month_ru } from '../../utils/constants';
import { getSearchParams } from '../../utils/function';
import Axios from '../../utils/httpsClinet';
import { trackEvent } from '../../utils/mixpanel';
const HotelSelectingNumber = ({ darkmode }) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const paramsObject = getSearchParams();

	const [modalTop, setModalTop] = useState(false);
	const [modalNutrition, setModalNutrition] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loading_page, setLoadingPage] = useState(false);
	const [strParams, setStrParams] = useState('');
	const [items, setItems] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [editModal, setEditModal] = useState(false);
	const [meals, setMeals] = useState([]);
	const [popular, setPopular] = useState([]);
	const [obj, setObj] = useState({
		adultCounter: 2,
		childrenCount: 0,
		nutrition: [],
	});
	const [objError, setObjError] = useState({});
	const [anotherObj, setAnotherObj] = useState({
		town_from_inc: undefined,
		tour_operator_id: undefined,
		state_id: undefined,
		hotel_key: undefined,
	});

	useEffect(() => {
		let searchParams = window.location.search;
		if (searchParams) {
			fetchData(searchParams);
			setStrParams(searchParams);
			getFiltersRoom(searchParams);
		}
	}, []);

	useEffect(() => {
		if (paramsObject?.town_from_inc && paramsObject?.tour_operator_id) {
			setAnotherObj(pV => ({
				...pV,
				town_from_inc: paramsObject?.town_from_inc,
				tour_operator_id: paramsObject?.tour_operator_id,
				state_id: paramsObject?.state_id,
				hotel_key: paramsObject?.hotel_key,
				towns: +paramsObject?.towns,
				tour_somo_id: paramsObject?.tour_somo_id,
			}));
		}
		if (paramsObject?.adult || paramsObject?.childs) {
			setObj(pV => ({
				...pV,
				number_of_days: paramsObject?.nights,
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

	const fetchData = (searchParams, pagee) => {
		setLoadingPage(true);
		if (searchParams) {
			setLoading(true);
			trackEvent('hotel_room_serch_change');
		}

		Axios()
			.get(`/api/v1/somo-travel/tour-prices-room${searchParams === undefined ? strParams : searchParams}&page=${+pagee ? +pagee : page}&per_page=3`)
			.then(r => {
				let data = r?.data?.data?.prices;

				if (searchParams) {
					setItems(data);
				} else {
					setItems(prevItems => [...prevItems, ...data]);
				}

				setPage(prevPage => prevPage + 1);
				if (data?.length === 0) {
					setHasMore(false);
				} else {
					setHasMore(true);
				}
			})
			.catch(e => {
				console.log(e);
			})
			.finally(() => {
				setLoadingPage(false);
				if (searchParams) {
					setLoading(false);
				}
			});
	};

	const getFiltersRoom = searchParams => {
		Axios()
			.get(`api/v1/somo-travel/tour-filters-room${searchParams === undefined ? strParams : searchParams}`)
			.then(res => {
				const data = res?.data?.data;
				setPopular(data?.rooms);
				setMeals(data?.meals);
			})
			.catch(err => {
				console.log(err);
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
				hotel_key: anotherObj?.hotel_key,
				tour_somo_id: anotherObj?.tour_somo_id,
				towns: anotherObj?.towns ? [anotherObj?.towns] : [],
				catclaim: paramsObject?.catclaim,
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
			navigate(`/hotels/detail/hotelselectingnumber/?${searchParamss}`);
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

	const groupedRooms = items
		?.filter(item => +item?.roomKey === +obj?.room_key || !obj?.room_key)
		?.filter(item => (obj?.nutrition?.length > 0 ? obj?.nutrition?.includes(item?.mealKey) : true))
		?.reduce((acc, curr) => {
			if (!acc[curr.room]) {
				acc[curr.room] = [];
			}
			acc[curr.room].push(curr);
			return acc;
		}, {});

	return (
		<div className={`min-h-screen  pb-[15px] ${darkmode ? 'bg-[#141414]' : 'bg-[#EBF0F5]'}`}>
			<div className='container_main !px-0'>
				<swection className={`py-[20px]  fixed container_main z-20 w-full  ${darkmode ? 'bg-[#272829]' : 'bg-white'}`}>
					<div className='flex items-center w-full gap-4 '>
						<Back3
							color={darkmode ? '#fff' : '#141414'}
							onClick={
								() => navigate(-1)
								// navigate(
								// 	`/hotels/detail/?town_from_inc=${paramsObject?.town_from_inc}&tour_operator_id=${paramsObject?.tour_operator_id}&state_id=${paramsObject?.state_id}&checkin=${paramsObject?.checkin}&nights=${paramsObject?.nights}&adult=${paramsObject?.adult}&childs=${paramsObject?.childs}&tour_somo_id=${paramsObject?.tour_somo_id}&towns[]=${paramsObject?.towns}&id=${paramsObject?.id}&hotel_key=${paramsObject?.hotel_key}`
								// )
							}
							className=' cursor-pointer'
						/>

						<div className='bg-[#235DFF26] h-[55px] flex justify-center w-full rounded-[8px] px-[15px] py-[10px]    items-center'>
							<div className='text-[#141414]  dark:text-white'>
								{new Date(obj?.departure_date).getDate() + ' '} {month_ru[new Date(obj?.departure_date).getMonth()]}, {paramsObject?.nights} {t('home.nights')},{' '}
								{+obj?.number_of_tourists} {t('home.turist')}
							</div>
						</div>
						<img
							onClick={() => {
								setEditModal(true);
							}}
							src='/images/edit.svg'
							alt=''
							className=' cursor-pointer mr-3'
						/>
					</div>
				</swection>
			</div>
			<div className='container_main !px-0'>
				{loading ? (
					<div>
						<div className='pt-[95px] bg-[#EBF0F5] dark:bg-[#141414] '>
							<div className='overflow-x-scroll  w-full  '>
								<div className='inline-flex items-center whitespace-nowrap gap-2 px-[15px] my-[10px] w-full'>
									<div className='w-full'>
										<Skeleton height={50} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
									</div>
									<div className='w-full'>
										<Skeleton height={50} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
									</div>
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-[15px]'>
							{[...Array(3)].map((_, index) => (
								<div key={index} className='w-full'>
									<Skeleton height={200} style={{ borderRadius: '15px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
								</div>
							))}
						</div>
					</div>
				) : (
					<>
						<div className='pt-[95px] bg-[#EBF0F5] dark:bg-[#141414]  '>
							<div className='overflow-x-scroll  w-full '>
								<div className='inline-flex items-center whitespace-nowrap gap-2 px-[15px] my-[15px] w-full'>
									<SelectDiv
										darkmode={darkmode}
										placeholder={t('home.number')}
										title={t('home.number')}
										onClick={() => {
											trackEvent('hotel_room_filtr');
											setModalTop(true);
										}}
									/>
									<SelectDiv
										darkmode={darkmode}
										placeholder={t('home.nutrition2')}
										title={t('home.nutrition2')}
										onClick={() => {
											trackEvent('hotel_room_nutr');
											setModalNutrition(true);
										}}
									/>
								</div>
							</div>

							{obj?.nutrition?.length > 0 || obj?.room_key ? (
								<div className='mx-[15px] mb-3 '>
									<div className='flex gap-2 overflow-x-scroll'>
										{obj?.nutrition?.map((item, index) => {
											return (
												<FilterPill
													index={index}
													label={meals?.find(item_meals => item_meals?.key === item)?.name}
													onRemove={() => {
														setObj(prevObj => ({
															...prevObj,
															nutrition: prevObj.nutrition.filter(item_obj => item_obj !== item),
														}));
													}}
												/>
											);
										})}
										{obj?.room_key ? (
											<FilterPill
												label={popular?.find(item_room => item_room?.key === obj?.room_key)?.name}
												onRemove={() => {
													setObj(prevObj => {
														const newObj = { ...prevObj };
														delete newObj.room_key;
														return newObj;
													});
												}}
											/>
										) : null}
									</div>
								</div>
							) : null}
						</div>

						<div className='flex flex-col pb-3  min-h-[85vh] rounded-[15px]'>
							{items?.length > 0 ? (
								<InfiniteScroll
									dataLength={items.length}
									next={() => fetchData(undefined)}
									hasMore={hasMore}
									// loader={
									// 	<span className='flex justify-center mt-[15px] h-[50px] '>
									// 		<ClipLoader color={darkmode ? '#fff' : '#000'} size={20} aria-label='Loading Spinner' data-testid='loader' />
									// 	</span>
									// }
									endMessage={<p className='mb-0'></p>}
								>
									{Object.entries(groupedRooms).map(([room, items], index) => {
										return <InfoSelectingNumber2 index={index} room={room} items={items} darkmode={darkmode} />;
									})}
								</InfiniteScroll>
							) : (
								<div className='container_main  relative flex  justify-center items-center w-full flex-col gap-[35px] p-6 '>
									{trackEvent('err_tour_number')}
									<div>
										<img src='/images/soon-towns.svg' alt='' className='h-[144px]' />
									</div>
									<div className='flex flex-col gap-[10px] text-center text-[#141414] text-lg'>
										<h4 className=' font-semibold dark:text-white'>Похоже, этот тур уже распродан!</h4>
										<p className='font-medium dark:text-white text-lg leading-[20px]'>
											К сожалению, места закончились. Но не расстраивайтесь! У нас есть много других чудесных предложений, которые только и ждут, чтобы вас
											удивить!
										</p>
									</div>
									<button
										onClick={() => {
											navigate('/');
										}}
										className='cursor-pointer text-base bg-[#235DFF] rounded-xl p-4 w-full text-center text-white'
									>
										Вернуться к поиску
									</button>
								</div>
							)}
						</div>
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

			<ModalPopular fetchData={fetchData} setModal={setModalTop} modal={modalTop} darkmode={darkmode} list={popular} setObj={setObj} obj={obj} setPage={setPage} />
			<ModalNutrition fetchData={fetchData} setModal={setModalNutrition} modal={modalNutrition} darkmode={darkmode} list={meals} setObj={setObj} obj={obj} setPage={setPage} />
		</div>
	);
};

export default HotelSelectingNumber;
