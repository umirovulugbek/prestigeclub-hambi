import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Back } from '../../components/itemIcon';
import HeaderDetailParams from '../../components/main/HeaderDetailParams';
import GetReviewWidget from '../../components/main/widget';
import MapModal from '../../components/pages/findtour/MapModal';
import ButtonMain from '../../components/ui/ButtonMain';
import Title from '../../components/ui/Title';
import LoadingMain from '../../components/ui/loading';
import { PriceFormat } from '../../utils/PriceFormat';
import Axios from '../../utils/httpsClinet';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Styles
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import TourIncludes from '../../components/main/TourIncludes';
import LazyImage from '../../components/ui/LazyImage';
import { IMG_URL } from '../../utils/api';
import { getSearchParams } from '../../utils/function';
import { trackEvent } from '../../utils/mixpanel';

const HotelDetail = ({ darkmode }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [anotherObj, setAnotherObj] = useState({});
	const [loading_f, setLoadingF] = useState(false);
	const [favouriteId, setFavouriteId] = useState(0);
	const [favourites, setFavourites] = useState([]);
	const [map_modal, setMapModal] = useState(false);
	const [hotel_review, setHotelReview] = useState([]);
	const [rating, setRating] = useState([]);
	const [loading, setLoading] = useState(false);
	const [strParams, setStrParams] = useState('');
	const [itemObj, setItemObj] = useState({});
	let settings = {
		infinite: itemObj?.photos?.length === 1 ? false : true,
		dots: false,
		speed: 700,
		slidesToShow: 1,
		slidesToScroll: 1,
		spaceBetween: 30,
		autoplay: itemObj?.photos?.length === 1 ? false : true,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
		appendDots: dots => (
			<div>
				<ul style={{ margin: '0px' }}> {dots} </ul>
			</div>
		),
		customPaging: i => <div className='custompage'></div>,
	};

	useEffect(() => {
		let searchParams = window.location.search;

		fetchData(searchParams);
		setStrParams(searchParams);

		getFavourites();

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	useEffect(() => {
		const paramsObject = getSearchParams();

		if (paramsObject?.town_from_inc && paramsObject?.tour_operator_id) {
			setAnotherObj(pV => ({
				...pV,
				hotel_key: paramsObject?.hotel_key,
			}));
			// getRating(Number(paramsObject?.hotel_key));
		}

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	const fetchData = searchParams => {
		setLoading(true);
		Axios()
			.get(`api/v1/somo-travel/tour-prices-hotel-info2${searchParams === undefined ? strParams : searchParams}`)
			.then(r => {
				let data = r?.data?.data;
				setHotelReview(r?.data?.data?.reviews);
				setRating(r?.data?.data?.detail?.subratings);
				setItemObj(data);
			})
			.catch(e => {
				setItemObj({});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const changeFavourite = id => {
		setLoadingF(true);
		setFavouriteId(id);
		Axios()
			.post(`api/v1/search-v2/like-prices`, { price_id: id })
			.then(res => {
				const isFavorited = favourites?.some(fav => fav.price_id === id);
				if (isFavorited) {
					setFavourites(favourites?.filter(favid => favid?.price_id !== id));
				} else {
					setFavourites([...favourites, { price_id: id }]);
				}
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setLoadingF(false);
			});
	};

	const getFavourites = () => {
		Axios()
			.get(`api/v1/search-v2/get-like-prices`)
			.then(res => {
				let data = res?.data?.data;
				let newD = [];
				data?.forEach(el => {
					newD = [
						...newD,
						{
							price_id: el?.id,
						},
					];
				});
				setFavourites(newD);
			});
	};
	const isAddedToFavourite = favourites?.some(d => d.price_id === itemObj?.id);

	return (
		<>
			{loading ? (
				<LoadingMain />
			) : (
				<div className={`min-h-screen pb-[86px]  bg-neutralSand dark:bg-[#141414]`}>
					<div className='container_main !px-0 '>
						<div className='fixed container_main  z-999 w-full bg-white dark:bg-[#272829] rounded-bl-[20px] rounded-br-[20px]  h-[75px] mb-[14px] p-[15px]'>
							<div className='flex items-center w-full  gap-[10px] '>
								<Back fill={darkmode ? '#fff' : '#141414'} onClick={() => navigate(-1)} className='-translate-x-[15px]' />
								<HeaderDetailParams darkmode={darkmode} />
							</div>
						</div>
					</div>
					<div className='pt-[90px] !px-0 container_main'>
						<div className=' rounded-[15px] bg-white p-[10px] pt-[15px]  dark:bg-[#272829] overflow-hidden'>
							<div className='  container_main !px-0 relative overflow-hidden '>
								<>
									{itemObj?.photos?.length > 0 ? (
										<div
											onClick={() => {
												trackEvent('hotel_info_img');
												navigate('/hotels/detail/gallery/' + window.location.search);
											}}
										>
											<Slider {...settings}>
												{itemObj?.photos?.map((item, index) => {
													return (
														<LazyImage
															onError={e => {
																e.target.src =
																	'https://cdn0.hitched.co.uk/vendor/4332/3_2/1280/png/frame-1_4_24332-169089063311545.webp';
															}}
															key={index}
															src={item?.full_path}
															className='w-full h-[239px] object-cover '
															alt=''
														/>
													);
												})}
											</Slider>
										</div>
									) : (
										<Skeleton height={250} style={{ borderRadius: '15px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
									)}
								</>

								<div className='absolute z-20 top-[16.5px] left-[16.5px] inline-flex gap-1 items-center bg-white rounded-[10px] px-[8.5px] py-[5.5px]'>
									<img src='/images/star.svg' alt='' />
									<p className='font-medium text-sm'>{itemObj?.star_alt}</p>
								</div>
								{itemObj?.detail?.awards?.length > 0 ? (
									<div className=' absolute right-[16.5px] bottom-[16.5px]'>
										<img src='/images/tchotel.png' alt='' className='h-[65px] w-[60px]' />
									</div>
								) : null}
							</div>
							<div className='flex flex-col gap-[15px] mt-[20px] mb-[15px] '>
								<Title darkmode={darkmode} className={'!my-0  !block'} size='[20px]' text={itemObj?.detail?.name + ' ' + itemObj?.star} />

								<div className='  flex  overflow-x-scroll gap-2  '>
									{itemObj?.nearbyItems?.map((item, index) => {
										return (
											<div
												key={index}
												className='text-[#76787A] whitespace-nowrap bg-[#EBF0F5] dark:bg-[#141414]  dark:text-white font-normal h-[34px] text-base text-start flex justify-center items-center px-3 rounded-3xl'
											>
												{item?.title}
											</div>
										);
									})}
								</div>
								<div className=' flex flex-col gap-2 '>
									{itemObj?.detail?.location?.longitude ? (
										<span
											className=' relative '
											style={{
												backgroundImage: 'url(`/images/bg-map.png`)',
											}}
										>
											<div className='relative'>
												<img src='/images/bg-map.png' alt='Map' className='w-full h-[58px] object-cover' />
												<button
													onClick={() => {
														setMapModal(true);
														trackEvent('hotel_info_map');
													}}
													className='absolute  text-xs flex justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#235DFF] h-[28px] text-white px-4 py-2 rounded-lg shadow-md'
												>
													<span className='flex items-center gap-2'>
														<svg width='10' height='14' viewBox='0 0 10 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
															<path
																d='M4.47917 13.2337C0.677083 7.90683 0 7.34878 0 5.37024C0 2.68146 2.21354 0.5 5 0.5C7.76042 0.5 10 2.68146 10 5.37024C10 7.34878 9.29688 7.90683 5.49479 13.2337C5.26042 13.5888 4.71354 13.5888 4.47917 13.2337ZM5 7.39951C6.14583 7.39951 7.08333 6.51171 7.08333 5.37024C7.08333 4.25415 6.14583 3.34098 5 3.34098C3.82812 3.34098 2.91667 4.25415 2.91667 5.37024C2.91667 6.51171 3.82812 7.39951 5 7.39951Z'
																fill='white'
															/>
														</svg>
														{t('home.view_from_map')}
													</span>
												</button>
											</div>
										</span>
									) : null}
									<Title
										darkmode={darkmode}
										size='[16px]'
										className='flex !my-0 !mt-0 !items-start text-center '
										weight='normal'
										classNameIcon='mt-1'
										text={itemObj?.detail?.location?.address_string}
									/>
								</div>
							</div>
						</div>
					</div>
					{itemObj?.widget ? (
						<div className=' py-[3.5px] mt-[15px]  container_main !px-0'>
							<GetReviewWidget widgetId={itemObj?.widget} />
						</div>
					) : null}
					{/* <div className='container_main !px-0'>
				<div className='bg-white !mt-[15px]  dark:bg-[#272829] py-[13px]   flex-col flex  justify-center rounded-[5px] mx-[10px] px-[10px]  gap-3'>
					<div className='flex   gap-[20px] items-center'>
						<AudioPlayer />
					</div>
					<img src='/images/linedashed.svg' className=' object-cover h-[0.5px] ' alt='' />
					<h4 className='text-[#141414] font-medium text-[15px] text-center dark:text-white'>{'Узнай всю информацию об отеле в аудио'}</h4>
				</div>
				</div> */}
					<section className='!mt-[15px] flex flex-col gap-[15px]  reating bg-white dark:bg-[#272829] container_main  p-[15px] rounded-[15px]'>
						{itemObj?.detail?.ratings ? (
							<div className='flex justify-between '>
								<div className='flex items-center gap-2'>
									<div className=' font-medium text-4xl text-[#141414] dark:text-white'>{itemObj?.detail?.ratings?.overall}</div>
									<div className='flex flex-col  justify-between'>
										<h4 className=' font-normal text-dark dark:text-white'>{t('home.rating_and_comment')}</h4>
										<img src={IMG_URL + itemObj?.detail?.ratings?.rating_image} alt='' />
									</div>
								</div>
								{darkmode ? <img src='/images/tripadvisor-white.svg' alt='' /> : <img src='/images/tripadvisor.svg' alt='' />}{' '}
							</div>
						) : null}
						{itemObj?.detail?.subratings?.length > 0 ? (
							<div className=' grid grid-cols-2 gap-3'>
								{loading ? (
									<div>
										<div className='flex gap-1'>
											<Skeleton height={24} style={{ borderRadius: '15px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
											<Skeleton height={24} style={{ borderRadius: '15px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
										</div>
									</div>
								) : (
									<>
										{itemObj?.detail?.subratings?.map((item, index) => {
											return (
												<div className='flex flex-col gap-1 ' key={index}>
													<p className='dark:text-white text-[#141414]'>{item?.localized_name}</p>
													<img className=' max-h-[14px] min-h-[14px]  w-max' src={IMG_URL + item?.rating_image_url} alt='' />
												</div>
											);
										})}
									</>
								)}
							</div>
						) : null}
						<div
							onClick={() => {
								navigate(`/hotels/detail/comment${window.location.search}`);
								trackEvent('hotel_info_rew');
							}}
							className='text-[#141414]  rounded-lg font-medium bg-[#C5D2E0] dark:bg-[#C5D2E0] h-[55px] flex justify-center items-center text-[17px]   text-center cursor-pointer'
						>
							{t('home.view_all_comment')}
						</div>
					</section>

					<div className='container_main !px-0 !mt-[15px]'>
						<TourIncludes />
					</div>
					{itemObj?.nearbyItems?.length > 0 ? (
						<div className='container_main !mt-[15px] flex  flex-col gap-1 py-[15px] bg-white dark:bg-[#272829] rounded-[15px]'>
							<p className='text-lg text-center leading-[35px] font-normal dark:text-white text-[#141414]'>{t('home.nearby')}</p>
							<div className='flex flex-col gap-3 text-sm '>
								{itemObj?.nearbyItems?.map((item, index) => {
									return (
										<div className='flex flex-col leading-[18px] gap-[1px]'>
											<div className='text-[#141414] dark:text-white font-medium' key={index}>
												{item?.distance} - {item?.title}
											</div>
											<div className='text-[#76787A]'>{item?.description}</div>
										</div>
									);
								})}
							</div>
						</div>
					) : (
						''
					)}
					{itemObj?.short_description ? (
						<div className='container_main !mt-[15px] flex items-center gap-1 flex-col py-[15px] bg-white dark:bg-[#272829] rounded-[15px]'>
							<p className='text-lg font-normal dark:text-white text-[#141414] leading-[35px] '>{t('home.description')}</p>
							<p className='text-sm font-normal  dark:text-white' dangerouslySetInnerHTML={{ __html: itemObj?.short_description }} />
						</div>
					) : (
						''
					)}

					{itemObj?.detail?.location?.longitude ? (
						<MapModal map_modal={map_modal} setMapModal={setMapModal} location={`${itemObj?.detail?.location?.latitude},${itemObj?.detail?.location?.longitude}`} />
					) : null}
					<>
						<div className='h-[60px] fixed bottom-0 left-0 z-[1030] w-full flex justify-center'>
							<div className={`container_main w-full flex items-center !px-0 ${darkmode ? '!bg-tuna' : ''}`}>
								<div className={`flex justify-between items-center w-full px-4 pb-8 pt-[15px] ${darkmode ? '!bg-tuna' : 'bg-white border-t border-[#dee7ff]'}`}>
									<div className='flex flex-col w-full gap-[5px]'>
										<Title
											darkmode={darkmode}
											color='blueRibbon'
											className='!my-0 text-[20px] !font-normal text-blueRibbon'
											text={`${PriceFormat(itemObj?.converted_price)} ${t('home.uzs')}`}
										/>
									</div>
									<ButtonMain
										onClick={() => {
											trackEvent('hotel_info_button');
											navigate(`/hotels/detail/hotelselectingnumber/${strParams}&hotel_key=${itemObj?.hotel_key}`);
										}}
										type='button'
										type_color='t_blue'
										text={t('home.select_numbers')}
										className='min-w-[170px] max-w-[170px] whitespace-nowrap !text-base'
									/>
								</div>
							</div>
						</div>
					</>
				</div>
			)}
		</>
	);
};

export default HotelDetail;
