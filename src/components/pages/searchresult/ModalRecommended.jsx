import React from 'react';
import { useTranslation } from 'react-i18next';
import ModalBottom from '../../modal/ModalBottom';

const ModalRecommended = ({ modal, setModal, list, setItems, setSelectedSort, selectedSort = '' }) => {
	const { t } = useTranslation();

	const handleSelect = type => {
		setSelectedSort(type);
	};

	const handleSubmit = () => {
		setItems(prevList => {
			let sorted = [...prevList];
			switch (selectedSort) {
				case 'recommended':
					sorted.sort((a, b) => Number(b.hotel?.rating?.rating) - Number(a.hotel?.rating?.rating));
					break;
				case 'cheapest':
					sorted.sort((a, b) => a.converted_price_number - b.converted_price_number);
					break;
				case 'expensive':
					sorted.sort((a, b) => b.converted_price_number - a.converted_price_number);
					break;
				case 'best-rating-low-price':
					sorted.sort((a, b) => Number(b.hotel?.rating?.rating) - Number(a.hotel?.rating?.rating) || a.converted_price_number - b.converted_price_number);
					break;
				default:
					return prevList;
			}

			return sorted;
		});
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
							<p className='font-medium text-lg dark:text-white'>{t('home.sorting')}</p>
						</div>
						<div className='mt-[20px] gap-3 flex flex-col'>
							{list?.map((item, index) => (
								<div
									key={index}
									onClick={() => handleSelect(item?.value)}
									className='flex items-center justify-between gap-3 px-3 rounded-xl bg-white dark:bg-[#272829] py-[15px] last:border-none cursor-pointer'
								>
									<div className='flex gap-3 justify-between w-full'>
										<div className='flex  items-center gap-2'>
											<img src={`/images/${item?.icon}`} alt='' />
											<p className='dark:text-white'>{item?.name}</p>
										</div>
										<input type='radio' checked={selectedSort === item.value} readOnly className='cursor-pointer w-4' />
									</div>
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

export default ModalRecommended;
