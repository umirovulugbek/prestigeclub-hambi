import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Back } from '../../components/itemIcon';
import Axios from '../../utils/httpsClinet';

const HotelDetailAmenities = ({ darkmode }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { t } = useTranslation();
	const [hotel_info, setHotelInfo] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getHotelInfo(id);
	}, []);

	const getHotelInfo = hotel_key => {
		setLoading(true);
		Axios()
			.get(`api/v1/search/hotels-infos?hotel_key=${hotel_key}`)
			.then(res => {
				setHotelInfo(res?.data?.data?.data?.[0]?.amenities);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<div className={`min-h-screen  pb-[69px] ${darkmode ? 'bg-[#141414]' : 'bg-neutralSand'}`}>
			<section className={`py-[10px] rounded-bl-[20px] rounded-br-[20px] h-[65px] fixed w-full  ${darkmode ? 'bg-[#272829]' : 'bg-white'}`}>
				<div className='container_main'>
					<div className='flex items-center w-full'>
						<Back fill={darkmode ? '#fff' : '#141414'} onClick={() => navigate(-1)} className='-translate-x-[15px]' />
						<div className={`text-lg font-semibold flex w-full justify-center ${darkmode ? 'text-white' : 'text-blueWood'}`}>{t('home.all_amenities')}</div>
					</div>
				</div>
			</section>

			<div className='flex flex-col gap-[25px] px-[15px] py-[20px] pt-[75px] container_main  '>
				{hotel_info?.map((item, index) => {
					return (
						<div key={index} className=' font-medium text-base text-start'>
							<div className=' text-base font-medium text-black dark:text-white'> {item?.amenity?.category_label}</div>
							<div className='text-sm  mt-[10px] text-[#141414] dark:text-white font-normal'>
								{item?.amenity?.items?.map((item_child, index) => {
									return (
										<div className='flex gap-2'>
											{darkmode ? (
												<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
													<path
														d='M6.75012 12.1264L3.62262 8.99891L2.55762 10.0564L6.75012 14.2489L15.7501 5.24891L14.6926 4.19141L6.75012 12.1264Z'
														fill='#ffff'
													/>
												</svg>
											) : (
												<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
													<path
														d='M6.75012 12.1264L3.62262 8.99891L2.55762 10.0564L6.75012 14.2489L15.7501 5.24891L14.6926 4.19141L6.75012 12.1264Z'
														fill='#141414'
													/>
												</svg>
											)}
											<div key={index}>{item_child?.amenity_label}</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default HotelDetailAmenities;
