import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ModalBottom from '../../modal/ModalBottom';
import NumberAnimated from '../../ui/NumberAnimated';

const ModalNumberOfTouristsRixos = ({ modalNumberOfTourists, setModalNumberOfTourists, ages, setAges, obj, setObj }) => {
	const { t } = useTranslation();
	const [direction, setDirection] = useState(1);
	const navigate = useNavigate();
	const [addChild, setAddChild] = useState(false);

	const handleAdultCounter = delta => {
		setDirection(delta);

		const newCount = obj?.adultCounterRixos + delta;
		if (newCount >= 1) {
			setObj(pV => ({ ...pV, adultCounterRixos: newCount }));
		}
	};
	const handleChildrenChange = delta => {
		setDirection(delta);

		const newCount = Math.max(0, obj?.childrenCountRixos + delta <= 4 ? obj?.childrenCountRixos + delta : 4);
		setObj(pV => ({ ...pV, childrenCountRixos: newCount }));

		if (newCount > obj?.childrenCountRixos) {
			const newAges = [...ages];
			for (let i = obj?.childrenCountRixos + 1; i <= newCount; i++) {
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

	const clickFunction = () => {
		navigate(
			`/hotels/tour-info/?town_from_inc=1853&tour_operator_id=1&state_id=10&checkin=20250702&nights=7&adult=${obj?.adultCounterRixos}&childs=${obj?.childrenCountRixos}&tour_somo_id=7&towns[]=7&rixos=true`
		);
		setModalNumberOfTourists(false);
	};

	return (
		<div className='w-full'>
			<ModalBottom
				close={() => setModalNumberOfTourists(false)}
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
										className={`select-none w-[27px] h-[27px] ${
											obj?.adultCounterRixos > 1 ? 'bg-[#0077FF]' : 'bg-[#D7DBE0] !cursor-no-drop'
										} flex justify-center items-center text-white font-normal text-base rounded-full`}
										disabled={obj?.adultCounterRixos <= 1}
									>
										-
									</button>

									<div className='select-none mx-2 font-normal text-lg dark:text-white'>
										<NumberAnimated number={obj.adultCounterRixos} direction={direction} />
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
												className={`select-none w-[27px] h-[27px] ${
													obj?.childrenCountRixos > 0 ? 'bg-[#0077FF] ' : 'bg-[#D7DBE0] !cursor-no-drop'
												} flex justify-center items-center text-white font-normal text-base rounded-full`}
											>
												-
											</button>
											<span className='select-none mx-2 font-normal text-lg dark:text-white'>
												<NumberAnimated number={obj.childrenCountRixos} direction={direction} />
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

export default ModalNumberOfTouristsRixos;
