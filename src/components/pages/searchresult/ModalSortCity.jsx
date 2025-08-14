import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '../../homeS3Icon';
import ModalBottom from '../../modal/ModalBottom';

const ModalSortCity = ({ modal, setModal, list, obj, setObj, fetchData, darkmode, setPage }) => {
	const { t } = useTranslation();
	// State to track selected items
	const [selectedItems, setSelectedItems] = useState([]);

	// Function to handle checkbox selection
	const handleSelect = somo_id => {
		// Check if the item is already selected
		if (selectedItems.includes(somo_id)) {
			// If selected, remove from the array
			setSelectedItems(selectedItems.filter(id => id !== somo_id));
		} else {
			// Otherwise, add to the array
			setSelectedItems([...selectedItems, somo_id]);
		}
	};

	// Function to handle submission
	const handleSubmit = () => {
		setModal(false);
		// Update the obj with selected items and reset page to 1
		setObj({ ...obj, nutrition: selectedItems });
		setPage(1);
		const searchParams = window.location.search;

		fetchData(searchParams, 1);
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
							<p className='font-medium text-xl dark:text-white'>{t('home.nutrition2')}</p>
							<CloseIcon fill={darkmode ? '#fff' : '#141414'} className='cursor-pointer' onClick={() => setModal(false)} />
						</div>
						<div className='mt-[20px]'>
							{list?.map((item, index) => (
								<div
									key={index}
									className='flex items-center justify-between gap-3 px-3 border-b border-neutral dark:border-[#4B4B59] py-[15px] last:border-none cursor-pointer'
								>
									{/* Checkbox to select the item */}
									<div className='flex gap-3'>
										<input
											type='checkbox'
											checked={selectedItems.includes(item?.somo_id)}
											onChange={() => handleSelect(item?.somo_id)}
											className='cursor-pointer w-4'
										/>
										<p className='dark:text-white'>{item?.name}</p>
									</div>
									{/* <ArrowRight fill={darkmode ? '#B3B7CE' : '#141414'} /> */}
								</div>
							))}
						</div>
						<button onClick={handleSubmit} className='mt-4 mb-4 w-full py-2 bg-[#1C4ACC] text-white rounded-[12px]'>
							{t('home.save')}
						</button>
					</div>
				}
			/>
		</div>
	);
};

export default ModalSortCity;
