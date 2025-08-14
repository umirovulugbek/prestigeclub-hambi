import React from 'react';
import { CloseIcon } from '../../homeS3Icon';
import { ArrowRight } from '../../itemIcon';
import ModalBottom from '../../modal/ModalBottom';
import { useTranslation } from 'react-i18next';

const ModalPopular = ({ modal, setModal, list, obj, setObj, fetchData, setPage, darkmode }) => {
	const { t } = useTranslation()
	const handleSet = () => {
		setModal(false);
	};

	return (
		<div className='w-full'>
			<ModalBottom
				close={() => setModal(false)}
				modal={modal}
				heightModal='min-h-[20vh] max-h-[80vh]'
				btnShow={false}
				translateY='translate-y-[80vh]'
				content={
					<div className='w-full'>
						<div className='flex items-center justify-between w-full gap-3'>
							<p className='font-medium text-xl dark:text-white'>{t('home.number')}</p>
							<CloseIcon fill={darkmode ? '#fff' : '#141414'} className='cursor-pointer' onClick={() => setModal(false)} />
						</div>
						<div className='mt-[20px] flex flex-col gap-3 pb-5'>
							{list?.map((item, index) => {
								return (
									<div
										key={index}
										onClick={() => {
											handleSet();
											setPage(1);
											setObj({ ...obj, room_key: item?.key });
										}}
										className='flex items-center justify-between gap-3 px-3   rounded-xl  bg-white dark:bg-[#272829] py-[15px] last:border-none cursor-pointer'
									>
										<p className=' dark:text-white truncate'>{item?.name}</p>
										<ArrowRight fill={darkmode ? '#B3B7CE' : '#141414'} />
									</div>
								);
							})}
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default ModalPopular;
