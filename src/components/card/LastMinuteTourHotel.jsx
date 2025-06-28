import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FireIcon from '../../svg/FireIcon';
import PalmIcon from '../../svg/PalmIcon';

const LastMinuteTourHotel = ({ data }) => {
	const navigate = useNavigate();
	const { i18n, t } = useTranslation();
	const formatDate = dateString => {
		const monthNames_uz = {
			1: 'yanvar',
			2: 'fevral',
			3: 'mart',
			4: 'aprel',
			5: 'may',
			6: 'iyun',
			7: 'iyul',
			8: 'avgust',
			9: 'sentyabr',
			10: 'oktyabr',
			11: 'noyabr',
			12: 'dekabr',
		};
		const monthNames = {
			1: 'января',
			2: 'февраля',
			3: 'марта',
			4: 'апреля',
			5: 'мая',
			6: 'июня',
			7: 'июля',
			8: 'августа',
			9: 'сентября',
			10: 'октября',
			11: 'ноября',
			12: 'декабря',
		};

		if (!dateString) return '';

		const year = dateString?.slice(0, 4);
		const month = dateString?.slice(4, 6);
		const day = dateString?.slice(6, 8);

		return `${parseInt(day)} ${(i18n?.language === 'uz' ? monthNames_uz : monthNames)[parseInt(month)]}`;
	};
	return (
		<div
			onClick={() => {
				navigate(
					`/hotels/tour-info/?town_from_inc=${data?.tour?.town_from_id}&tour_operator_id=${data?.tour?.tour_operator_id}&state_id=${data?.tour?.state_id}&checkin=${data?.checkin_date}&nights=${data?.nights}&adult=${data?.adults_count}&childs=${data?.children_count}&tour_somo_id=${data?.tour?.samo_id}&towns[]=${data?.tour?.samo_id}`
				);
			}}
			className='bg-white dark:bg-[#272829] w-full  rounded-xl cursor-pointer'
		>
			<div className='relative'>
				<img src={data?.image_medium} alt='' className='h-[150px] w-full  rounded-xl object-cover' />
				<span className='bg-white dark:bg-[#141414] dark:text-white top-2 px-[10px] absolute left-2 flex justify-center gap-1  items-center  rounded-xl h-[26px]'>
					<PalmIcon width='12' height='12' color='#235DFF' />
					{data?.town_name}
				</span>
				<div className='absolute bottom-2 px-2 flex justify-between w-full'>
					<span className='bg-white dark:bg-[#141414] dark:text-white px-[10px] text-sm  flex justify-center gap-1  items-center  rounded-xl h-[26px]'>
						{formatDate(data?.checkin_date)}
					</span>
					<span className='bg-[#FF6565] text-white px-[10px] text-sm  flex justify-center gap-1  items-center  rounded-xl h-[26px]'>
						{data?.discount_percentage}%
						<FireIcon color='#Ffff' width='16' height='16' />
					</span>
				</div>
			</div>
			<div className='px-3 py-4 flex flex-col gap-2'>
				<div className='text-[#141414] dark:text-white text-lg  leading-[22px] font-medium truncate'>{data?.tour?.name}</div>
				<div className=''>
					<div className='text-[#132339] leading-[22px] dark:text-white'>
						{i18n.language === 'uz' ? <>{data?.adults_count + data?.children_count} ta sayyoh</> : <>За {data?.adults_count + data?.children_count}х взрослых</>}
					</div>
					<span>
						{data?.nights} {t('home.nights')}
					</span>
				</div>
				<div className='text-[#235DFF] leading-[22px] font-medium'>от {data?.price_discounted?.toLocaleString('en-US').replace(/,/g, ' ')} сум</div>
			</div>
		</div>
	);
};

export default LastMinuteTourHotel;
