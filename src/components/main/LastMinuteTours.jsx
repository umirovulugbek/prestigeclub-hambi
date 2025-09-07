import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FireIcon from '../../icons/FireIcon';
import Axios from '../../utils/httpsClinet';
import LastMinuteTourHotel from '../card/LastMinuteTourHotel';

const LastMinuteTours = () => {
	const [data, setData] = useState([]);
	const { t } = useTranslation();
	useEffect(() => {
		getHotTour();
	}, []);
	const getHotTour = () => {
		Axios()
			.get('api/hot-tours')
			.then(res => {
				setData(res?.data);
			})
			.catch(err => {
				console.error('error');
			});
	};
	return (
		<>
			{data?.data?.length > 0 ? (
				<div className='pt-[20px] container_main '>
					<div className='text-[20px] dark:text-white flex gap-[5px] items-center mb-4'>
						<FireIcon />
						{t('home.hotTours')}
					</div>
					<div className='grid grid-cols-2 gap-3'>
						{data?.data?.map((item, index) => {
							return (
								<React.Fragment key={index}>
									<LastMinuteTourHotel data={item} />
								</React.Fragment>
							);
						})}
					</div>
				</div>
			) : null}
		</>
	);
};

export default LastMinuteTours;
