import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Back } from '../../components/itemIcon';
import LoadingMain from '../../components/loading';
import ModalBottom from '../../components/modal/ModalBottom';
import PrestigeBanner from '../../components/PrestigeBanner';
import ButtonMain from '../../components/ui/ButtonMain';
import ArrowBroneIcon from '../../svg/ArrowBroneIcon';
import SubtractIcon from '../../svg/SubtractIcon';
import { IMG_URL } from '../../utils/api';
import { getSearchParams } from '../../utils/function';
import Axios from '../../utils/httpsClinet';
import { trackEvent } from '../../utils/mixpanel';
import { PriceFormat } from '../../utils/PriceFormat';
import BroneForm from './BroneForm';

const getHotelTourBooking = async (id, tour_operator_id) => {
	const { data } = await Axios().get(`api/v1/search/service/broninit2?id=${id}&tour_operator_id=${tour_operator_id}`);
	return data;
};

const useHotelTourBooking = (id, tour_operator_id) => {
	return useQuery({
		queryKey: ['hotelTourBooking', id, tour_operator_id],
		queryFn: () => getHotelTourBooking(id, tour_operator_id),
		enabled: !!id && !!tour_operator_id,
		staleTime: 1000 * 60 * 5,
		cacheTime: 1000 * 60 * 10,
		refetchOnWindowFocus: false,
	});
};

