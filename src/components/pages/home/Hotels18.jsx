import React from 'react';
import { Link } from 'react-router-dom';
import SliderTwo from '../../SliderTwo';
import Title from '../../Title';

const Hotels18 = ({ list, darkmode, listType }) => {
	return (
		<>
			<section>
				<div className='container_main'>
					<div className='flex gap-3 justify-between'>
						<Title text='Отели 18+' className='line-clamp-1' darkmode={darkmode} />
						<Link to={`/hotels/${listType}`} className='group'>
							<Title text='Все' weight='medium' color='starDust' darkmode={darkmode} className='group-hover:!text-blueRibbon' />
						</Link>
					</div>
				</div>
				<SliderTwo list={list} darkmode={darkmode} />
			</section>
		</>
	);
};

export default Hotels18;
