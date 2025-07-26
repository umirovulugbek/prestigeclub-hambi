import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';
import InputDiv from '../components/form/InputDiv';
import LastMinuteTours from '../components/main/LastMinuteTours';
import Storiess from '../components/main/Stories';
import MobileTab from '../components/mobiletab';
import GraphicTour from '../components/pages/findtour/GraphicTour';
import HistorySearch from '../components/pages/findtour/HistorySearch';
import ModalDeparture from '../components/pages/findtour/ModalDeparture';
import ModalDepartureDate from '../components/pages/findtour/ModalDepartureDate';
import ModalNumberOfDays from '../components/pages/findtour/ModalNumberOfDays';
import ModalNumberOfTouristsRixos from '../components/pages/findtour/ModalNumberOfTouristRixos';
import ModalNumberOfTourists from '../components/pages/findtour/ModalNumberOfTourists';
import ModalWhere from '../components/pages/findtour/ModalWhere';
import ButtonMain from '../components/ui/ButtonMain';
import NavigationOne from '../components/ui/NavigationOne';
import PalmIcon from '../svg/PalmIcon';
import { getSearchParams } from '../utils/function';
import Axios from '../utils/httpsClinet';
import { trackEvent } from '../utils/mixpanel';
const FindTour = ({ darkmode }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showCity, setShowCity] = useState(false);
	const paramsObject = getSearchParams();
	const { t, i18n } = useTranslation();
	const [townFrom, setTownFrom] = useState([]);
	const [townStates, setTownStates] = useState([]);
	const [towns, setTowns] = useState([]);
	const [checkedItems, setCheckedItems] = useState([]);
	const [departureDateList, setDepartureDateList] = useState([]);
	const [numberOfDaysList, setNumberOfDaysList] = useState([]);
	const [date, setDate] = useState(new Date());
	const [ages, setAges] = useState([]);
	const [ages2, setAges2] = useState([]);
	const [addChild, setAddChild] = useState(false);
	const [departure, Setdeparture] = useState({});

	const [obj, setObj] = useState({
		departure: 'Ташкент',
		where: '',
		departure_date: '',
		number_of_tourists: 2,
		adultCounter: 2,
		childrenCount: 0,
		adultCounterRixos: 2,
		childrenCountRixos: 0,
	});
	const [anotherObj, setAnotherObj] = useState({
		town_from_inc: undefined,
		tour_operator_id: undefined,
		state_id: undefined,
	});
	const [objError, setObjError] = useState({
		departure: false,
		where: false,
		departure_date: false,
		number_of_tourists: false,
		number_of_days: false,
	});

	const [modalDeparture, setModalDeparture] = useState(false);
	const [modalWhere, setModalWhere] = useState(false);
	const [modalDepartureDate, setModalDepartureDate] = useState(false);
	const [modalNumberOfTourists, setModalNumberOfTourists] = useState(false);
	const [modalNumberOfTourists2, setModalNumberOfTourists2] = useState(false);
	const [modalNumberOfDays, setModalNumberOfDays] = useState(false);
	const [departureDateObjParams, setDepartureDateObjParams] = useState({
		somo_id: undefined,
		tour_operator_id: undefined,
		state_id: undefined,
		checkin: undefined,
	});

	useEffect(() => {
		const imageUrls = [
			'/images/istanbul-stories-1.jpg',
			'/images/istanbul-stories-2-1.png',
			'/images/istanbul-stories-2-2.png',
			'/images/istanbul-stories-2-3.png',
			'/images/istanbul-stories-2-4.png',
			'/images/istanbul-stories-3-1.png',
			'/images/istanbul-stories-3-2.jpg',
			'/images/istanbul-stories-3-3.jpg',
			'/images/istanbul-stories-3-4.jpg',
			'/images/istanbul-stories-4-1.jpg',
			'/images/istanbul-stories-4-2.jpg',
			'/images/istanbul-stories-4-3.png',
			'/images/istanbul-stories-4-4.jpg',
			'/images/trabzon-stories-1.png',
			'/images/trabzon-stories-2.jpg',
			'/images/trabzon-stories-3.jpg',
			'/images/trabzon-stories-4.jpg',
			'/images/trabzon-stories-5.jpg',
			'/images/trabzon-stories-6.jpg',
			'/images/trabzon-stories-7.jpg',
			// '/images/danang-stories-4-1.jpg',
			// '/images/danang-stories-4-2.jpg',
			// '/images/danang-stories-4-3.jpg',
			// '/images/danang-stories-4-4.jpg',
			// '/images/danang-stories-3-1.png',
			// '/images/danang-stories-3-2.jpg',
			// '/images/danang-stories-3-3.png',
			// '/images/danang-stories-3-4.png',
			// '/images/danang-stories-2-1.jpg',
			// '/images/danang-stories-2-2.jpg',
			// '/images/danang-stories-2-3.png',
			// '/images/danang-stories-2-4.jpg',
			// '/images/danang-stories-1.jpg',
		];

		imageUrls.forEach(url => {
			const img = new Image();
			img.src = url;
		});
	}, []);

	useEffect(() => {
		if (paramsObject?.town_from_inc) {
			getTownFrom(Number(paramsObject?.town_from_inc));
		} else {
			getTownFrom();
		}
		if (paramsObject?.tour_operator_id) {
			getTownStates(
				Number(paramsObject?.town_from_inc) ? Number(paramsObject?.town_from_inc) : 'Ташкент',
				// Number(paramsObject?.tour_operator_id) ? Number(paramsObject?.tour_operator_id) : 1,
				1,
				Number(paramsObject?.state_id) ? Number(paramsObject?.state_id) : 1853
			);
		} else {
			getTownStates(
				Number(paramsObject?.state_id) ? Number(paramsObject?.state_id) : 1853,
				Number(paramsObject?.tour_operator_id) ? Number(paramsObject?.tour_operator_id) : 1,
				Number(paramsObject?.town_from_inc) ? Number(paramsObject?.town_from_inc) : 'Ташкент'
			);
		}

		// if (paramsObject?.nights) {
		// 	setObj(pV => ({
		// 		...pV,
		// 		number_of_days: Number(paramsObject?.nights),
		// 	}));
		// }
		if (paramsObject?.towns?.length > 0) {
			getTowns(Number(paramsObject?.town_from_inc), Number(paramsObject?.tour_operator_id), Number(paramsObject?.state_id), paramsObject?.towns);
			getDepartureDate(Number(paramsObject?.tour_somo_id), Number(paramsObject?.tour_operator_id), paramsObject?.checkin);

			if (paramsObject?.checkin) {
				getNumberOfDays(Number(paramsObject?.tour_somo_id), Number(paramsObject?.tour_operator_id), paramsObject?.checkin, Number(paramsObject?.nights));
			}
		}
		if (paramsObject?.adult || paramsObject?.childs) {
			setObj(pV => ({
				...pV,
				number_of_tourists: Number(paramsObject?.adult === undefined ? 2 : paramsObject?.adult) + Number(paramsObject?.childs === undefined ? 0 : paramsObject?.childs),
				childrenCount: Number(paramsObject?.childs === undefined ? 0 : paramsObject?.childs),
				adultCounter: Number(paramsObject?.adult === undefined ? 2 : paramsObject?.adult),
			}));

			if (paramsObject?.childs != undefined) {
				setAddChild(true);
				setAges(paramsObject?.ages?.length > 0 || paramsObject?.ages != undefined ? paramsObject?.ages : []);
			}
		}

		getTourUzb();
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	const handleFind = () => {
		let t = true,
			error = {};

		if (!obj.where && checkedItems?.length === 0) {
			t = false;
			error = { ...error, where: true };
		}
		if (!obj.departure_date) {
			t = false;
			error = { ...error, departure_date: true };
		}
		if (!obj.number_of_tourists) {
			t = false;
			error = { ...error, number_of_tourists: true };
		}
		if (!obj.number_of_days) {
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
				towns: checkedItems.map(item => item.somo_id),
				adult: obj?.adultCounter,
				childs: obj?.childrenCount,
				tour_somo_id: departureDateObjParams?.tour_somo_id,
				ages: ages.map(item => item),
			};

			const formatDate = dateStr => {
				const [year, month, day] = dateStr.split('-');
				return `${year}${month}${day}`;
			};

			const searchParams = Object.keys(filter)
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

			window.history.replaceState(null, '', '?' + searchParams);

			trackEvent('search_button');
			navigate(`/hotels/tour-info?${searchParams}`);
		} else {
			setObjError(error);
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	};

	const getTourUzb = () => {
		Axios()
			.get(`/api/uzb-tours/tours-list`)
			.then(r => {
				let data = r?.data?.data;
				setObj(pV => ({
					...pV,
					tour_uzb: data,
				}));
			});
	};
	const getTownFrom = town_from_inc => {
		dispatch({ type: 'SET_LOADING', payload: true });
		Axios()
			.get(`api/v1/search/town-from`)
			.then(r => {
				let data = r?.data?.data;

				let findObj = data?.find(el => el?.somo_id === town_from_inc);
				if (town_from_inc != undefined) {
					setObj(pV => ({
						...pV,
						departure: findObj?.name,
					}));
				}
				setTownFrom(data);
			})
			.catch(e => {
				console.log(e);
			})
			.finally(() => {
				dispatch({ type: 'SET_LOADING', payload: false });
			});
	};

	const getTownStates = (somo_id, tour_operator_id, state_id) => {
		dispatch({ type: 'SET_LOADING', payload: true });

		Axios()
			.get(`api/v1/search/states?town_from_inc=${somo_id}&tour_operator_id=${tour_operator_id}`)
			.then(r => {
				let data = r?.data?.data;
				let findObj = data?.find(el => el?.somo_id === state_id);
				if (state_id !== undefined) {
					setObj(pV => ({
						...pV,
						where: findObj?.name,
					}));
				}

				setTownStates(data);
			})
			.catch(e => {
				console.log(e);
			})
			.finally(() => {
				dispatch({ type: 'SET_LOADING', payload: false });
			});
	};

	const getTowns = (somo_id, tour_operator_id, state_id, town) => {
		dispatch({ type: 'SET_LOADING_TOWNS', payload: true });
		Axios()
			.get(`api/v1/search/towns?town_from_inc=${somo_id}&tour_operator_id=${tour_operator_id}&state_id=${state_id}`)
			.then(r => {
				let data = r?.data?.data;
				let newD = [];
				data?.forEach(el => {
					newD = [
						...newD,
						{
							label: el?.name,
							value: el?.id,
							state_id: el?.state_id,
							somo_id: el?.somo_id,
							tour_operator_id: el?.tour_operator_id,
							town_from_id: el?.town_from_id,
							image: el?.image_thumb,
							description: i18n?.language === 'uz' ? el?.description_uz : i18n?.language === 'ru' ? el?.description_ru : el?.description_en,
						},
					];
				});
				setAnotherObj(pV => ({
					...pV,
					town_from_inc: somo_id,
					tour_operator_id: tour_operator_id,
					state_id: state_id,
				}));
				setTowns(newD);

				if (town != undefined) {
					const filteredData = data.filter(item => town.includes(item.somo_id));
					const transformedData = filteredData.map(item => ({
						label: item.name,
						value: item.id,
						state_id: item.state_id,
						somo_id: item.somo_id,
						tour_operator_id: item.tour_operator_id,
						town_from_id: item.town_from_id,
						description: i18n?.language === 'uz' ? item?.description_uz : i18n?.language === 'ru' ? item?.description_ru : item?.description_en,
					}));
					setCheckedItems(transformedData);
				}
			})
			.catch(e => {
				console.log(e);
			})
			.finally(() => {
				dispatch({ type: 'SET_LOADING_TOWNS', payload: false });
			});
	};

	const getDepartureDate = (tour_somo_id, tour_operator_id, checkin) => {
		dispatch({ type: 'SET_LOADING', payload: true });
		Axios()
			.get(`api/v1/somo-travel/tour-checkins?&tour_operator_id=${tour_operator_id}&tour_somo_id=${tour_somo_id}&adult=${obj?.adultCounter}&child=${obj?.childrenCount}`)
			.then(r => {
				let data = r?.data?.data?.items;

				setDepartureDateObjParams({
					tour_somo_id: tour_somo_id,
					tour_operator_id: tour_operator_id,
				});

				const formatData = data?.map(item => {
					return {
						...item,
						start: `${item?.checkin?.slice(0, 4)}-${item?.checkin?.slice(4, 6)}-${item?.checkin?.slice(6, 8)}`,
					};
				});

				let findObj = data?.find(el => el?.checkin === checkin);
				if (checkin !== undefined) {
					setObj(pV => ({
						...pV,
						departure_date: `${findObj?.checkin.slice(0, 4)}-${findObj?.checkin.slice(4, 6)}-${findObj?.checkin.slice(6, 8)}`,
					}));
					setDate(new Date(`${findObj?.checkin.slice(0, 4)}-${findObj?.checkin.slice(4, 6)}-${findObj?.checkin.slice(6, 8)}`));
				}
				setDepartureDateList(formatData);
			})
			.catch(e => {
				console.log(e);
			})
			.finally(() => {
				dispatch({ type: 'SET_LOADING', payload: false });
			});
	};

	const getNumberOfDays = (tour_somo_id, tour_operator_id, checkin, nights) => {
		dispatch({ type: 'SET_LOADING', payload: true });
		Axios()
			.get(`api/v1/somo-travel/tour-nights?&tour_operator_id=${tour_operator_id}&checkin=${checkin}&tour_somo_id=${tour_somo_id}`)
			.then(r => {
				let data = r?.data?.data?.places?.place;
				let findObj;

				if (typeof data === 'string') {
					findObj = data;
					setNumberOfDaysList([data]);
				} else if (Array.isArray(data)) {
					findObj = data?.find(el => Number(el) === Number(nights));
					setNumberOfDaysList(data);
				}

				if (nights != undefined) {
					setObj(pV => ({
						...pV,
						number_of_days: findObj,
					}));
				}
			})
			.catch(e => {
				console.log(e);
			})
			.finally(() => {
				dispatch({ type: 'SET_LOADING', payload: false });
			});
	};

	const handleClick = () => {
		if (typeof window.ym !== 'undefined') {
			window.ym(98339232, 'reachGoal', 'button_click');
		}
	};
	return (
		<div className={`min-h-screen pb-[75px] bg-[#EBF0F5]   dark:bg-[#141414]`}>
			<div className=''>
				<NavigationOne linkClose={true} text={t('home.title')} darkmode={darkmode} />
			</div>
			<section className='pb-[50px]'>
				<div className='container_main  '>
					<div className=' pt-[80px]'>
						<Storiess />
						<div className='relative z-[1]'>
							<div className={`rounded-xl px-[15px]  py-[30px]   bg-white  dark:bg-[#272829]`}>
								<div className='flex gap-[10px]  justify-center  text-sm items-center'>
									<div className=' dark:text-white'>{t('home.departure_city')}</div>
									<div className='text-[#0077FF] text-base cursor-pointer' onClick={() => setModalDeparture(true)}>
										{obj?.departure}
									</div>
								</div>
								<div className='grid grid-cols-2 gap-[15px]'>
									<div className='col-span-2 relative z-0'></div>
									<div className='col-span-2 relative z-0'>
										<InputDiv
											placeholder={t('home.where')}
											title={t('home.where')}
											error={objError?.where ? true : false}
											value={obj?.where}
											onClick={() => setModalWhere(true)}
											darkmode={darkmode}
											checkedItems={checkedItems}
											icon={<PalmIcon />}
										/>
									</div>
									{obj?.number_of_tourists && obj?.where ? (
										<div className='col-span-2'>
											<InputDiv
												placeholder={t('home.number_of_tourists')}
												title={t('home.number_of_tourists')}
												error={objError?.number_of_tourists ? true : false}
												value={obj?.number_of_tourists}
												onClick={() => setModalNumberOfTourists(true)}
												darkmode={darkmode}
												className={obj?.where ? '' : ' opacity-35 '}
												icon={<img src='/images/grouppeople.svg' />}
											/>
										</div>
									) : null}

									{obj?.departure_date ? (
										<div className='col-span-1'>
											<InputDiv
												placeholder={t('home.departure_date')}
												title={t('home.departure_date')}
												error={objError?.departure_date ? true : false}
												value={obj?.departure_date}
												onClick={() => setModalDepartureDate(true)}
												darkmode={darkmode}
												className={obj?.where || obj?.departure_date ? '' : ' opacity-35 '}
												icon={<img src='/images/calendar.svg' />}
											/>
										</div>
									) : null}
									{obj?.departure_date && obj?.number_of_days ? (
										<div className='col-span-1'>
											<InputDiv
												placeholder={t('home.number_of_days')}
												title={t('home.number_of_days')}
												error={objError?.number_of_days ? true : false}
												value={obj?.number_of_days}
												onClick={() => setModalNumberOfDays(true)}
												darkmode={darkmode}
												className={obj?.departure_date || obj?.number_of_days ? '' : ' opacity-35 '}
												icon={<img src='/images/calendarday.svg' className='w-[20px] h-[20px] mt-[2px]' />}
											/>
										</div>
									) : null}

									<div className='col-span-2'>
										{obj?.where && obj?.number_of_tourists && obj?.departure_date && obj?.number_of_days ? (
											<ButtonMain
												onClick={() => {
													handleFind();
													handleClick();
												}}
												type='button'
												className='w-full'
												text={t('home.find')}
												type_color='t_blue'
											/>
										) : (
											''
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<LastMinuteTours />
				<GraphicTour
					Setdeparture={Setdeparture}
					getTowns={getTowns}
					darkmode={darkmode}
					setShowCity={setShowCity}
					showCity={showCity}
					setModalWhere={setModalWhere}
					setObj={setObj}
					townStates={townStates}
				/>
				<HistorySearch darkmode={darkmode} />
			</section>
			<MobileTab darkmode={darkmode} />
			<ModalDeparture
				modalDeparture={modalDeparture}
				setModalDeparture={setModalDeparture}
				list={townFrom}
				darkmode={darkmode}
				setObj={setObj}
				obj={obj}
				objError={objError}
				setObjError={setObjError}
				getTownStates={getTownStates}
				setTownStates={setTownStates}
				setTowns={setTowns}
				setCheckedItems={setCheckedItems}
				setDepartureDateList={setDepartureDateList}
				setNumberOfDaysList={setNumberOfDaysList}
				setModalWhere={setModalWhere}
			/>
			<ModalWhere
				darkmode={darkmode}
				setModalNumberOfTourists={setModalNumberOfTourists}
				modalWhere={modalWhere}
				setModalWhere={setModalWhere}
				list={townStates}
				setObj={setObj}
				setShowCity={setShowCity}
				showCity={showCity}
				obj={obj}
				objError={objError}
				setObjError={setObjError}
				towns={towns}
				Setdeparture={Setdeparture}
				departure={departure}
				checkedItems={checkedItems}
				setCheckedItems={setCheckedItems}
				getTowns={getTowns}
				getDepartureDate={getDepartureDate}
				setDepartureDateList={setDepartureDateList}
				setNumberOfDaysList={setNumberOfDaysList}
				setModalDepartureDate={setModalDepartureDate}
			/>
			<ModalDepartureDate
				darkmode={darkmode}
				modalDepartureDate={modalDepartureDate}
				setModalDepartureDate={setModalDepartureDate}
				setObj={setObj}
				setModalNumberOfDays={setModalNumberOfDays}
				obj={obj}
				objError={objError}
				getNumberOfDays={getNumberOfDays}
				setObjError={setObjError}
				departureDateList={departureDateList}
				date={date}
				setDate={setDate}
				departureDateObjParams={departureDateObjParams}
				setModalNumberOfTourists={setModalNumberOfTourists}
			/>
			<ModalNumberOfTourists
				darkmode={darkmode}
				modalNumberOfTourists={modalNumberOfTourists}
				setModalNumberOfTourists={setModalNumberOfTourists}
				setObj={setObj}
				obj={obj}
				setModalDepartureDate={setModalDepartureDate}
				objError={objError}
				setObjError={setObjError}
				ages={ages}
				setAges={setAges}
				addChild={addChild}
				setAddChild={setAddChild}
				setModalNumberOfDays={setModalNumberOfDays}
			/>
			<ModalNumberOfTouristsRixos
				setObj={setObj}
				obj={obj}
				darkmode={darkmode}
				modalNumberOfTourists={modalNumberOfTourists2}
				setModalNumberOfTourists={setModalNumberOfTourists2}
				ages={ages2}
				setAges={setAges2}
			/>
			<ModalNumberOfDays
				darkmode={darkmode}
				modalNumberOfDays={modalNumberOfDays}
				setModalNumberOfDays={setModalNumberOfDays}
				list={numberOfDaysList}
				setObj={setObj}
				obj={obj}
				objError={objError}
				setObjError={setObjError}
			/>
			<YMInitializer accounts={[98339232]} options={{ webvisor: true }} version='2' />
		</div>
	);
};

export default FindTour;
