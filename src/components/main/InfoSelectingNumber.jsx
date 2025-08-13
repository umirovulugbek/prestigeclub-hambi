import LightGallery from 'lightgallery/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getSearchParams } from '../../utils/function';
import Axios from '../../utils/httpsClinet';
import { PriceFormat } from '../../utils/PriceFormat';
import { ArrowRight } from '../itemIcon';

// Styles
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import LazyImage from '../ui/LazyImage';

const MealIcon = () => {
	return (
		<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_5385_14284)'>
				<path
					d='M2.50033 0.823334C2.04009 0.823334 1.66699 1.19643 1.66699 1.65667V6.65667C1.66699 9.13416 3.4689 11.1908 5.83366 11.5875V18.3233C5.83366 18.7836 6.20676 19.1567 6.66699 19.1567C7.12723 19.1567 7.50033 18.7836 7.50033 18.3233V11.5875C9.86509 11.1908 11.667 9.13416 11.667 6.65667V1.65667C11.667 1.19643 11.2939 0.823334 10.8337 0.823334C10.3734 0.823334 10.0003 1.19643 10.0003 1.65667V7.07333C10.0003 7.76369 9.44068 8.32333 8.75033 8.32333C8.05997 8.32333 7.50033 7.76369 7.50033 7.07333V1.65667C7.50033 1.19643 7.12723 0.823334 6.66699 0.823334C6.20676 0.823334 5.83366 1.19643 5.83366 1.65667V7.07333C5.83366 7.76369 5.27402 8.32333 4.58366 8.32333C3.8933 8.32333 3.33366 7.76369 3.33366 7.07333V1.65667C3.33366 1.19643 2.96056 0.823334 2.50033 0.823334Z'
					fill='#235DFF'
				/>
				<path
					d='M18.3337 0.823334C15.5722 0.823334 13.3337 3.06191 13.3337 5.82333V11.6567H16.667V18.3233C16.667 18.7836 17.0401 19.1567 17.5003 19.1567C17.9606 19.1567 18.3337 18.7836 18.3337 18.3233V0.823334Z'
					fill='#235DFF'
				/>
			</g>
			<defs>
				<clipPath id='clip0_5385_14284'>
					<rect width='20' height='20' fill='white' transform='translate(0 -0.0100098)' />
				</clipPath>
			</defs>
		</svg>
	);
};
const InfoSelectingNumber = ({ index, room, items, darkmode }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const paramsObject = getSearchParams();
	const [loading, setLoading] = useState(false);
	const [room_id, setroomId] = useState(0);
	const StorePrice = item => {
		setLoading(true);
		Axios()
			.post('api/v1/somo-travel/service/store-price', { ...item, tour_operator_id: paramsObject?.tour_operator_id })
			.then(res => {
				navigate(`/hotels/detail/hoteltourbooking/${res?.data?.price_id}` + window.location.search);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div key={index} className='mb-4 p-4  rounded-lg bg-[#FFFFFF]  dark:bg-[#272829] flex flex-col gap-[20px]'>
			<h2 className='text-xl text-center font-medium text-[#141414] dark:text-white'> {room}</h2>
			<ul className='list-disc flex flex-col gap-[20px]'>
				{items.map((item, index_child) => {
					return (
						<div className='flex flex-col gap-[20px]' key={index_child}>
							{index_child !== 0 ? (
								<div className='   w-full'>
									<img src='/images/linedashed.svg' className='w-full object-cover h-[0.5px] ' alt='' />
								</div>
							) : null}
							{item?.room_photos?.length > 0 && index_child === 0 ? (
								<div className='container_main !pr-0 !pl-0 w-full max-w-full overflow-hidden !my-[10px]'>
									<div className='overflow-x-scroll whitespace-nowrap'>
										<LightGallery plugins={[lgThumbnail]} elementClassNames='inline-flex gap-[8px]'>
											{item?.room_photos?.map((item_poto, index) => (
												<a key={index} href={item_poto?.image_url} className='w-[156px] h-[100px] rounded-[8px] overflow-hidden'>
													<LazyImage src={item_poto?.image_url} className='w-full h-full object-cover' alt='' />
												</a>
											))}
										</LightGallery>
									</div>
								</div>
							) : null}
							{/* {item?.short_description ? <p className='dark:text-white text-[#141414]'>{item?.short_description}</p> : null} */}
							<p className='text-[#141414] dark:text-white font-medium flex items-center gap-2'>
								<MealIcon />
								{item?.meal}
							</p>
							<div className='p-[10px] bg-[#EBF0F5] dark:bg-[#141414] px-[15px] rounded-lg  items-center flex gap-3 justify-between w-full relative'>
								<div className='flex flex-col items-start gap-1'>
									<>
										{item?.convertedPriceOld?.length <= 0 || item?.convertedPriceOld === null || item?.convertedPriceOld === undefined ? null : (
											<span className='bg-[#FF8800] text-white  font-medium rounded-[20px] px-3'>10%</span>
										)}
									</>
									<div className=' dark:text-white'>
										<div className=' md:text-lg font-medium'>
											{item?.nights} {t('home.nights')}
										</div>
										<p className=' text-sm md:text-base font-normal'>
											{item?.adult + item?.child} {t('home.turist')} , 1 {t('home.number2')}
										</p>
									</div>
								</div>
								<div className='flex flex-col items-end gap-1 '>
									{item?.convertedPriceOld?.length <= 0 || item?.convertedPriceOld === null || item?.convertedPriceOld === undefined ? null : (
										<span className='dark:text-white  line-through'>{item?.convertedPriceOld}</span>
									)}
									<button
										onClick={() => {
											StorePrice(item);
											setroomId(item?.id);
										}}
										className={`flex items-center gap-2 ${
											item?.convertedPriceOld?.length <= 0 || item?.convertedPriceOld === null || item?.convertedPriceOld === undefined
												? 'bg-[#235DFF]'
												: 'bg-[#FF8800]'
										}  px-[10px] py-2 rounded-lg`}
									>
										<p className={`font-medium md:text-xl    text-white`}>
											{loading && room_id === item?.id ? (
												'loading...'
											) : (
												<>
													{PriceFormat(item?.convertedPriceNumber)} {t('home.uzs')}
												</>
											)}
										</p>

										<ArrowRight fill={darkmode ? '#fff' : '#fff'} />
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</ul>
		</div>
	);
};

export default InfoSelectingNumber;
