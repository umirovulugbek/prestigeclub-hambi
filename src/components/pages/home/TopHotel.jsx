import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SliderTwo from '../../SliderTwo';
import Title from '../../Title';

const TopHotel = ({ list, darkmode, listType, all = false }) => {
	const { t, i18n } = useTranslation();

	return (
		<>
			<section>
				<div className='container_main'>
					<div className='flex gap-3 justify-between'>
						<Title text={t('home.top_hotel')} className='line-clamp-1' weight='medium' darkmode={darkmode} />
						{all ? (
							<Link to={`/hotels/${listType}`} className='group'>
								<Title text='Все' weight='medium' color='starDust' darkmode={darkmode} className='group-hover:!text-blueRibbon' />
							</Link>
						) : null}
					</div>
				</div>
				<SliderTwo list={list} darkmode={darkmode} />
			</section>
		</>
	);
};

export default TopHotel;
