import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '../../homeS3Icon';
import ModalBottom from '../../modal/ModalBottom';

const ModalNutrition = ({ modal, setModal, list, obj, setObj, fetchData, darkmode, setPage }) => {
	const { t } = useTranslation();
	const [selectedItems, setSelectedItems] = useState([]);

	const handleSelect = somo_id => {
		if (selectedItems.includes(somo_id)) {
			setSelectedItems(selectedItems.filter(id => id !== somo_id));
		} else {
			setSelectedItems([...selectedItems, somo_id]);
		}
	};

	const handleSubmit = () => {
		setModal(false);
		setObj({ ...obj, nutrition: selectedItems });
		setPage(1);
	};
	useEffect(() => {
		if (obj?.nutrition) {
			setSelectedItems(obj.nutrition);
		}
	}, [obj?.nutrition]);

	return (
		<div className='w-full'>
			<ModalBottom
				close={() => setModal(false)}
				modal={modal}
				heightModal='min-h-[20vh] max-h-[80vh]'
				btnShow={false}
				translateY='translate-y-[80vh]'
				content={
					<div className='w-full '>
						<div className='flex items-center justify-between w-full gap-3'>
							<p className='font-medium text-xl dark:text-white'>Питание</p>
							<CloseIcon fill={darkmode ? '#fff' : '#141414'} className='cursor-pointer' onClick={() => setModal(false)} />
						</div>
						<div className='mt-[20px] flex flex-col gap-3   pb-20'>
							{list?.map((item, index) => (
								<div
									key={index}
									className='flex items-center justify-between gap-3 px-3  bg-white rounded-xl dark:bg-[#272829] dark:border-[#4B4B59] py-[15px] last:border-none cursor-pointer'
								>
									{/* Checkbox to select the item */}
									<div className='flex gap-3'>
										<input
											type='checkbox'
											checked={selectedItems.includes(item?.key)}
											onChange={() => handleSelect(item?.key)}
											className='cursor-pointer w-4'
										/>
										<p className='dark:text-white'>{item?.name}</p>
									</div>
									{/* <ArrowRight fill={darkmode ? '#B3B7CE' : '#141414'} /> */}
								</div>
							))}
						</div>
						<div className='dark:bg-[#141414] bg-white left-0 right-0    container_main w-full !px-0   fixed  bottom-0'>
							<button onClick={handleSubmit} className='mt-4 mb-5 w-[calc(100%-30px)] ml-[15px] py-2 bg-[#1C4ACC] text-white rounded-[12px]'>
								{t('home.save')}
							</button>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default ModalNutrition;
