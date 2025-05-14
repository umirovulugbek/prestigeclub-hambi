import { MarkerClusterer } from '@googlemaps/markerclusterer';
import GoogleMapReact from 'google-map-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Back } from '../components/itemIcon';
import ModalBottom from '../components/modal/ModalBottom';
import Title from '../components/Title';
import { formatCompactNumber } from '../utils/function';
const defaultCenter = {
	lat: 41.2995,
	lng: 69.2401,
};

const SearchMap = ({ darkmode, setModalMap, items, loading, isError }) => {
	const navigate = useNavigate();

	const [modal, setModal] = useState(false);
	const [item, setItem] = useState(null);
	const { t } = useTranslation();
	const center = items?.length
		? {
				lat: Number(items[0]?.hotel?.hotel_detail?.latitude) || defaultCenter.lat,
				lng: Number(items[0]?.hotel?.hotel_detail?.longitude) || defaultCenter.lng,
		  }
		: defaultCenter;
	const createCustomMarker = price => {
		return {
			url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
				`<svg xmlns="http://www.w3.org/2000/svg" width="130" height="45">
          <rect x="0" y="0" width="115" height="28" rx="6" fill="#1E3A8A" />
          <text x="55" y="16" font-size="15" font-family="Arial" fill="white" text-anchor="middle" alignment-baseline="middle">${formatCompactNumber(price)} so'm</text>
          <polygon points="20,20 50,20 40,40" fill="#1E3A8A" />
        </svg>`
			)}`,
			scaledSize: { width: 120, height: 45 },
		};
	};

	const renderMarkers = (map, maps, items) => {
		const markers = [];

		items?.forEach(hotel => {
			const marker = new maps.Marker({
				position: {
					lat: Number(hotel?.hotel?.hotel_detail?.latitude),
					lng: Number(hotel?.hotel?.hotel_detail?.longitude),
				},
				map,
				icon: createCustomMarker(hotel?.converted_price_number),
			});
			marker.addListener('click', () => {
				setItem(hotel);
				setModal(true);
			});
			markers.push(marker);
		});
		new MarkerClusterer({ markers, map });
	};

	if (loading) {
		return <div className='absolute left-0 bottom-0 top-0 right-0 bg-[#09101D99] flex justify-center items-center z-9999 text-white'>...loading</div>;
	}

	return (
		<div className='flex flex-col relative'>
			<button
				onClick={() => {
					setModalMap(false);
				}}
				className='  absolute  top-3 left-3 z-999 cursor-pointer   dark:text-white  bg-white dark:bg-[#141414]'
			>
				<Back fill={darkmode ? '#fff' : '#141414'} className='' />
			</button>
			<div style={{ height: '100vh', width: '100vw' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: 'AIzaSyCSMfF7b-Kc8YtKBU4rj0qo2BBlrOxRKbs' }}
					defaultCenter={center}
					defaultZoom={11}
					options={{ gestureHandling: 'greedy' }}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => {
						renderMarkers(map, maps, items);
					}}
				/>
			</div>

			<ModalBottom
				close={() => setModal(false)}
				setModal={setModal}
				modal={modal}
				btnShow={false}
				darkmode={darkmode}
				content={
					<div className=' flex gap-[10px] p-3	 mb-[15px] mt-[15px] overflow-hidden w-full rounded-[18.07px] bg-white dark:bg-[#272829]'>
						<div className='relative h-[132px] min-w-[150px]  max-w-[150px] overflow-hidden'>
							{item?.hotel?.photos?.length > 0 ? (
								<img src={item?.hotel?.photos[3]?.full_path} loading='lazy' className='w-full h-full object-cover rounded-[18.07px]' alt='' />
							) : (
								<img
									onError={e => {
										e.target.src = 'https://cdn0.hitched.co.uk/vendor/4332/3_2/1280/png/frame-1_4_24332-169089063311545.webp';
									}}
									loading='lazy'
									src={item?.hotel?.image_url}
									className='w-full h-full object-cover  rounded-[18.07px]'
									alt=''
								/>
							)}
							<div className='absolute z-20 top-2 left-2 inline-flex gap-1 items-center bg-white rounded-[10px] px-[8.5px] py-[5.5px]'>
								<img src='/images/star.svg' alt='' />
								<p className='font-medium text-sm'>{item?.hotel?.star}</p>
							</div>
						</div>

						<div className=' flex flex-col  justify-between'>
							<div>
								<Title
									darkmode={darkmode}
									size='[17px]'
									weight='medium'
									className=' cursor-pointer hover:underline   line-clamp-1  !my-0 !block !text-[#141414]'
									text={item?.hotel?.name}
									color='#141414'
									className_span='  line-clamp-1'
									onClick={() => {
										navigate(
											`/hotels/detail/${window.location.search}&catclaim=${item?.id}&hotel_key=${item?.hotel_key}&converted_price=${item?.converted_price_number}`
										);
									}}
								/>

								<p className=' text-base font-normal dark:text-white'>
									{item?.hotel?.state?.name} {item?.hotel?.town?.name ? ', ' + item?.hotel?.town?.name : null}
								</p>
								{item?.rating?.[0]?.rating ? (
									<div className=' inline-flex gap-10  items-center text-white bg-white dark:bg-[#272829] rounded-[10px] h-[30px] py-[10px]'>
										<div className='flex gap-[5px] '>
											<div className=' text-[#141414] dark:text-white text-[17px] font-normal'>{item?.rating?.[0]?.rating}</div>
											{darkmode ? <img className='pl-1' src='/images/tripadvisor-white.svg' alt='' /> : <img src='/images/tripadvisor.svg' alt='' />}{' '}
										</div>
									</div>
								) : null}
							</div>
							<div className=' flex gap-3 justify-between w-full relative'>
								<div className='flex items-center gap-3'>
									<p className={`font-medium text-xl ${darkmode ? 'text-[#235DFF]' : 'text-[#235DFF]'}`}>
										{item?.converted_price_number?.toLocaleString()} {t('home.uzs')}
									</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default SearchMap;
