import React from 'react';
import { ArrowRight } from '../itemIcon';

const SelectDiv = props => {
	return (
		<div
			{...props}
			className='flex gap-2 w-full cursor-pointer relative  px-[15px] py-[10px] rounded-[8px] duration-200 bg-[#FFFFFF]  dark:bg-[#272829] text-center justify-center items-center h-[46px]'
		>
			<span className='select-none dark:text-white'>{props?.placeholder && props?.value === '' ? props?.placeholder : props?.title}</span>

			<ArrowRight fill={props?.darkmode ? '#fff' : '#042B50'} className='select-none w-[6.5] h-[12px] rotate-90 mt-1 dark:text-white' />
		</div>
	);
};

export default SelectDiv;
