import lgThumbnail from 'lightgallery/plugins/thumbnail';
import LightGallery from 'lightgallery/react';
import React, { useState } from 'react';
import { ArrowRight } from './itemIcon';

// Styles
// import 'lightgallery/css/lg-thumbnail.css';
// import 'lightgallery/css/lg-zoom.css';
// import 'lightgallery/css/lightgallery.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getSearchParams } from '../utils/function';
import Axios from '../utils/httpsClinet';
import { PriceFormat } from '../utils/PriceFormat';
import LazyImage from './ui/LazyImage';

const InfoSelectingNumber = ({ darkmode, item, index }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const paramsObject = getSearchParams();
	const [loading, setLoading] = useState(false);

	const StorePrice = item => {
		setLoading(true);
		Axios()
			.post('api/v1/somo-travel/service/store-price', { ...item, tour_operator_id: paramsObject?.tour_operator_id })
			.then(res => {
				console.log(res?.data?.price_id, 'a');
				navigate(`/hotels/detail/hoteltourbooking/${res?.data?.price_id}` + window.location.search);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<>
			<section className={`mt-[15px]  flex flex-col gap-[15px] w-full  rounded-[15px] ${darkmode ? '!text-white bg-tuna' : 'bg-white'}`}>
				{index !== 0 ? (
					<div className='container_main  px-[15px] w-full'>
						<img src='/images/linedashed.svg' className='w-full object-cover h-[0.5px] ' alt='' />
					</div>
				) : null}
				{item?.room_photos?.length > 0 ? (
					<div className='container_main !pr-0 w-full max-w-full overflow-hidden !my-[10px]'>
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
				<div className='container_main w-full '>
					<div className='flex flex-col gap-1.5'>
						<div className='inline-flex gap-2 '>
							<span className='font-semibold text-base text-blueRibbon'>{t('home.number')}:</span>
							<span className='font-normal text-lg'>{item?.room}</span>
						</div>
						<div className='inline-flex gap-2 items-center'>
							<span className='font-semibold text-base text-blueRibbon'>{t('home.nutrition2')}:</span>
							<div className='font-normal text-lg flex gap-2 items-center'>
								<span>{item?.meal}</span>
							</div>
						</div>
					</div>
				</div>

				<div className='container_main  px-[15px] w-full'>
					<div>
						<div className='p-[10px] bg-[#EBF0F5] dark:bg-[#141414] px-[15px] rounded-lg  items-center flex gap-3 justify-between w-full relative'>
							<div className=' dark:text-white'>
								<div className=' md:text-lg font-medium'>
									{item?.nights} {t('home.nights')}
								</div>
								<p className=' text-sm md:text-base font-normal'>
									{item?.adult + item?.child} {t('home.turist')} , 1 {t('home.number2')}
								</p>
							</div>
							<button
								onClick={() => {
									StorePrice(item);
								}}
								className='flex items-center gap-2 bg-[#235DFF] px-[10px] py-2 rounded-lg'
							>
								<p className={`font-medium md:text-xl    text-white`}>
									{loading ? (
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
			</section>
		</>
	);
};

export default InfoSelectingNumber;
