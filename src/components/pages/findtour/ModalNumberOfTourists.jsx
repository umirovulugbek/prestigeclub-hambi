import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../../../utils/mixpanel';
import ModalBottom from '../../modal/ModalBottom';
import NumberAnimated from '../../ui/NumberAnimated';

const ModalNumberOfTourists = ({ modalNumberOfTourists, setModalNumberOfTourists, obj, setObj, setObjError, ages, setAges, addChild, setAddChild, setModalDepartureDate }) => {
	const { t } = useTranslation();
	const [direction, setDirection] = useState(1);
	useEffect(() => {
		setObj(pV => ({
			...pV,
			number_of_tourists: obj?.number_of_tourists,
		}));
	}, [obj?.number_of_tourists]);

	const handleAdultCounter = delta => {
		setDirection(delta);

		const newCount = obj?.adultCounter + delta;
		if (newCount >= 1) {
			setObj(pV => ({ ...pV, adultCounter: newCount }));
		}
	};
	const handleChildrenChange = delta => {
		setDirection(delta);

		const newCount = Math.max(0, obj?.childrenCount + delta <= 4 ? obj?.childrenCount + delta : 4);
		setObj(pV => ({ ...pV, childrenCount: newCount }));

		if (newCount > obj?.childrenCount) {
			const newAges = [...ages];
			for (let i = obj?.childrenCount + 1; i <= newCount; i++) {
				newAges.push(1);
			}
			setAges(newAges);
		} else {
			setAges(ages.slice(0, newCount));
		}
	};

	const handleAgeChange = (index, delta) => {
		const newAges = ages.map((age, i) => (i === index ? delta : age));
		setAges(newAges);
	};

	const ageCategory = age => {
		if (age === 1 || age === 0) {
			return age + ` ${t('home.year')}`;
		} else if (age >= 2 && age <= 4) {
			return age + ` ${t('home.year1')}`;
		} else if (age >= 5 && age <= 17) {
			return age + ` ${t('home.year3')}`;
		} else {
			return age + ` ${t('home.year4')}`;
		}
	};

	const clickFunction = () => {
		trackEvent('guests', { search_guests: obj?.adultCounter, search_guests_chld: obj?.childrenCount });

		let allCount = obj?.adultCounter + ages?.length;
		setObj(pV => ({
			...pV,
			number_of_tourists: allCount,
		}));
		setObjError(pV => ({
			...pV,
			number_of_tourists: false,
		}));
		setModalNumberOfTourists(false);
		// setModalNumberOfDays(true);
		setModalDepartureDate(true);
	};

	const closeFunction = () => {
		setModalNumberOfTourists(false);
	};

	return (
		<div className='w-full'>
			<ModalBottom
				close={() => closeFunction()}
				modal={modalNumberOfTourists}
				heightModal='min-h-[20vh] max-h-[80vh]'
				btnShow={true}
				textBtn={t('home.save')}
				translateY='translate-y-[80vh]'
				clickFunction={clickFunction}
				content={
					<div className='w-full '>
						<div className='flex items-center justify-between w-full gap-3'>
							<p className='font-medium text-xl dark:text-white'>{t('home.number_of_tourists2')}</p>
						</div>

						<div className='mt-3 flex flex-col gap-3'>
							<div className='flex items-center justify-between  dark:bg-[#272829] bg-white rounded-xl px-[15px] py-[15px]'>
								<span className='mr-2  flex flex-col'>
									<span className='text-[17px] font-normal select-none dark:text-white'>{t('home.adults')}</span>
									<span className=' text-sm text-[#76787A]'>{t('home.over_16_years_old')}</span>
								</span>
								<div className='flex items-center gap-1 bg-[#EBF0F5] dark:bg-[#141414] rounded-full p-1'>
									<button
										onClick={() => handleAdultCounter(-1)}
										className={`select-none w-[27px] h-[27px] ${obj?.adultCounter > 1 ? 'bg-[#0077FF]' : 'bg-[#D7DBE0] !cursor-no-drop'
											} flex justify-center items-center text-white font-normal text-base rounded-full`}
										disabled={obj?.adultCounter <= 1}
									>
										-
									</button>

									<div className='select-none mx-2 font-normal text-lg dark:text-white'>
										<NumberAnimated number={obj.adultCounter} direction={direction} />
									</div>

									<button
										onClick={() => handleAdultCounter(1)}
										className='select-none w-[27px] h-[27px] bg-[#0077FF] flex justify-center items-center text-white font-normal text-base rounded-full'
									>
										+
									</button>
								</div>
							</div>
							<div className='flex items-center justify-between  bg-white dark:bg-[#272829] rounded-xl px-[15px]'>
								{!addChild ? (
									<div className='text-base font-normal text-blueRibbon w-full py-[15px] cursor-pointer dark:text-white' onClick={() => setAddChild(true)}>
										+ {t('home.add_childs')}
									</div>
								) : (
									<div className='flex items-center justify-between w-full py-[15px] '>
										<div className='flex flex-col '>
											<span className='mr-2 font-normal text-[17px] dark:text-white'>{t('home.childs')}</span>
											<span className=' text-sm text-[#76787A]'>{t('home.2_to_12_years_old')}</span>
										</div>
										<div className='flex items-center gap-1 bg-[#EBF0F5] dark:bg-[#141414]  rounded-full p-1'>
											<button
												onClick={() => handleChildrenChange(-1)}
												className={`select-none w-[27px] h-[27px] ${obj?.childrenCount > 0 ? 'bg-[#0077FF] ' : 'bg-[#D7DBE0] !cursor-no-drop'
													} flex justify-center items-center text-white font-normal text-base rounded-full`}
											>
												-
											</button>
											<span className='select-none mx-2 font-normal text-lg dark:text-white'>
												<NumberAnimated number={obj.childrenCount} direction={direction} />
											</span>
											<button
												onClick={() => handleChildrenChange(1)}
												className='select-none w-[27px] h-[27px] bg-[#0077FF] flex justify-center items-center text-white font-normal text-base rounded-full'
											>
												+
											</button>
										</div>
									</div>
								)}
							</div>

							{ages.map((age, index) => (
								<div key={index} className='flex items-center justify-between w-full py-[15px] bg-white dark:bg-[#272829] rounded-xl px-[15px]'>
									<div className='flex flex-col'>
										<span className='mr-2  font-normal text-[17px] dark:text-white'>{t('home.child_age')}</span>
										<span className='text-sm text-[#76787A]'>
											{index + 1}-{t('home.th_child')}
										</span>
									</div>

									<select
										value={age}
										onChange={e => handleAgeChange(index, Number(e.target.value))}
										className='select-none bg-[#EEF2FF] dark:bg-[#2c2c2e] border border-gray-300 dark:border-[#4b4b4d] rounded-lg px-3 py-2 text-base dark:text-white'
									>
										{Array.from({ length: 17 }, (_, i) => i + 1).map(num => (
											<option key={num} value={num}>
												{num}
											</option>
										))}
									</select>
								</div>
							))}
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default ModalNumberOfTourists;
