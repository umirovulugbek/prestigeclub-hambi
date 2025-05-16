
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import Axios from '../../../utils/httpsClinet';

const GraphicTour = ({ darkmode, setShowCity, setModalWhere, getTowns, Setdeparture, setObj, townStates }) => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [active, setActive] = useState(0);

	useEffect(() => {
		getGraphicTour();
	}, []);

	useEffect(() => {
		setActive(data?.[0]?.month);
	}, [data]);

	const getGraphicTour = () => {
		setLoading(true);
		Axios()
			.get('/api/graphic-tours/')
			.then(res => {
				setData(res?.data);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<div className='flex flex-col  py-4 '>
			<h2 className=' font-medium text-lg text-[#141414] dark:text-white container_main w-full !mb-1'>График туров</h2>
			<div className='relative w-full  container_main flex flex-col gap-3'>
				<div className='flex gap-[10px] relative overflow-x-auto'>
					{loading ? (
						<>
							<div className='w-full'>
								<Skeleton height={40} style={{ borderRadius: '8px', width: '100%' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
							</div>
							<div className='w-full'>
								<Skeleton height={40} style={{ borderRadius: '8px', width: '100%' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
							</div>
							<div className='w-full'>
								<Skeleton height={40} style={{ borderRadius: '8px', width: '100%' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
							</div>
							<div className='w-full'>
								<Skeleton height={40} style={{ borderRadius: '8px', width: '100%' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
							</div>
						</>
					) : (
						<>
							{data
								?.map(item => {
									return {
										month: item?.month,
										month_name: item?.month_name,
									};
								})
								.map((month, idx) => (
									<button
										key={idx}
										onClick={() => setActive(month?.month)}
										className={`relative bg-white mt-1 dark:bg-[#272829] h-[40px]  px-6 rounded-lg text-base
              ${active === month?.month ? 'text-white ' : 'text-[#141414] dark:text-white'}`}
									>
										{month?.month_name}
										{active === month?.month && (
											<motion.div
												layoutId='active-pill'
												className='absolute flex justify-center items-center inset-0 bg-blue-600 rounded-lg z-[1]'
												transition={{ type: 'keyframes', duration: 0.3 }}
											>
												{month?.month_name}
											</motion.div>
										)}
									</button>
								))}
						</>
					)}
				</div>
				<div className=''>
					{loading ? (
						<>
							<div className='w-full'>
								<Skeleton height={125} style={{ borderRadius: '8px', width: '100%' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
							</div>
						</>
					) : (
						<>
							<AnimatePresence mode='wait'>
								<motion.div
									key={active}
									className='grid grid-cols-2 gap-[5px]'
									initial={{ y: 10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: -10, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									{data
										?.find(item => item?.month === active)
										?.tours?.map((item, idx) => (
											<div
												onClick={() => {
													// navigate(
													// 	`/hotels/result-graphic-tour/?town_from_inc=${item?.town_from_id}&tour_operator_id=${item?.tour_operator_id}&state_id=${item?.state_id}&tour_somo_id=${item?.somo_id}`
													// );
													setShowCity(true);
													setModalWhere(true);
													getTowns(item?.town_from_id, item?.tour_operator_id, item?.state_id);
													Setdeparture({
														somo_id: item?.town_from_id,
														tour_operator_id: item?.tour_operator_id,
														state_id: item?.state_id,
													});
													setObj(pV => ({
														...pV,
														where: townStates?.find(i => i?.somo_id === item?.state_id)?.name,
														departure_date: '',
														number_of_days: '',
													}));
												}}
												key={idx}
												className=' relative w-full  h-[125px] mt-1 cursor-pointer'
											>
												<img
													src={item?.image_url}
													alt=''
													className=' h-[125px] w-full   absolute  top-0  bottom-0 right-0 left-0 rounded-lg object-cover'
												/>
												<span className='top-0  bottom-0 right-0 left-0 absolute bg-[#00000040] rounded-lg  w-full' />
												<div className=' absolute  left-[15px] bottom-[15px] text-white flex flex-col font-semibold'>
													<div className=' text-[18px] leading-[22px] line-clamp-1'>{item?.name}</div>
													<div className=' text-base leading-[22px] '>от {item?.price_mln} млн</div>
												</div>
											</div>
										))}
								</motion.div>
							</AnimatePresence>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
export default GraphicTour;
