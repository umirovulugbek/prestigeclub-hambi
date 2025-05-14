import React from 'react';

const InputDiv2 = props => {
	let darkMODE = props?.darkmode
		? `${props?.placeholder && (props?.value === '' || props?.value === undefined) ? 'text-starDust' : ' font-normal text-[#0077FF]'}`
		: `${props?.placeholder && (props?.value === '' || props?.value === undefined) ? 'text-starDust' : 'font-normal text-[#0077FF]'}`;

	let darkModeError = props?.darkmode
		? `${props?.error ? 'border-red hover:border-red' : 'border-[#4B4B59] hover:border-blueRibbon'} `
		: `${props?.error ? 'border-red hover:border-red' : 'border-[#EBF0F5] hover:border-blueRibbon'} `;

	return (
		<div
			{...props}
			className={` whitespace-nowrap   items-center min-h-[50px] max-h-[50px] bg-white dark:bg-[#272829] inline-flex gap-[16px] cursor-pointer relative w-full z-[1] border px-[20px] rounded-xl
       duration-200 ${darkModeError} ${darkMODE}
      `}
		>
			<span>{props?.icon}</span>
			<span className='font-normal  '>
				{props?.placeholder && (props?.value === '' || props?.value === undefined) ? props?.placeholder : props?.value}
				{props?.checkedItems &&
					props?.checkedItems.length > 0 &&
					`, ${props.checkedItems
						.filter(item => item.label !== 'Все')
						.map(item => item.label)
						.join(', ')}`}
			</span>
			{/* <div className='absolute top-[-15px] left-0'>
				<span className={`text-sm font-medium px-2 ml-[10px]  bg-white text-[#141414]  dark:bg-[#141414] dark:text-white `}>{props?.title}</span>
			</div> */}
		</div>
	);
};

export default InputDiv2;
