import React from 'react';

const Title = ({ size = 'base', className_span = '', weight = 'semibold', color = '#141414', className, text, darkmode, iconLeft, onClick = () => { }, classNameIcon = '' }) => {
	return (
		<p onClick={onClick} className={`my-[14px] inline-flex items-center gap-2 ${darkmode ? '!text-white' : `!text-[${color}]`} font-${weight} text-${size} ${className}`}>
			{iconLeft ? <span className={classNameIcon}>{iconLeft}</span> : null}
			<span className={className_span}>{text}</span>
		</p>
	);
};

export default Title;
