import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from '../../itemIcon';
import ModalBottom from '../../modal/ModalBottom';

const ModalDeparture = ({
	modalDeparture,
	setModalDeparture,
	list,
	setObj,
	setObjError,
	getTownStates,
	setTownStates,
	setTowns,
	setCheckedItems,
	setDepartureDateList,
	setNumberOfDaysList,
	setModalWhere,
	darkmode,
}) => {
	const { t } = useTranslation();
	const handleSet = (name, somo_id, tour_operator_id) => {
		getTownStates(somo_id, tour_operator_id);
		setObj(pV => ({
			...pV,
			departure: name,
			where: '',
			departure_date: '',
			number_of_days: '',
		}));
		setTownStates([]);
		setTowns([]);
		setCheckedItems([]);
		setDepartureDateList([]);
		setNumberOfDaysList([]);
		setObjError(pV => ({
			...pV,
			departure: false,
		}));
		setModalDeparture(false);
		setModalWhere(true);
	};

	return (
		<div className='w-full'>
			<ModalBottom
				close={() => setModalDeparture(false)}
				modal={modalDeparture}
				heightModal='min-h-[20vh] max-h-[80vh]'
				btnShow={false}
				translateY='translate-y-[80vh]'
				content={
					<div className='w-full'>
						<div className='flex items-center justify-between w-full gap-3'>
							<p className='font-medium text-xl dark:text-white'>{t('home.deporment_from')}</p>
						</div>
						<div className='mt-[20px] flex flex-col gap-3 mb-3'>
							{list?.map((item, index) => {
								return (
									<div
										key={index}
										onClick={() => handleSet(item?.name, item?.somo_id, item?.tour_operator_id)}
										className='flex items-center justify-between gap-3 px-3  bg-white dark:bg-[#272829]  rounded-xl  dark:border-[#4B4B59] py-[15px] last:border-none cursor-pointer'
									>
										<p className=' dark:text-white '>{item?.name}</p>
										<ArrowRight fill={darkmode ? '#B3B7CE' : '#141414'} />
									</div>
								);
							})}
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default ModalDeparture;
