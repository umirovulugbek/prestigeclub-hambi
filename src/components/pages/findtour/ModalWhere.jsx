import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IMG_URL } from '../../../utils/api';
import { trackEvent } from '../../../utils/mixpanel';
import { ArrowRight, Back } from '../../itemIcon';
import ModalBottom from '../../modal/ModalBottom';
import LazyImage from '../../ui/LazyImage';

const ModalWhere = ({
	modalWhere,
	setModalWhere,
	list = [],
	setObj,
	setObjError,
	obj,
	towns = [],
	setCheckedItems,
	getTowns,
	getDepartureDate,
	setDepartureDateList,
	setModalDepartureDate,
	darkmode,
	setModalNumberOfTourists,
	showCity,
	setShowCity,
	Setdeparture,
	departure,
}) => {
	const [showUzb, setShowUzb] = useState(false);
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { loading, towns_loading } = useSelector(s => s);

	const handleSet = (name, id, somo_id, tour_operator_id, state_id) => {
		getTowns(somo_id, tour_operator_id, state_id);
		Setdeparture({
			somo_id: somo_id,
			tour_operator_id: tour_operator_id,
			state_id: state_id,
		});
		setObj(pV => ({
			...pV,
			where: name,
			departure_date: '',
			number_of_days: '',
		}));
		setDepartureDateList([]);
		setObjError(pV => ({
			...pV,
			where: false,
		}));
	};
	const handleSetUzb = id => {
		navigate(`/tour-uzbekistan/${id}`);
		setShowCity(false);
	};

	return (
		<div className='w-full'>
			<ModalBottom
				close={() => {
					setModalWhere(false);
					setShowCity(false);
					setShowUzb(false);
					setCheckedItems([]);
					setObj(pV => ({
						...pV,
						where: '',
					}));
				}}
				modal={modalWhere}
				heightModal='min-h-[35vh] max-h-[90vh] '
				btnShow={false}
				textBtn={t('home.find')}
				translateY='translate-y-[80vh]'
				content={
					showCity ? (
						<div className='w-full '>
							<div className='flex items-center  w-full gap-3'>
								<Back
									fill={darkmode ? '#fff' : '#141414'}
									onClick={() => {
										setShowCity(false);
										setShowUzb(false);
										setCheckedItems([]);
										Setdeparture({});
									}}
									className=''
								/>
								<p className='font-medium text-xl dark:text-white'>{t('home.city')}</p>
								<div></div>
							</div>
							<div className='pt-[20px] pb-[30px]'>
								<div className='flex flex-col space-y-2'>
									{towns_loading ? (
										<>
											<label className='flex justify-between items-center gap-3 px-3 bg-white  dark:bg-[#272829] rounded-xl dark:border-[#4B4B59] py-[15px] last:border-none space-x-2 cursor-pointer'>
												<Skeleton width={200} height={23} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
												<ArrowRight fill={darkmode ? '#B3B7CE' : '#141414'} />
											</label>
										</>
									) : (
										<>
											{towns.map(item => (
												<label
													key={item.value}
													onClick={() => {
														const selectedItem = towns.find(itemm => itemm.value === Number(item?.value));
														setCheckedItems([selectedItem]);
														if (selectedItem?.somo_id) {
															setModalWhere(false);
															setModalNumberOfTourists(true);
															setShowCity(false);
														}
														trackEvent('search_query', { search_query: item?.label });
														getDepartureDate(item?.somo_id, departure?.tour_operator_id);
													}}
													className=' bg-white gap-3  flex flex-col  dark:bg-[#272829] rounded-xl  px-3  dark:border-[#4B4B59] py-[15px] last:border-none cursor-pointer'
												>
													<div className='flex justify-between items-center gap-3 space-x-2 cursor-pointer '>
														<div className='flex gap-2 items-center '>
															<LazyImage
																onError={e => {
																	e.target.src =
																		'https://cdn0.hitched.co.uk/vendor/4332/3_2/1280/png/frame-1_4_24332-169089063311545.webp';
																}}
																src={IMG_URL + item?.image}
																alt=''
																className='h-[40px] w-[70px] rounded-lg object-cover'
																classNameF='h-[40px] !w-[70px] '
															/>
															<span className='text-sm dark:text-white'>{item.label}</span>
														</div>
														<ArrowRight fill={darkmode ? '#B3B7CE' : '#141414'} />
													</div>
													{item?.description ? <div className='text-sm dark:text-white'>{item?.description} </div> : null}
												</label>
											))}
										</>
									)}
								</div>
							</div>
						</div>
					) : showUzb ? (
						<div className='w-full  flex flex-col gap-3` '>
							<div className=' flex flex-col gap-3 '>
								<p className='font-medium  text-lg dark:text-white'>{t('home.selectDepartureCountry')}</p>
								{obj?.tour_uzb?.map((item, index) => (
									<div
										key={index}
										onClick={() => handleSetUzb(item?.id)}
										className='flex items-center justify-between gap-3 px-3  bg-white dark:bg-[#272829]  rounded-xl dark:border-[#4B4B59] py-[15px] last:border-none cursor-pointer'
									>
										<div className='flex gap-2 items-center '>
											<LazyImage
												onError={e => {
													e.target.src = 'https://cdn0.hitched.co.uk/vendor/4332/3_2/1280/png/frame-1_4_24332-169089063311545.webp';
												}}
												src={'https://travel-api.bpm-tripusk.uz' + item?.main_image}
												alt=''
												className='h-[40px] w-[70px] rounded-lg object-cover'
												classNameF='h-[40px] !w-[70px] '
											/>
											<span className='text-sm dark:text-white'>{item.name}</span>
										</div>
										<ArrowRight fill={darkmode ? '#B3B7CE' : '#141414'} />
									</div>
								))}
							</div>
						</div>
					) : (
						<div className='w-full  flex flex-col gap-3` '>
							<div className=' flex flex-col gap-3 '>
								<p className='font-medium  text-lg dark:text-white'>{t('home.activeTours')}</p>
								{loading ? (
									<div className='flex flex-col gap-3'>
										<div className='flex items-center justify-between gap-3 px-3 bg-white  dark:bg-[#272829]  rounded-xl dark:border-[#4B4B59] py-[15px] last:border-none cursor-pointer'>
											<Skeleton width={200} height={23} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
											<ArrowRight fill={darkmode ? '#B3B7CE' : '#141414'} />
										</div>
									</div>
								) : (
									<>
										{list
											.concat({
												name: 'Uzbekistan',
												flag: '',
												somo_id: 0,
											})
											?.filter(item => item?.somo_id !== 31)
											?.map((item, index) => (
												<div
													key={index}
													onClick={() => {
														if (!item?.soon) {
															if (item?.somo_id === 0) {
																setShowUzb(true);
															} else {
																handleSet(
																	item?.name,
																	item?.id,
																	item?.town_from_id,
																	item?.somo_id === 13 ? 4 : item?.tour_operator_id,
																	item?.somo_id
																);
																setShowCity(true);
															}
														}
													}}
													className='flex items-center justify-between gap-3 px-3  bg-white dark:bg-[#272829]  rounded-xl dark:border-[#4B4B59] py-[15px] last:border-none cursor-pointer'
												>
													<div className='flex gap-2 items-center'>
														<img
															src={
																item?.somo_id === 43
																	? '/images/vietnam.svg'
																	: item?.somo_id === 10
																	? '/images/egypt.svg'
																	: item?.somo_id === 36
																	? '/images/azerbaijan.svg'
																	: item?.somo_id === 13
																	? '/images/oae.svg'
																	: item?.somo_id === 9
																	? '/images/turkey.svg'
																	: item?.somo_id === 29
																	? '/images/gruziya.svg'
																	: item?.somo_id === 66
																	? '/images/montenegro.svg'
																	: ''
															}
															alt=''
														/>
														<p className=' dark:text-white'>{item?.name}</p>
													</div>

													{item?.soon ? (
														<div className='bg-[#235DFF4D] px-[15px] py-[5px] rounded-[10px] text-[#1E2344] text-sm dark:text-white'>
															{t('home.comingSoon')}
														</div>
													) : (
														<ArrowRight fill={darkmode ? '#B3B7CE' : '#141414'} />
													)}
												</div>
											))}
									</>
								)}
							</div>
							<div className='flex flex-col gap-3'>
								<p className='font-medium  text-lg dark:text-white mt-2'>{t('home.comingSoonAvailable')}</p>
								<div className=' opacity-60 flex flex-col  gap-3  pb-[20px]	'>
									{[
										{
											name: 'Китай',
											flag: '/images/china.svg',
										},
										{
											name: 'Индонезия (Бали)',
											flag: '/images/indonesia.svg',
										},
									]?.map((item, index) => {
										return (
											<div
												className='flex items-center justify-between gap-3 px-3  bg-white dark:bg-[#272829]  rounded-xl dark:border-[#4B4B59] py-[15px] last:border-none '
												key={index}
											>
												<div className='flex gap-2 items-center'>
													<img src={item?.flag} alt='' />
													<p className=' dark:text-white'>{item?.name}</p>
												</div>
												<ArrowRight fill={darkmode ? '#B3B7CE' : '#141414'} />
											</div>
										);
									})}
								</div>
							</div>
						</div>
					)
				}
			/>
		</div>
	);
};

export default ModalWhere;
