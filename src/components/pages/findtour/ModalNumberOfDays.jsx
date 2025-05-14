import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { trackEvent } from '../../../utils/mixpanel';
import { ArrowRight } from '../../itemIcon';
import ModalBottom from '../../modal/ModalBottom';

const ModalNumberOfDays = ({ modalNumberOfDays, setModalNumberOfDays, list, setObj, setObjError, darkmode }) => {
	const { t } = useTranslation();
	const { loading } = useSelector(s => s);

	const handleSet = value => {
		trackEvent('search_night', { search_night: value });

		setObj(pV => ({
			...pV,
			number_of_days: value,
		}));
		setObjError(pV => ({
			...pV,
			number_of_days: false,
		}));
		setModalNumberOfDays(false);
	};

	return (
		<div className='w-full'>
			<ModalBottom
				close={() => setModalNumberOfDays(false)}
				modal={modalNumberOfDays}
				heightModal='min-h-[20vh] max-h-[80vh]'
				btnShow={false}
				translateY='translate-y-[80vh]'
				content={
					<div className='w-full'>
						<div className='flex items-center justify-between w-full gap-3'>
							<p className='font-normal text-xl  dark:text-white '> {t('home.number_of_days2')}</p>
							{/* <CloseIcon fill={darkmode ? '#fff' : '#141414'} className='cursor-pointer' onClick={() => setModalNumberOfDays(false)} /> */}
						</div>
						{loading ? (
							<div className='flex flex-col gap-3 my-[20x]'>
								<div className='flex justify-between items-center gap-3 px-3 border-b border-neutral dark:border-[#4B4B59] py-[15px] last:border-none space-x-2 cursor-pointer'>
									<Skeleton width={200} height={23} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
									<ArrowRight fill={darkmode ? '#B3B7CE' : '#141414'} />
								</div>
								<div className='flex justify-between items-center gap-3 px-3 border-b border-neutral dark:border-[#4B4B59] py-[15px] last:border-none space-x-2 cursor-pointer'>
									<Skeleton width={200} height={23} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
									<ArrowRight fill={darkmode ? '#B3B7CE' : '#141414'} />
								</div>
							</div>
						) : (
							<div className='flex flex-col gap-3 pt-[20px] pb-[30px]'>
								
								{list?.map((item, index) => {
									return (
										<div
											key={index}
											onClick={() => {
												handleSet(item);
											}}
											className='flex items-center justify-between gap-3 px-3  bg-white dark:bg-[#272829] rounded-xl dark:border-[#4B4B59]  py-[15px] last:border-none cursor-pointer'
										>
											<p className=' dark:text-white'>
												{item} {t('home.nights')}
											</p>

											<ArrowRight fill={darkmode ? '#FFFFFF' : '#141414'} />
										</div>
									);
								})}
							</div>
						)}
					</div>
				}
			/>
		</div>
	);
};

export default ModalNumberOfDays;
