import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSearchParams } from '../../utils/function';
import Axios from '../../utils/httpsClinet';
import InputDiv2 from '../form/InputDiv2';
import { CloseIcon } from '../homeS3Icon';
import ModalDepartureDate from '../pages/findtour/ModalDepartureDate';
import ModalNumberOfDays from '../pages/findtour/ModalNumberOfDays';
import ModalNumberOfTourists from '../pages/findtour/ModalNumberOfTourists';
import ButtonMain from '../ui/ButtonMain';
import ModalBottom from './ModalBottom';

const ModalEdit = ({ setEditModal, editModal, setObjError, darkmode, obj, objError, handleFind, setAnotherObj, setObj }) => {
	const { t } = useTranslation();
	const [modalDepartureDate, setModalDepartureDate] = useState(false);
	const [numberOfDaysList, setNumberOfDaysList] = useState([]);
	const [departureDateList, setDepartureDateList] = useState([]);
	const [date, setDate] = useState(new Date());
	const [departureDateObjParams, setDepartureDateObjParams] = useState({});
	const [modalNumberOfDays, setModalNumberOfDays] = useState(false);
	const [modalNumberOfTourists, setModalNumberOfTourists] = useState(false);
	const [addChild, setAddChild] = useState(false);
	const [ages, setAges] = useState([]);

	const paramsObject = getSearchParams();

	useEffect(() => {
		if (paramsObject?.checkin) {
			getNumberOfDays(Number(paramsObject?.tour_somo_id), Number(paramsObject?.tour_operator_id), paramsObject?.checkin, Number(paramsObject?.nights));
		}

		if (paramsObject?.town_from_inc && paramsObject?.tour_operator_id) {
			setAnotherObj(pV => ({
				...pV,
				town_from_inc: paramsObject?.town_from_inc,
				tour_operator_id: paramsObject?.tour_operator_id,
				state_id: paramsObject?.state_id,
				hotel_key: paramsObject?.hotel_key,
			}));
			getDepartureDate(Number(paramsObject?.tour_somo_id), Number(paramsObject?.tour_operator_id), paramsObject?.checkin);
		}

		if (paramsObject?.adult || paramsObject?.childs) {
			if (paramsObject?.childs != undefined) {
				setAddChild(true);
				setAges(paramsObject?.ages?.length > 0 || paramsObject?.ages != undefined ? paramsObject?.ages : []);
			}
		}
	}, []);

	const getNumberOfDays = (tour_somo_id, tour_operator_id, checkin, nights) => {
		Axios()
			.get(`api/v1/somo-travel/tour-nights?tour_somo_id=${tour_somo_id}&tour_operator_id=${tour_operator_id}&checkin=${checkin}`)
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
				// setLoading(false);
			});
	};

	const getDepartureDate = (tour_somo_id, tour_operator_id, checkin) => {
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
			.finally(() => {});
	};

	return (
		<>
			<ModalBottom
				close={setEditModal}
				setModal={setEditModal}
				modal={editModal}
				btnShow={false}
				darkmode={darkmode}
				content={
					<>
						<div className='w-full'>
							<div className='flex items-center justify-between w-full gap-3'>
								<p className='font-medium text-xl dark:text-white'>{t('home.fly_day')} ?</p>
								<CloseIcon fill={darkmode ? '#fff' : '#141414'} className='cursor-pointer' onClick={() => setEditModal(false)} />
							</div>
							<div className='mt-[20px] mb-[20px]'>
								<div className='grid grid-cols-2 gap-6 w-full'>
									<div className='col-span-2'>
										<InputDiv2
											placeholder={t('home.select')}
											title={t('home.departure_date')}
											error={objError?.departure_date ? true : false}
											value={obj?.departure_date}
											onClick={() => setModalDepartureDate(true)}
											darkmode={darkmode}
											icon={<img src='/images/calendar.svg' />}
										/>
									</div>
									<div className='col-span-1'>
										<InputDiv2
											placeholder={t('home.select')}
											title={t('home.number_of_days')}
											error={objError?.number_of_days ? true : false}
											value={obj?.number_of_days}
											onClick={() => setModalNumberOfDays(true)}
											darkmode={darkmode}
											icon={<img src='/images/calendarday.svg' className='w-[20px] h-[20px] mt-[2px]' />}
										/>
									</div>
									<div className='col-span-1'>
										<InputDiv2
											placeholder={t('home.select')}
											title={t('home.number_of_tourists')}
											error={objError?.number_of_tourists ? true : false}
											value={obj?.number_of_tourists}
											onClick={() => setModalNumberOfTourists(true)}
											darkmode={darkmode}
											icon={<img src='/images/grouppeople.svg' />}
										/>
									</div>

									<div className='col-span-2'>
										<ButtonMain onClick={handleFind} type='button' className='w-full' text={t('home.select_numbers')} type_color='t_blue' />
									</div>
								</div>
							</div>
						</div>
					</>
				}
			/>
			<ModalDepartureDate
				getNumberOfDays={getNumberOfDays}
				modalDepartureDate={modalDepartureDate}
				setModalDepartureDate={setModalDepartureDate}
				setObj={setObj}
				obj={obj}
				darkmode={darkmode}
				objError={objError}
				setObjError={setObjError}
				departureDateList={departureDateList}
				date={date}
				setDate={setDate}
				departureDateObjParams={departureDateObjParams}
				getDepartureDate={getDepartureDate}
				setModalNumberOfTourists={setModalNumberOfTourists}
				setModalNumberOfDays={setModalNumberOfDays}
			/>
			<ModalNumberOfTourists
				modalNumberOfTourists={modalNumberOfTourists}
				setModalNumberOfTourists={setModalNumberOfTourists}
				setObj={setObj}
				obj={obj}
				objError={objError}
				setObjError={setObjError}
				ages={ages}
				setAges={setAges}
				addChild={addChild}
				setAddChild={setAddChild}
				darkmode={darkmode}
				setModalNumberOfDays={setModalNumberOfDays}
			/>
			<ModalNumberOfDays
				modalNumberOfDays={modalNumberOfDays}
				setModalNumberOfDays={setModalNumberOfDays}
				list={numberOfDaysList}
				setObj={setObj}
				obj={obj}
				objError={objError}
				darkmode={darkmode}
				setObjError={setObjError}
			/>
		</>
	);
};

export default ModalEdit;
