import React from 'react';
import ReactInputMask from 'react-input-mask';

const Input = props => {
	let darkMODE = props?.darkmode
		? `${props?.placeholder && props?.value === '' ? 'text-starDust' : 'font-semibold text-white'}`
		: `${props?.placeholder && props?.value === '' ? 'text-starDust' : 'font-semibold text-blueWood'}`;

	let darkModeError = props?.darkmode
		? `${props?.error ? 'border-red hover:border-red' : 'border-blueDark hover:border-blueRibbon'} `
		: `${props?.error ? 'border-red hover:border-red' : 'border-neutral hover:border-blueRibbon'} `;

	let darkModeBgText = props?.darkmode ? `text-blueCasper bg-tuna` : `text-blueWood bg-white `;

	return (
		<div {...props} className='relative'>
			{props?.type === 'password' || props?.type === 'text' ? (
				<input
					type={props?.type}
					placeholder={props?.placeholder}
					name={props?.name}
					value={props?.value}
					onChange={props?.onChange}
					className={`relative w-full border px-[20.75px] py-[18.5px] rounded-xl duration-200 ${darkModeError} ${darkMODE}`}
				/>
			) : (
				<ReactInputMask
					className={`relative w-full border px-[20.75px] py-[18.5px] rounded-xl duration-200 ${darkModeError} ${darkMODE}`}
					name={props?.name}
					value={props?.value}
					onChange={props?.onChange}
					required={false}
					mask={'+998 (nn) nnn-nn-nn'}
					// disabled={is_disabled}
					placeholder={'+998 (__) ___-__-__'}
					maskChar='_'
					alwaysShowMask={false}
					formatChars={{
						n: '[0-9]',
						a: '[A-Za-z]',
						'*': '[A-Za-z0-9]',
					}}
				/>
			)}
			<div className='absolute top-[-15px] left-0'>
				<span className={`text-sm font-medium px-2 ml-3 ${darkModeBgText}`}>{props?.title}</span>
			</div>
		</div>
	);
};

export default Input;
