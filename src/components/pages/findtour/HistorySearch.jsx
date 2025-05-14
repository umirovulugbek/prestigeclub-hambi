import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Axios from '../../../utils/httpsClinet';
import { trackEvent } from '../../../utils/mixpanel';
import { planIcon } from '../../homeS3Icon';

const HistorySearch = () => {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchData();
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	const fetchData = () => {
		setLoading(true);
		Axios()
			.get(`api/v1/search-v2/get-search-history`)
			.then(r => {
				let data = r?.data?.data;
				setItems(data);
			})
			.catch(e => {
				console.log(e);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const formatDateRange = (checkin, nights) => {
		if (!checkin) {
			console.error('checkin is undefined');
			return '';
		}

		const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

		const year = parseInt(checkin.slice(0, 4));
		const month = parseInt(checkin.slice(4, 6)) - 1; // JS months are 0-indexed
		const day = parseInt(checkin.slice(6, 8));

		if (isNaN(year) || isNaN(month) || isNaN(day)) {
			console.error('Invalid date format in checkin:', checkin);
			return '';
		}

		const checkinDate = new Date(year, month, day);
		const checkoutDate = new Date(checkinDate);
		checkoutDate.setDate(checkinDate.getDate() + nights);

		const getFormattedDate = date => date.getDate();
		const getMonthName = date => months[date.getMonth()];

		return `${getFormattedDate(checkinDate)}-${getFormattedDate(checkoutDate)} ${getMonthName(checkinDate)}`;
	};

	const formattedDates = items?.map(item => (item.filter?.checkin && item.filter?.nights ? formatDateRange(item.filter.checkin, item.filter.nights) : ''));

	return (
		<div>
			<div className='container_main !px-0'>
				{items?.length > 0 ? <p className=' text-base font-medium  mb-[10px] px-[15px] dark:text-white'>{t('home.history_search')}</p> : null}{' '}
				<div className='overflow-x-auto mx-[15px]'>
					<div className='flex w-full gap-1.5'>
						{items?.map((item, index) => {
							const filter = {
								town_from_inc: item?.town_from_id,
								tour_operator_id: item?.tour_operator_id,
								state_id: item?.state_to_id,
								checkin: item?.checkin,
								nights: item?.nights,

								adult: item?.adult,
								childs: item?.child,
								tour_somo_id: item?.tour_somo_id,
								// ages: ages.map(item => item),
							};

							const searchParams = new URLSearchParams();
							Object?.entries(filter).forEach(([key, value]) => {
								if (key.startsWith('town[')) {
									searchParams.append('towns[]', value);
								} else {
									searchParams.append(key, value);
								}
							});

							const queryString = searchParams
								.toString()
								.replace(/%5B%5D/g, '[]')
								.replace(/%5B0%5D/g, '[]');

							return (
								<div
									onClick={() => {
										trackEvent('Homepage_top_history');
										navigate(`/hotels/result?${queryString}`);
									}}
									key={index}
									className=' cursor-pointer'
								>
									<div
										className={`min-w-[250px] max-w-[250px] whitespace-normal text-blueWood dark:text-white bg-white p-2.5  rounded-lg   dark:bg-[#272829] 
										`}
									>
										{item?.town_from_name || item?.town_from_name?.length > 0 ? (
											<div className='flex justify-between gap-3'>
												<div className='flex gap-[10px] items-start'>
													<p className='text-base font-normal'>{item?.town_from_name ? item?.town_from_name : 'Вылет из'}</p>
													<p className='mt-[7px]'>{planIcon}</p>
													{item?.state_to_name ? (
														<>
															<p
																className='text-base font-normal break-all line-clamp-1'
																// gi
																key={index}
															>
																{item?.state_to_name}
															</p>
														</>
													) : (
														<p className='text-base font-normal break-all' key={index}>
															{t('home.where')}
														</p>
													)}
												</div>
											</div>
										) : (
											<div className='flex justify-between gap-3'>
												<div className='flex gap-[10px] items-center'>
													<p className='text-base font-normal'>{t('home.deporment_from')}</p>
													<p className=''>{planIcon}</p>
													<p className='text-base font-normal'>{t('home.where')}</p>
												</div>
											</div>
										)}
										<div className='whitespace-nowrap mr-8 text-sm font-normal mt-2 text-[#76787A]'>
											{formattedDates[index] ? formattedDates[index] + ',' : ''} {item?.adult} {t('home.adult2')}, {item?.child} {t('home.child2')}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				{/* {items?.length > 0 ? (
          <div className="overflow-x-auto">
            <HorizontalInfiniteScroll
              dataLength={items.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<p className="text-center">No more items</p>}
              style={{ overflowX: "auto" }}
              scrollableTarget="scrollableDiv"
            >
              <div className="whitespace-nowrap flex w-full gap-1.5">
                {items.map((item, index) => (
                  <div key={index} className="m-4 p-4 border rounded-lg">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </HorizontalInfiniteScroll>
          </div>
        ) : (
          ""
        )} */}
			</div>
		</div>
	);
};

export default HistorySearch;
