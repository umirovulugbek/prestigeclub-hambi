import React from 'react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../../utils/mixpanel';
import LazyImage from '../ui/LazyImage';

const TopHotelCard = ({ list, trackEvent_page }) => {
	const navigate = useNavigate();
	return (
		<>
			{list?.map((item, index) => {
				const { town_from_inc, tour_operator_id, state_inc, hotel_key, top_hotel_price, tour_key } = item;

				let clickTag = [];
				item?.tags?.forEach(el => {
					clickTag = [
						...clickTag,
						{
							title: el?.name,
							color: el?.color,
						},
					];
				});

				const filter = {
					town_from_inc: town_from_inc,
					tour_operator_id: tour_operator_id,
					state_id: state_inc,
					hotel_key: hotel_key,
					tour_somo_id: top_hotel_price?.tour_key,
				};

				const searchParams = Object.keys(filter)
					.map(key => {
						if (Array.isArray(filter[key])) {
							return filter[key].map(value => `${key}[]=${encodeURIComponent(value)}`).join('&');
						}
						return `${key}=${encodeURIComponent(filter[key])}`;
					})
					.join('&');

				return (
					<React.Fragment key={index}>
						<div
							onClick={() => {
								trackEvent(`${item?.town?.name}_${trackEvent_page}_top_hotel`, {
									image_url: item?.image_url,
									star: item?.star,
									price: (item?.top_hotel_price?.converted_price_number_half / 1e6)?.toFixed(1),
								});
								navigate(`/hotels/result-hotel/?${searchParams}`);
							}}
							key={index}
							className='min-w-[173px] max-w-[173px] bg-white  dark:bg-[#272829] rounded-lg min-h-[265px]'
						>
							<div className='flex flex-col gap-[15px]'>
								<div className='min-h-[117px] max-h-[117px] relative'>
									<LazyImage
										src={item?.image_url !== null ? item?.image_url : '/images/default.png'}
										alt=''
										className='min-h-[117px] max-h-[117px]  object-cover rounded-lg w-full'
									/>
									<div className=' absolute bg-white dark:bg-[#272829] h-[20px] top-2 left-2  max-h-6   w-[44px] flex justify-center items-center text-[#FFCC00] text-sm rounded-[25px] gap-1'>
										<img src='/images/star.svg' alt='' className='w-4 h-4' />
										{item?.star}
									</div>
								</div>
								<div className='flex flex-col gap-2 mx-3 mb-4 '>
									<img src='/images/amenities.svg' alt='' className='h-4' />
									<div className='flex flex-col gap-1'>
										<p className=' text-[#141414] text-[17px] dark:text-white line-clamp-2'>{item?.name}</p>
										<span className='text-[#76787A] text-sm'>{item?.town?.name}</span>
									</div>
									<p className=' text-[#76787A] text-[17px]'>
										от <span className='text-[#235DFF]'>{(item?.top_hotel_price?.converted_price_number_half / 1e6)?.toFixed(1)} млн</span> сум
									</p>
								</div>
							</div>
						</div>
					</React.Fragment>
				);
			})}
		</>
	);
};

export default TopHotelCard;
