import React, { useState } from 'react';
import { ArrowRight } from '../itemIcon';

const AccardionItemClickTravel = ({ question, answer, darkmode }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className=' rounded-lg  bg-white dark:bg-[#272829]'>
			<button className='w-full flex justify-between items-center px-4 py-[15px] text-left  ' onClick={() => setIsOpen(!isOpen)}>
				<span className=' text-lg dark:text-white text-[#141414] font-normal'>{question}</span>

				{isOpen ? (
					<div className=' rotate-[270deg]'>
						<ArrowRight width={20} height={16} fill={darkmode ? '#B3B7CE' : '#141414'} />{' '}
					</div>
				) : (
					<div className=' rotate-[90deg]'>
						<ArrowRight width={20} height={16} fill={darkmode ? '#B3B7CE' : '#141414'} />{' '}
					</div>
				)}
			</button>
			{isOpen && (
				<div className='px-4 pb-3 text-[#141414] dark:text-white text-sm '>
					<p className=' '>{answer}</p>
				</div>
			)}
		</div>
	);
};

export default AccardionItemClickTravel;
