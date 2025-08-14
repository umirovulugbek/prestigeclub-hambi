import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '../itemIcon';
import { useTranslation } from 'react-i18next';

const Accordion = ({ list = [], darkmode, lineShow, hotel_id }) => {
	const navigate = useNavigate();
	const { t } = useTranslation()
	const [openIndexes, setOpenIndexes] = useState(list.map(() => true));

	const toggleAccordion = index => {
		setOpenIndexes(prevOpenIndexes => prevOpenIndexes.map((isOpen, i) => (i === index ? !isOpen : isOpen)));
	};

	return (
		<div className=''>
			{list.map((item, index) => (
				<div key={index} className={`!my-[15px] rounded-[15px] ${darkmode ? '!text-white bg-tuna' : 'bg-white'}`}>
					<div className='container_main'>
						<button
							onClick={() => toggleAccordion(index)}
							className={`w-full flex justify-between items-center gap-3 py-4 focus:outline-none ${openIndexes[index] ? 'border-b border-[#EEEEEE]  dark:border-[#4B4B59]' : ''
								}`}
						>
							<p className='text-base font-semibold'>{item.title}</p>
							<ArrowRight fill={darkmode ? '#fff' : '#042B50'} className={openIndexes[index] ? 'rotate-90 duration-200' : 'rotate-0 duration-200'} />
						</button>
						<div className={`transition-max-height duration-200 ease-in-out overflow-hidden pt-0 ${openIndexes[index] ? 'max-h-270' : 'max-h-0'}`}>
							<div className='py-4'>
								{item.content}
								{lineShow === true ? (
									<>
										<img src='/images/linedashed.svg' className='w-full object-cover h-[1px] my-[15px]' alt='' />
										<button
											type='button'
											onClick={() => navigate(`/hotels/detail/comment/${hotel_id}`)}
											className='cursor-pointer w-full text-blueRibbon text-base font-semibold'
										>
											{t('home.view_all_comment')}
										</button>
									</>
								) : (
									''
								)}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Accordion;
