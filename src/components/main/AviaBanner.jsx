import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSearchParams } from '../../utils/function';

const AviaBanner = () => {
	const paramsObject = getSearchParams();
	const { t, i18n } = useTranslation();
	return (
		<div>
			<div className='p-[15px] rounded-lg border border-[#EEEEEE] bg-white dark:bg-[#272829] dark:border-[#272829] mx-[10px] flex items-center justify-between'>
				<div className='flex gap-[10px] items-center'>
					{Number(paramsObject?.tour_operator_id) === 4 ? <img src='/images/centrum.svg' alt='' /> : <img src='/images/uzairways.svg' alt='' />}
					<div className='flex flex-col justify-between'>
						<div className='text-[#132339] dark:text-white font-medium text-[20px] leading-[120%]'>
							{Number(paramsObject?.tour_operator_id) === 4 ? 'Centrum Air' : 'Uzairways'}
						</div>
						<div className='text-[#76787A] text-sm '>
							{[34, 223, 221, 220, 173, 194].includes(Number(paramsObject?.tour_somo_id))
								? 'A320'
								: [7, 248].includes(Number(paramsObject?.tour_somo_id))
								? 'A321-NEO'
								: 'A320'}
						</div>
					</div>
				</div>
				<div className='flex flex-col   text-sm font-medium text-end'>
					<span className='text-[#132339] dark:text-white'>
						{t('home.on_the_way')}{' '}
						{[34, 7]?.includes(Number(paramsObject?.tour_somo_id))
							? i18n?.language === 'uz'
								? '5s 20m'
								: '5ч 20м'
							: [223, 221, 220]?.includes(Number(paramsObject?.tour_somo_id))
							? i18n?.language === 'uz'
								? '2s 55m'
								: '2ч 55м'
							: [248]?.includes(Number(paramsObject?.tour_somo_id))
							? i18n?.language === 'uz'
								? '7s 5m'
								: '7ч 5м'
							: [173, 194]?.includes(Number(paramsObject?.tour_somo_id))
							? i18n?.language === 'uz'
								? '3s 40m'
								: '3ч 40м'
							: ''}
					</span>
					<span className='text-[#34C759]'>{t('home.direct_flight')}</span>
				</div>
			</div>
		</div>
	);
};

export default AviaBanner;
