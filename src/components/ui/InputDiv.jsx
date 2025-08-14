import React from 'react';

const InputDiv = React.memo(props => {
	const darkMODE = props?.darkmode
		? props?.placeholder && (props?.value === '' || props?.value === undefined)
			? 'text-starDust'
			: 'font-normal text-[#0077FF]'
		: props?.placeholder && (props?.value === '' || props?.value === undefined)
			? 'text-starDust'
			: 'font-normal text-[#0077FF]';

	const darkModeError = props?.darkmode
		? props?.error
			? 'border-red hover:border-red'
			: 'border-[#141414] hover:border-blueRibbon'
		: props?.error
			? 'border-red hover:border-red'
			: 'border-[#EBF0F5] hover:border-blueRibbon';

	return (
		<div
			{...props}
			className={`whitespace-nowrap items-center min-h-[50px] max-h-[50px] bg-[#EBF0F5] dark:bg-[#141414] inline-flex gap-[16px] cursor-pointer relative w-full z-[1] border px-[20px] rounded-xl duration-200 ${darkModeError} ${darkMODE} ${props?.className}`}
		>
			<span>{props?.icon}</span>
			<span className='line-clamp-1'>
				{props?.placeholder && (props?.value === '' || props?.value === undefined) ? props?.placeholder : props?.value}
				{props?.checkedItems?.length > 0 &&
					`, ${props?.checkedItems
						.filter(item => item.label !== 'Все')
						.map(item => item.label)
						.join(', ')}`}
			</span>
		</div>
	);
});

export default InputDiv;
