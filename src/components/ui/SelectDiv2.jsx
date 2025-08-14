import React from 'react';

const SelectDiv2 = props => {

	return (
		<div
			{...props}
			className='gap-2 cursor-pointer relative text-sm w-full   duration-200 bg-white dark:bg-[#272829] dark:text-[#FFFFFF] text-[#2B3F5A] rounded-lg h-[50px] flex justify-center items-center px-[15px]'
		>
			<div className='w-5 h-5'>{props?.icon}</div>
			<span className='select-none dark:text-white'>{props?.placeholder && props?.value === '' ? props?.placeholder : props?.title}</span>

			{/* <ArrowRight fill={props?.darkmode ? '#fff' : '#042B50'} className='select-none w-[6.5] h-[12px] rotate-90 mt-1 dark:text-white' /> */}
		</div>
	);
};

export default SelectDiv2;
