import React from 'react';
import ModalBottom from '../../modal/ModalBottom';

const ModalEdit = ({ modal, setModal, list, obj, setObj, fetchData, darkmode }) => {
	const handleSet = () => {
		setModal(false);
	};

	return (
		<div className='w-full'>
			<ModalBottom close={() => setModal(false)} modal={modal} heightModal='min-h-[20vh] max-h-[80vh]' btnShow={false} translateY='translate-y-[80vh]' content={<></>} />
		</div>
	);
};

export default ModalEdit;
