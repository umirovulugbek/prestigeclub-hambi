import React from 'react';
import { useTranslation } from 'react-i18next';
import CheckIcon from '../../icons/CheckIcon';
import { getSearchParams } from '../../utils/function';

const PrestigeBanner = ({ darkmode, guarantee = true }) => {
	const { t } = useTranslation();
	const paramsObj = getSearchParams();
	return (
		<div className='bg-white w-full dark:bg-[#272829] py-[11px]   flex-col flex  justify-center rounded-xl  px-2  gap-[10px]'>
			<div className='flex   gap-[12px] items-center'>
				{Number(paramsObj?.tour_operator_id) === 4 ? (
					<>
						{darkmode ? (
							<img width={106} height={37} src='/images/centrum-holidays-white.png' alt='' />
						) : (
							<img width={106} height={37} src='/images/centrum-holidays.png' alt='' />
						)}
					</>
				) : (
					<>{darkmode ? <img width={104} height={37} src='/images/prestige_white.png' alt='' /> : <img width={104} height={37} src='/images/prestige_black.png' alt='' />} </>
				)}

				<div className=' border-[0.5px] border-[#235DFF]  min-h-[30px] w-[1px] ' />
				<p className='text-[#141414]   leading-[18.47px] dark:text-white  text-[13px] font-medium'>{t('home.prestige_banner')}</p>
			</div>
			<div className='border-[0.5px] border-[#EBF0F5] dark:border-[#141414]' />
			<div className='flex justify-center  items-center gap-2'>
				{guarantee ? (
					<>
						<span>
							<CheckIcon />
						</span>

						<p className='font-medium dark:text-white leading-[125%] text-sm'>100% гарантия тура: все организовано надежным туроператором.</p>
					</>
				) : (
					<p className='font-medium dark:text-white text-[15px] '>Мы подобрали для вас только лучшие отели</p>
				)}
			</div>
		</div>
	);
};

export default PrestigeBanner;
