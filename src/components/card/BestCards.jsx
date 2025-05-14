import React from 'react';
import TopHotelCard from './TopHotelCard';

const BestCards = ({ list = [], title, trackEvent_page = '' }) => {
	return (
		<div className='pl-[15px] flex flex-col gap-3'>
			<h2 className=' font-medium text-base  text-[#141414] dark:text-white'>{title}</h2>
			<div className='flex  gap-[15px] overflow-x-scroll'>
				<TopHotelCard list={list} trackEvent_page={trackEvent_page} />
			</div>
		</div>
	);
};

export default BestCards;
