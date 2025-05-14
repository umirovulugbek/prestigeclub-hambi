import React from 'react';

const FilterPill = ({ label, onRemove, index }) => {
	return (
		<div index={index} className='flex items-center gap-2 p-[10px] bg-[#0077FF1F] text-[#235DFF] rounded-lg w-max h-[30px]'>
			<span className=' text-sm leading-[18px]  whitespace-nowrap'>{label}</span>
			<button onClick={onRemove} className='hover:bg-[#fffff]'>
				<svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M8.29289 0.292893C8.68342 -0.0976311 9.31658 -0.0976311 9.70711 0.292893C10.0976 0.683418 10.0976 1.31658 9.70711 1.70711L6.41421 5L9.70711 8.29289C10.0976 8.68342 10.0976 9.31658 9.70711 9.70711C9.31658 10.0976 8.68342 10.0976 8.29289 9.70711L5 6.41421L1.70711 9.70711C1.31658 10.0976 0.683418 10.0976 0.292894 9.70711C-0.0976312 9.31658 -0.0976312 8.68342 0.292894 8.29289L3.58579 5L0.292894 1.70711C-0.0976306 1.31658 -0.0976306 0.683418 0.292894 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L5 3.58579L8.29289 0.292893Z'
						fill='#0077FF'
					/>
				</svg>
			</button>
		</div>
	);
};

export default FilterPill;
