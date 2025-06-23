import React, { useEffect, useState } from 'react';
import FireIcon from '../../svg/FireIcon';
import Axios from '../../utils/httpsClinet';
import LastMinuteTourHotel from '../card/LastMinuteTourHotel';

const LastMinuteTours = () => {
	const [data, setData] = useState([]);
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
		<div className='pt-[20px] container_main '>
			<div className='text-[20px] dark:text-white flex gap-[5px] items-center mb-4'>
				<FireIcon />
				Горящие туры
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
	);
};

export default LastMinuteTours;
