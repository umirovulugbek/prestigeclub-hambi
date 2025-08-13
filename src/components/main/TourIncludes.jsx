import React from 'react';
import { useTranslation } from 'react-i18next';
import { Hotel, Pitaniya, Samalyot, Straxofka, Transfer } from '../HotelSearchIcon.jsx';
const TourIncludes = () => {
	const { t } = useTranslation();
	return (
		<div className='bg-white dark:bg-[#272829] border border-[#EEEEEE] dark:border-[#272829]  rounded-[15px] py-[15px]  flex  flex-col  gap-3'>
			<h4 className='text-[#141414] dark:text-white text-base font-normal flex justify-center'>{t('home.the_tour_includes')}</h4>
			<div className='flex  items-center justify-center flex-col'>
				<span className='flex  justify-center items-center gap-[10px] dark:text-white  '>
					{Samalyot}+{Hotel}+{Pitaniya}+{Transfer}+{Straxofka}
				</span>
				<span className='text-[#042B50] dark:text-white  text-[13px] flex justify-center text-center'>
					{t('home.flight')}, {t('home.accommodation')}, {t('home.nutrition')}, {t('home.transfer')}, {t('home.insurance')}
				</span>
			</div>
		</div>
	);
};

export default TourIncludes;
