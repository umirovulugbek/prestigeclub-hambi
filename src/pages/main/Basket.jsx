import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import HotelCard from '../../components/card/HotelCard';
import MobileTab from '../../components/main/mobiletab';
import Axios from '../../utils/httpsClinet';

const Basket = ({ darkmode }) => {
	const [data, setData] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loading_f, setLoadingF] = useState(false);
	const [favouriteId, setFavouriteId] = useState(0);
	const [strParams, setStrParams] = useState('');
	const navigate = useNavigate();
	const { t } = useTranslation();
	useEffect(() => {
		getFavourites();
		getFavouritesList();
	}, [favouriteId]);

	const changeFavourite = id => {
		setLoadingF(true);
		setFavouriteId(id);
		Axios()
			.post(`api/v1/search-v2/like-prices`, { price_id: id })
			.then(res => {
				const isFavorited = favourites.some(fav => fav.price_id === id);
				if (isFavorited) {
					setFavourites(favourites.filter(favid => favid?.price_id !== id));
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
		setLoading(true);
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
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const getFavouritesList = () => {
		setLoading(true);
		Axios()
			.get(`api/v1/search-v2/get-like-prices-data`)
			.then(res => {
				setData(res?.data?.data?.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const colors = ['#FF5733', '#33FF57', '#3B71FE', '#0096FF', '#FFC273'];

	return (
		<div className='bg-[#EBF0F5]  dark:bg-[#141414]  pb-28'>
			<div className=' container_main !px-0'>
				<div className='bg-white dark:bg-[#272829]  text-[#141414] dark:text-white text-lg font-normal py-[20px] text-center'>{t('home.choose')}</div>
				<div className=' min-h-[85vh] mt-[25px] dark:text-white'>
					{loading ? (
						<div className='flex flex-col gap-3'>
							{[...Array(5)].map((_, index) => (
								<Skeleton key={index} width={'100%'} height={200} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
							))}
						</div>
					) : (
						<>
							{/* data */}
							{[].map((item, index) => {
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

								return <HotelCard item={item} key={index} darkmode={darkmode} />;
							})}
						</>
					)}
				</div>

				<MobileTab darkmode={darkmode} />
			</div>
		</div>
	);
};

export default Basket;
