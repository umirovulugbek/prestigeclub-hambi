import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';
import { CalendarStyle } from '../../../style/Styled';
import { trackEvent } from '../../../utils/mixpanel';
import ModalBottom from '../../modal/ModalBottom';

const ModalDepartureDate = ({
	modalDepartureDate,
	setModalDepartureDate,
	setObj,
	setObjError,
	departureDateList,
	date = new Date(),
	setDate,
	departureDateObjParams,
	darkmode,
	getNumberOfDays,
	setModalNumberOfDays,
}) => {
	const { t } = useTranslation();
	const { tour_somo_id, tour_operator_id } = departureDateObjParams;

	const getInitialActiveStartDate = () => {
		if (departureDateList.length > 0) {
			const [year, month] = departureDateList[0]?.checkin_date?.split('-').map(Number);
			return new Date(year, month - 1);
		}
		return date;
	};

	const [activeStartDate, setActiveStartDate] = useState(getInitialActiveStartDate());
	useEffect(() => {
		if (departureDateList.length > 0) {
			setActiveStartDate(getInitialActiveStartDate());
		}
	}, [departureDateList]);
	const onChange = newDate => {
		setDate(newDate);

		const dd = new Date(newDate);
		const year = dd.getFullYear();
		const month = String(dd.getMonth() + 1).padStart(2, '0');
		const day = String(dd.getDate()).padStart(2, '0');

		setObj(prev => ({
			...prev,
			departure_date: `${year}-${month}-${day}`,
		}));
		trackEvent('check_in', { check_in: `${year}-${month}-${day}` });

		setObjError(prev => ({
			...prev,
			departure_date: false,
		}));

		const searchParams = new URLSearchParams(window.location.search);

		const paramsObject = {};

		for (const [key, value] of searchParams.entries()) {
			if (key.endsWith('[]')) {
				const baseKey = key.slice(0, -2);
				if (!paramsObject[baseKey]) {
					paramsObject[baseKey] = [];
				}
				paramsObject[baseKey].push(isNaN(value) ? value : Number(value));
			} else if (key === 'checkin') {
				paramsObject[key] = value.replace(/-/g, '');
			} else {
				paramsObject[key] = isNaN(value) ? value : Number(value);
			}
		}

		if (tour_somo_id !== undefined && tour_operator_id !== undefined) {
			getNumberOfDays(tour_somo_id, tour_operator_id, `${year}${month}${day}`);
		}

		setModalDepartureDate(false);
		setModalNumberOfDays(true);
	};

	const tileDisabled = ({ date, view }) => {
		if (view === 'month') {
			if (tour_somo_id === 7 && date.getMonth() >= 3 && date.getDay() === 1) return true;
			return !departureDateList.some(allowedDate => {
				const [year, month, day] = allowedDate?.start.split('-').map(Number);
				return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day && allowedDate?.valid_enum !== 'Empty';
			});
		}
		return false;
	};

	const tileClassName = ({ date, view }) => {
		if (view === 'month') {
			const foundDate = departureDateList.find(allowedDate => {
				const [year, month, day] = allowedDate?.start.split('-').map(Number);
				return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
			});

			if (!foundDate) return '';

			const colorMap = {
				Empty: 'empty-date tile-date',
				'Direct charter available': 'direct-charter tile-date',
				'Limited direct charter': 'limited-charter tile-date',
			};

			return colorMap[foundDate.valid_enum] || '';
		}
	};

	return (
		<div className='w-full'>
			<ModalBottom
				close={() => setModalDepartureDate(false)}
				modal={modalDepartureDate}
				heightModal='min-h-[25vh] max-h-[80vh]'
				btnShow={false}
				translateY='translate-y-[80vh]'
				clickFunction={null}
				navigationLabel={null}
				renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
					<div className='flex items-center justify-between p-2'>
						{/* Oldingi oy tugmasi */}
						<button onClick={decreaseMonth} className='p-2'>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6 text-gray-600'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
							</svg>
						</button>

						{/* Oyning nomi va yili */}
						<span className='text-lg font-medium'>{date.toLocaleDateString('uz-UZ', { month: 'long', year: 'numeric' })}</span>

						{/* Keyingi oy tugmasi */}
						<button onClick={increaseMonth} className='p-2'>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6 text-gray-600'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
							</svg>
						</button>
					</div>
				)}
				content={
					<div className='w-full'>
						<div className='flex items-center w-full gap-3'>
							<p className='font-medium text-xl dark:text-white'>{t('home.fly_day')} ?</p>
						</div>
						<div className=' pt-[20px]  w-full pb-[25px]  '>
							<div className='dark:bg-[#272829] bg-white flex flex-col rounded-[13.1px]  gap-4 justify-center'>
								<CalendarStyle theme={darkmode ? 'dark' : 'light'}>
									<Calendar
										onChange={onChange}
										value={date}
										tileClassName={tileClassName}
										tileDisabled={tileDisabled}
										activeStartDate={activeStartDate} // Faol oy
										onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)} // Aktiv oyning o'zgarishini kuzatish
									/>
								</CalendarStyle>
								<img src='/images/linedashed-calendar.svg' className='w-full object-cover h-[0.5px] px-[5px]' alt='' />
								<div className='text-white dark:bg-[#272829] px-[8px] pb-4  rounded-b-[13px] '>
									<div className='flex flex-wrap gap-4'>
										<div className='flex items-center gap-2'>
											<div className='dark:bg-[#608AFF] bg-[#9CB6FF] w-[25px] h-[25px] rounded-[5px]' />
											<span className=' text-[17px] dark:text-white text-[#141414]'>Есть места</span>
										</div>
										<div className='flex items-center gap-2'>
											<div className='dark:bg-[#E3B786] bg-[#FFE1BF] w-[25px] h-[25px] rounded-[5px]' />
											<span className=' text-[17px] dark:text-white text-[#141414]'>Мало мест</span>
										</div>
										<div className='flex items-center gap-2'>
											<div className='dark:bg-[#757575] bg-[#C5D2E0] w-[25px] h-[25px] rounded-[5px]' />
											<span className=' text-[17px] dark:text-white text-[#141414]'>Места закончились</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default ModalDepartureDate;