const HotelTourBookingBrone = ({ darkmode }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const paramsObject = getSearchParams();
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const { data, isLoading, isError, isFetching, refetch } = useHotelTourBooking(id, paramsObject?.tour_operator_id);
	const { user, formsData } = useSelector(s => s);
	const [modal, setModal] = useState(false);
	const [update_price, setUpdatePrice] = useState(true);
	const [time, setTime] = useState(600);
	const [loading_bron, setLoadingBron] = useState(false);
	const [loading_promo, setLoadingPromo] = useState(false);
	const [soon_modal, setSoonModal] = useState(false);
	const [promo_value, setPromoValue] = useState('');
	const [promocode_modal, setPromocodeModal] = useState(false);
	const [errorText, setErrorText] = useState({});
	const [err_status, setErrStatus] = useState({});
	const [discount_amount, setDiscountAmount] = useState({ discount_amount: 0, status: 0 });

	useEffect(() => {
		if (time === 0) {
			setUpdatePrice(false);
		} else {
			const timer = setInterval(() => {
				setTime(prevTime => prevTime - 1);
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [time]);
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	useEffect(() => {
		if (!isLoading && !isError) {
			setUpdatePrice(true);
			setTime(600);
			if (!data?.data?.claimDocument) {
				setSoonModal(true);
			} else {
				setSoonModal(false);
			}
		}
		if (isError) setSoonModal(true);
	}, [data, isLoading, isError]);

	const formatTime = seconds => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	};

	const handleRefetch = () => {
		refetch({ exact: true }).then(() => {
			setSoonModal(false);
			setUpdatePrice(true);
			setTime(600);
		});
	};

	const SubmitPromo = e => {
		e.preventDefault();
		if (promo_value?.length > 0) {
			setLoadingPromo(true);
			Axios()
				.post('/api/v1/search/promo-code/check', { code: promo_value })
				.then(res => {
					setDiscountAmount({ discount_amount: res?.data?.discount_amount, status: res?.data?.status });
					setPromocodeModal(false);
					trackEvent('tour_bron_promo');
				})
				.catch(e => {
					setErrStatus({ ...err_status, promo_err: true });
					if (e?.response?.status === 400) {
						setErrorText(pv => ({
							...pv,
							promo_err: e?.response?.data?.message,
						}));
					}
				})
				.finally(() => {
					setLoadingPromo(false);
				});
		} else {
			setErrStatus({ ...err_status, promo_err: false });
			setPromocodeModal(false);
		}
	};

	const Finish = () => {
		let tt = true,
			fc = 0,
			err = {};
		const transformsData = data => {
			Object.keys(data)?.forEach((key, index) => {
				fc += 1;
			});
			return Object.keys(data)?.map(key => ({
				key: key,
				age: 'ADL',
				iid: '94559',
				identity_document: '0',
				sex: data[key].gender === 'female' ? 'FEMALE' : 'MALE',
				human: data[key]?.human,
				name: `${data[key]?.lastName} ${data[key].firstName}`,
				lname: `${data[key]?.lastName} ${data[key].firstName}`,
				born: data[key]?.birthDate,
				pserie: data[key]?.seria,
				pnumber: data[key]?.documentNumber,
				pexpire: data[key]?.validUntil,
				pgiven: data[key]?.docIssued,
				pgivenorg: 'БУЛУНГУРСКИЙ РОВД САМАРКАНДСКОЙ ОБЛАСТИ',
				nationality: data[key]?.citizenship?.label,
				nationalityKey: 35,
				bornplace: 'Узбекистан',
				bornplaceKey: 35,
			}));
		};

		let form_data = {
			promo_code: promo_value,
			data: {
				version: '3.0',
				groups: data?.data?.groups,
				notes: data?.data?.notes,
				variants: data?.data?.variants,
				checkFields: data?.data?.checkFields,
				claimDocument: data?.data?.claimDocument?.map(doc => ({
					...doc,
					peoples: [
						{
							people: transformsData(formsData),
						},
					],
					buyer: [
						{
							name: user?.user?.first_name ? user?.user?.first_name : 'SHODIBEK',
							pserie: 'FA',
							born: '2010-10-10',
							pnumber: '5330513',
							pgiven: '2015-05-16',
							pgivenorg: 'ГИЖДУВАНСКИЙ ГРОВД БУХАРСКОЙ ОБЛАСТИ',
							pgivencode: '8639',
							address: 'Tashkent',
							phone: user?.user?.phone_number ? user?.user?.phone_number : '+998909934987',
							email: user?.user?.email,
							mobile: user?.user?.phone_number ? user?.user?.phone_number : '+998909934987',
							nationality: 'Узбекистан',
							nationalityKey: '35',
							bornplace: 'Узбекистан',
							bornplaceKey: '35',
						},
					],
				})),
			},
		};
		if (data?.data?.claimDocument?.[0]?.peoples?.[0]?.people?.length > fc) {
			tt = false;
			err = { ...err, finish: false };
		} else {
			err = { ...err, finish: true };
		}
		if (tt) {
			setLoadingBron(true);
			Axios()
				.post(`api/v1/search/service/new-bron?id=${id}`, form_data)
				.then(res => {
					if (res?.status === 200) {
						window.location.href = res?.data?.payment_url;
					}
				})
				.catch(err => {
					if (
						err?.response?.data?.msg === 'Неизвестная ошибка системы онлайн бронирования туроператора. Повторите попытку через несколько минут.' &&
						err?.response?.status === 400
					) {
						setSoonModal(true);
						trackEvent('err_tour_booking');
					}
					if (err?.response?.status === 500) {
						setSoonModal(true);
						trackEvent('err_tour_booking');
					}
					setSoonModal(true);
					trackEvent('err_tour_booking');
				})
				.finally(() => {
					setLoadingBron(false);
				});
		} else {
		}
	};
	if (isFetching) {
		return (
			<LoadingMain
				text={
					<span
						dangerouslySetInnerHTML={{
							__html:
								i18n?.language === 'ru'
									? 'Готовим ваш тур для оформления.<br /> Осталось совсем немного — скоро всё будет готово для вашего идеального путешествия!'
									: 'Biz sizning sayohatingizni ro‘yxatdan o‘tishga tayyorlayapmiz.<br /> Juda oz qoldi – tez orada sizning mukammal sayohatingiz uchun hammasi tayyor bo‘ladi!',
						}}
					/>
				}
			/>
		);
	}
	return (
		<div className={`min-h-screen  dark:bg-[#141414] bg-[#F5F5F5]`}>
			<div className='container_main !px-0'>
				<section className={`py-[10px] container_main  rounded-bl-[20px] z-40 fixed w-full rounded-br-[20px] ${darkmode ? 'bg-[#272829]' : 'bg-white'}`}>
					<div className='flex items-center w-full'>
						<Back fill={darkmode ? '#fff' : '#141414'} onClick={() => navigate(-1)} />
						<div className={`text-lg flex w-full justify-center ${darkmode ? 'text-white' : 'text-blueWood'}`}>{t('home.tour_booking')}</div>
						<div className='w-[45px]'></div>
					</div>
					<div className='flex justify-center my-[15px] items-center'>
						<div className='flex  gap-2 items-center'>
							<div className='w-[30px] h-[30px]  rounded-full bg-[#F5F5F5] text-[#C4C8CC]  flex justify-center items-center'>1</div>
							<div className=' text-[#C4C8CC] '>{t('home.tour_details')}</div>
						</div>
						<div className='w-[60px] flex justify-center'>
							<ArrowBroneIcon />
						</div>

						<div className='flex  gap-2 items-center'>
							<div className='w-[30px] h-[30px]  rounded-full  bg-[#00AA6C]  text-white   flex justify-center items-center'>2</div>
							<div className='text-[#141414] dark:text-white font-medium'>{t('home.booking')}</div>
						</div>
					</div>
				</section>
			</div>
			<div className='container_main !px-[10px] flex flex-col gap-4  pb-4'>
				<div className=' pt-[140px] flex flex-col gap-[10px]'>
					<div className='bg-[#EBF2FF]  px-[20px] py-2 rounded-[10px] text-[#042B50] font-normal leading-[150%]  text-base flex gap-[11px] items-center  justify-center'>
						<div className='max-w-[25px]  max-h-[25px]'>
							<svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none'>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M13.2865 17.2354H11.724L11.7135 15.6729H13.2865V17.2354ZM11.7135 13.9302H13.276V7.76458H11.7135V13.9302ZM12.5 2.34375C6.9 2.34375 2.34375 6.9 2.34375 12.5C2.34375 18.1 6.9 22.6562 12.5 22.6562C18.1 22.6562 22.6562 18.1 22.6562 12.5C22.6562 6.9 18.1 2.34375 12.5 2.34375Z'
									fill='#235DFF'
								/>
							</svg>
						</div>
						<p className=' leading-[20px]'>{t('home.change_within_a_few_minutes')}</p>
					</div>
					<PrestigeBanner darkmode={darkmode} />
				</div>
				<div className='bg-[#EBF0F5] flex text-[15px] leading-[20px] font-medium  dark:bg-[#272829] dark:border-[#272829] text-[#00B849] items-center gap-2 mx-[10px] rounded-lg p-[15px]'>
					<SubtractIcon />
					{t('home.secure_booking_with_tour_guarantee_and_24_7_support')}
				</div>

				<div className='p-[15px] rounded-[15px] border bg-white border-[#EEEEEE] dark:bg-[#272829] dark:border-[#272829] flex flex-col gap-4'>
					<div className='flex  gap-[10px] items-center '>
						<div className='relative'>
							<img
								onError={e => {
									e.target.src = '/images/def_img.png';
								}}
								src={IMG_URL + data?.hotel_data?.main_photo || '/images/def_img.png'}
								alt=''
								className='min-w-[150px] max-w-[150px] h-[132px] object-cover rounded-[15px]'
							/>
							<div className='absolute z-20 top-[10px] left-[10px] inline-flex gap-1 items-center bg-white dark:bg-[#272829] dark:text-white rounded-[10px] px-[5px] py-1'>
								<img src='/images/star.svg' alt='' />
								<p className='font-medium text-sm'>{data?.hotel_data?.star_key}</p>
							</div>
						</div>
						<div className='flex flex-col gap-1 text-[#141414] dark:text-white'>
							<h2 className=' font-semibold text-[17px] line-clamp-1'> {data?.hotel_data?.detail?.name}</h2>
							<p className=' text-base font-normal'>
								{data?.hotel_data?.detail?.location?.country}, {data?.hotel_data?.detail?.location?.city}
							</p>
							<div className='flex gap-[5px] '>
								<div className=' text-[#141414] dark:text-white  font-medium'>{data?.hotel_data?.detail?.ratings?.overall}</div>
								{darkmode ? <img className='pl-2' src='/images/tripadvisor-white.svg' alt='' /> : <img src='/images/tripadvisor.svg' alt='' />}{' '}
							</div>
						</div>
					</div>
				</div>
				<section className={`py-[20px] rounded-[15px] ${darkmode ? 'bg-tuna text-white' : 'bg-white'}`}>
					<div className='container_main'>
						<p className=' text-center  text-lg mb-2'>{t('home.about_turist')}</p>
						<p>{t('home.adults')}:</p>
						{data?.data?.claimDocument?.[0]?.peoples?.[0]?.people
							?.filter(item => item?.age === 'ADL')
							?.map((item, index) => {
								return (
									<div
										key={index}
										onClick={() => {
											navigate(`/brone-form`);
											trackEvent('tour_bron_completion');
											setModal(true);
											dispatch({ type: 'SET_SELECTEDPERSON', payload: item });
										}}
										className='bg-[#235DFF26] dark:bg-[#141414] flex justify-between items-center gap-3 px-[15px] py-[10px] mt-[5px] cursor-pointer rounded-[15px]'
									>
										<p className={`font-normal text-base text-[#141414] dark:text-white `}>{item?.key}</p>
										<p className={`font-medium text-base text-[#141414] dark:text-white `}>
											{formsData?.[item?.key] ? (
												<>
													{formsData?.[item?.key]?.firstName} {formsData?.[item?.key]?.lastName} | {formsData?.[item?.key]?.seria}{' '}
													{formsData?.[item?.key]?.documentNumber}
												</>
											) : (
												<span className='!text-[#76787A] !font-normal'>{t('home.fill_in_the_detail')}</span>
											)}
										</p>
										<div className='w-[25px] h-[25px] rounded-full overflow-hidden'>
											{formsData?.[item?.key] ? (
												<img src='/images/greencheck.svg' className='w-full h-full' alt='' />
											) : (
												<div className='w-[25px] h-[25px] rounded-full overflow-hidden border border-[#14141480] dark:border-[#9E9E9E]' />
											)}
										</div>
									</div>
								);
							})}
					</div>

					{data?.data?.claimDocument?.[0]?.peoples?.[0]?.people?.filter(item => item?.age === 'CHD' || item?.age === 'INF')?.length > 0 ? (
						<div className='container_main !mt-3'>
							<p>
								{t('home.childs')} ({t('home.up_to_17_years')}):
							</p>
							{data?.data?.claimDocument?.[0]?.peoples?.[0]?.people
								?.filter(item => item?.age === 'CHD' || item?.age === 'INF')
								?.map((item, index) => {
									return (
										<div
											key={index}
											onClick={() => {
												trackEvent('tour_bron_completion');
												setModal(true);
												dispatch({ type: 'SET_SELECTEDPERSON', payload: item });
											}}
											className='bg-[#235DFF26] dark:bg-[#141414] flex justify-between items-center gap-3 px-[15px] py-[10px] mt-[5px] cursor-pointer rounded-[15px]'
										>
											<p className={`font-normal text-base text-[#141414] dark:text-white `}>{item?.key}</p>
											<p className={`font-medium text-base text-[#141414] dark:text-white `}>
												{formsData?.[item?.key] ? (
													<>
														{formsData?.[item?.key]?.firstName} {formsData?.[item?.key]?.lastName} | {formsData?.[item?.key]?.seria}{' '}
														{formsData?.[item?.key]?.documentNumber}
													</>
												) : (
													<span className='!text-[#9E9E9E] !font-normal'>{t('home.fill_in_the_detail')}</span>
												)}
												{/* seria , documentNumber */}
											</p>
											<div className='w-[25px] h-[25px] rounded-full overflow-hidden'>
												{formsData?.[item?.key] ? (
													<img src='/images/greencheck.svg' className='w-full h-full' alt='' />
												) : (
													<div className='w-[25px] h-[25px] rounded-full overflow-hidden border border-[#14141480] dark:border-[#9E9E9E]' />
												)}
											</div>
										</div>
									);
								})}
						</div>
					) : null}
				</section>
			</div>
			<div className='container_main !px-[0px]'>
				{update_price ? (
					<section className={`py-[20px]  dark:bg-[#272829]  bg-white rounded-tl-[15px] rounded-tr-[15px]  ${darkmode ? '' : ''}`}>
						<div className='container_main'>
							<div className='flex flex-col gap-[15px]'>
								<div className='flex justify-between'>
									<div className='text-[#141414] text-lg dark:text-white'>{t('home.payment_for_tour')}</div>
									<div className='dark:text-white'>{formatTime(time)}</div>
								</div>
								<img src='/images/linedashed.svg' className='w-full object-cover h-[0.5px] ' alt='' />
								{discount_amount?.discount_amount > 0 ? (
									<div className='flex justify-between text-lg'>
										<div className='text-[#14141407] font-normal dark:text-white'>
											{t('home.promocode')} ({promo_value})
										</div>
										<div className='text-[#00CC52]'>
											- {PriceFormat(discount_amount?.discount_amount)} {t('home.uzs')}
										</div>
									</div>
								) : null}
								<div className='flex justify-between w-full items-center gap-2'>
									<p className='dark:text-white  font-normal text-[#141414B2]'>{t('home.tour_cost')} : </p>
									<p className='font-medium text-xl dark:text-white text-[#141414]'>
										{PriceFormat(Number(data?.data?.claimDocument?.[0]?.moneys?.[0]?.money?.[1]?.price) - discount_amount?.discount_amount)} {t('home.uzs')}
									</p>
								</div>

								{discount_amount?.status === 0 && data?.data?.claimDocument?.[0]?.moneys?.[0]?.money?.[1]?.price ? (
									<button
										className='text-[#235DFF] text-center text-lg'
										onClick={() => {
											setPromocodeModal(true);
										}}
									>
										{t('home.do_you_have_promocode')}?
									</button>
								) : null}
								{/* <div className='bg-[#EBF2FF] rounded-[10px] h-[65px] flex justify-between'>
									<div className='flex justify-center items-center h-full pl-4'>
										<div className='flex flex-col  text-[#042B50] text-base'>
											<div>Вернем деньгами </div>
											<div>
												{PriceFormat(
													parseInt((data?.data?.claimDocument?.[0]?.moneys?.[0]?.money?.[1]?.price - discount_amount?.discount_amount) * 0.02)
												)}{' '}
												UZS
											</div>
										</div>
									</div>
									<div className=' bg-[#235DFF]  flex flex-col text-white text-base py-[6px] px-4 rounded-[6px]  items-center'>
										<div>Cashback</div>
										<div>2%</div>
									</div>
								</div> */}
								<ButtonMain
									onClick={() => {
										Finish();
									}}
									type_color='t_blue'
									type='button'
									className='w-full'
									text={loading_bron ? '...loading' : t('home.book_tour_online')}
								/>
								{/* <JivoChat /> */}
							</div>
						</div>
					</section>
				) : (
					<section className='p-[20px] flex flex-col gap-[11px] bg-white rounded-s-[10px] rounded-e-[10px] dark:bg-[#272829]'>
						<p className='text-[#141414] text-base text-center dark:text-white'>{t('home.please_update_the_price')}</p>
						<button
							onClick={() => {
								handleRefetch();
								setTime(600);
								trackEvent('tour_bron_endtime');
							}}
							className=' border border-[#235DFF] p-4  rounded-[10px] text-[#042B50] dark:text-white'
						>
							{t('home.update_price')}
						</button>
					</section>
				)}
			</div>
			<ModalBottom
				close={() => setModal(false)}
				modal={modal}
				heightModal='h-[85vh]'
				translateY='translate-y-[90vh]'
				btnShow={false}
				textBtn={t('home.save_date')}
				linkTo='/hotels/detail/hotelselectingnumber/'
				content={<BroneForm setModal={setModal} darkmode={darkmode} />}
			/>
			<ModalBottom
				close={() => {
					setPromocodeModal(false);
					setPromoValue('');
					setErrStatus({ ...err_status, promo_err: false });
				}}
				modal={promocode_modal}
				heightModal='h-[200px]'
				translateY='translate-y-[90vh]'
				btnShow={false}
				textBtn={t('home.save_date')}
				content={
					<form onSubmit={SubmitPromo} className='flex flex-col w-full gap-3'>
						<div className='flex flex-col w-full'>
							<label htmlFor='' className='dark:text-white mb-1'>
								{t('home.promocode')}
							</label>
							<input
								className={` h-[50px] w-full gap-[16px] dark:text-white   px-[20px] rounded-xl duration-200  dark:!bg-[#272829] !bg-white dark:border-[#4B4B59]`}
								type='text'
								value={promo_value}
								onChange={e => {
									setPromoValue(e?.target.value?.toUpperCase());
									setErrStatus({ ...err_status, promo_err: false });
								}}
								placeholder={`${t('home.enter')}...`}
							/>
							{err_status?.promo_err ? <span className=' text-red text-sm'>{errorText?.promo_err}</span> : null}
						</div>
						<ButtonMain type='submit' type_color='t_blue' className='w-full mb-3' text={loading_promo ? '...loading' : t('home.save_date')} onClick={() => {}} />
					</form>
				}
			/>
			{soon_modal && (
				<div className='fixed z-9999 inset-0 bg-white dark:bg-[#141414]  flex items-center justify-center'>
					<div className='container_main  relative flex  justify-center items-center w-full flex-col gap-[35px] px-6 '>
						<div>
							<img src='/images/soon-towns.svg' alt='' className='w-[144px] h-[144px]' />
						</div>
						<div className='flex flex-col gap-[10px] text-center text-[#141414] text-lg'>
							<h4 className=' font-semibold dark:text-white'>{t('home.brone_err1')}</h4>
							<p className='font-medium dark:text-white'>{t('home.brone_err2')}</p>
						</div>
						<div className='flex flex-col  gap-3 w-full'>
							<div
								onClick={() => {
									handleRefetch();
								}}
								className=' cursor-pointer flex justify-center items-center text-base bg-[#235DFF] rounded-xl p-4 w-full text-center text-white h-[50px]'
							>
								{t('home.update_btn')}
							</div>
							<div
								onClick={() => {
									navigate(-1);
								}}
								className=' cursor-pointer flex justify-center items-center text-base bg-[#9DA0A3] rounded-xl p-4 w-full text-center text-white  h-[50px] '
							>
								{t('home.go_back_btn')}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default HotelTourBookingBrone;
