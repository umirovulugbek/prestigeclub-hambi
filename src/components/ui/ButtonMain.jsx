import React from 'react';

const ButtonMain = props => {
	return (
		<button
			{...props}
			disabled={props?.disabled}
			onClick={props?.onClick || {}}
			className={
				props?.className +
				` flex items-center justify-center gap-2 md:font-semibold font-medium md:text-base text-sm md:px-4 px-1.5 py-3 rounded-xl duration-150 cursor-pointer ${
					props?.type_color === 't_blue'
						? 'border border-blueRibbon bg-blueRibbon text-white hover:opacity-75'
						: props?.type_color === 't_white'
						? 'border border-white bg-white text-black hover:opacity-85'
						: ''
				} + ${props?.disabled ? ' cursor-default  opacity-60' : ''}`
			}
		>
			{props?.lefticon}
			<span className='!select-none'>{props?.text}</span>
			{props?.righticon}
		</button>
	);
};

export default ButtonMain;
