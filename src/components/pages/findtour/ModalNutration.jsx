import React from 'react';
import { useTranslation } from 'react-i18next';
import ModalBottom from '../../modal/ModalBottom';

const ModalNutrition = ({ ModalNutrition, setModalNutrition }) => {
	const { t } = useTranslation();
	const closeFunction = () => {
		setModalNutrition(false);
	};

	const clickFunction = () => {
		setModalNutrition(false);
	};

	return (
		<div className='w-full'>
			<ModalBottom
				close={() => closeFunction()}
				modal={ModalNutrition}
				heightModal='min-h-[20vh] max-h-[80vh]'
				btnShow={false}
				textBtn={t('home.save')}
				translateY='translate-y-[80vh]'
				clickFunction={clickFunction}
				content={<></>}
			/>
		</div>
	);
};

export default ModalNutrition;
