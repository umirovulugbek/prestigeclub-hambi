import React from 'react';
import SliderTwo from '../../SliderTwo';
import Title from '../../Title';

const NowBooking = ({ list, darkmode, colorWhite, priceShow }) => {
	return (
		<>
			<section className='py-[14px] rounded-[10px] bg-blueJordy mt-[15px]'>
				<div className='container_main'>
					<Title text='Сейчас бронинуют' className='!text-white' darkmode={darkmode} />
				</div>
				<SliderTwo list={list} darkmode={darkmode} colorWhite={colorWhite} priceShow={priceShow} />
			</section>
		</>
	);
};

export default NowBooking;
