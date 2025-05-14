import React from 'react';
import { CloseIcon } from '../../homeS3Icon';
import { ArrowRight } from '../../itemIcon';
import ModalBottom from '../../modal/ModalBottom';

const ModalCategory = ({ modal, setModal, list, obj, setObj, fetchData }) => {
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
							<p className='font-semibold text-xl'>Категории</p>
							<CloseIcon className='cursor-pointer' onClick={() => setModal(false)} />
						</div>
						<div className='mt-[20px]'>
							{list?.map((item, index) => {
								return (
									<div
										key={index}
										onClick={() => {
											const searchParams = window.location.search;

											handleSet(item?.name, item?.somo_id, item?.tour_operator_id, 1);
											fetchData(searchParams + `&`);
										}}
										className='flex items-center justify-between gap-3 px-3 border-b border-neutral py-[15px] last:border-none cursor-pointer'
									>
										<p>{item?.name}</p>
										<ArrowRight />
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

export default ModalCategory;
