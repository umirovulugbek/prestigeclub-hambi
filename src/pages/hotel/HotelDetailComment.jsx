import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import LightGallery from 'lightgallery/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { TranslateIcon } from '../../components/headIcons';
import { Back } from '../../components/itemIcon';
import LazyImage from '../../components/ui/LazyImage';
import LoadingMain from '../../components/ui/loading';
import { IMG_URL } from '../../utils/api';
import Axios from '../../utils/httpsClinet';
const HotelDetailComment = ({ darkmode }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [hotel_review, setHotelReview] = useState([]);
	const [expandedReviews, setExpandedReviews] = useState({});
	const [itemObj, setItemObj] = useState({});
	const [rating, setRating] = useState({});

	useEffect(() => {
		let searchParams = window.location.search;

		fetchData(searchParams);

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	const fetchData = searchParams => {
		setLoading(true);
		Axios()
			.get(`api/v1/somo-travel/tour-prices-hotel-info2${searchParams}`)
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

	const toggleExpandReview = index => {
		setExpandedReviews(prevState => ({
			...prevState,
			[index]: !prevState[index],
		}));
	};

	if (loading) {
		return <LoadingMain />;
	}

	return (
		<div className={` min-h-screen  ${darkmode ? 'bg-[#141414]' : 'bg-neutralSand'}`}>
			<div className='container_main !px-0'>
				<section className={`py-[10px] container_main  fixed top-0 z-999 w-full rounded-bl-[20px] rounded-br-[20px] h-[65px]  ${darkmode ? 'bg-[#272829]' : 'bg-white'}`}>
					<div className=''>
						<div className='flex items-center w-full'>
							<Back fill={darkmode ? '#fff' : '#141414'} onClick={() => navigate(-1)} className='-translate-x-[15px]' />
							<div className={`text-lg font-semibold flex w-full justify-center ${darkmode ? 'text-white' : 'text-blueWood'}`}>{t('home.comments')}</div>
							<div className='w-[40px]'></div>
						</div>
					</div>
				</section>
			</div>
			<div className=' container_main !p-0'>
				<div className='flex  pt-[65px] gap-[5px] items-center mt-3  justify-center'>
					<TranslateIcon fill={darkmode ? '#fff' : '#141414B2'} />
					<p className='text-[#141414B2] dark:text-white   text-sm'>{t('home.translate_from_english')}</p>
				</div>
				<div className='mt-3 rounded-[15px]   flex flex-col  gap-4'>
					<div>
						{itemObj?.detail?.ratings ? (
							<section className=' reating bg-white dark:bg-[#272829] container_main  p-[15px] rounded-[15px]'>
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
							</section>
						) : null}
					</div>
					<div className='bg-white dark:bg-[#141414] flex flex-col gap-[15px]  p-[15px]'>
						{hotel_review?.map((item, index) => {
							const isExpanded = expandedReviews[index];
							return (
								<React.Fragment key={index}>
									<div className={`  bg-[#EBF0F5] dark:bg-[#272829] p-[10px] rounded-lg  first:mt-0 ${darkmode ? '!text-white' : ''}`}>
										<div className='flex justify-between gap-4 items-center'>
											<div className='flex items-center w-full'>
												<LazyImage
													onError={e => {
														e.target.src = 'https://cdn0.hitched.co.uk/vendor/4332/3_2/1280/png/frame-1_4_24332-169089063311545.webp';
													}}
													src={IMG_URL + item?.owner_response?.rating_image_url}
													classNameF=' !rounded-full !min-w-[50px] !max-w-[50px] h-[50px] '
													className='w-[50px] h-[50px] rounded-full object-cover'
													alt=''
												/>
												<div className='flex justify-between items-center w-full'>
													<div>
														<p className='font-medium text-base ml-[14px]'>
															{item?.owner_response?.author ? item?.owner_response?.author : t('home.anonymous')}
														</p>
														<p className='font-normal text-sm flex'>
															<img src={IMG_URL + item?.rating_image_url} alt='' />
														</p>
													</div>
													<div>{item?.published_date?.slice(0, 10)}</div>
												</div>
											</div>
										</div>
										<p></p>
										<p className='font-semibold text-base mt-[10px]'>{item?.title}</p>
										<p className='font-normal text-sm mt-[5px]'>
											{isExpanded ? item?.review_text : item?.review_text?.slice(0, 400)}
											{item?.review_text?.length > 400 ? (
												<span className='text-[#235DFF] font-medium cursor-pointer ' onClick={() => toggleExpandReview(index)}>
													{isExpanded ? t('home.collapse') : t('home.more')}
												</span>
											) : null}
										</p>
										{item?.images?.length > 0 ? (
											<LightGallery plugins={[lgThumbnail]} elementClassNames='!flex gap-[10px] mt-[10px] overflow-x-scroll'>
												{item?.images?.map((item_img, index) => {
													return (
														<a key={index} href={item_img?.image_url}>
															<img
																src={item_img?.image_url}
																alt={'img'}
																className='min-w-[75px] min-h-[75px] max-w-[75px] max-h-[75px] rounded-[10px] object-cover'
															/>
														</a>
													);
												})}
											</LightGallery>
										) : null}
									</div>
								</React.Fragment>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HotelDetailComment;
