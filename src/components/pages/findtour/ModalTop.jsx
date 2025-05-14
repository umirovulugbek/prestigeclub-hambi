import React from 'react';
import { useTranslation } from 'react-i18next';
import ModalBottom from '../../modal/ModalBottom';

const ModalTop = ({
	ModalTop,
	setModalTop,
	list,
	obj,
	setObj,
	objError,
	setObjError,
	childrenCount,
	setChildrenCount,
	adultCounter,
	setAdultCounter,
	ages,
	setAges,
	addChild,
	setAddChild,
	setModalNumberOfDays,
	darkmode,
}) => {
	const { t } = useTranslation();
	const closeFunction = () => {
		setModalTop(false);
		// setAddChild(false);
		// setChildrenCount(0);
		// setAdultCounter(1);
		// setAges([]);
		// setObj((pV) => ({
		//   ...pV,
		//   number_of_tourists: 1,
		// }));
	};

	const clickFunction = () => {
		// let allCount = adultCounter + ages?.length;
		// setObj(pV => ({
		// 	...pV,
		// 	number_of_tourists: allCount,
		// }));
		// setObjError(pV => ({
		// 	...pV,
		// 	number_of_tourists: false,
		// }));
		setModalTop(false);
	};

	return (
		<div className='w-full'>
			<ModalBottom
				close={() => closeFunction()}
				modal={ModalTop}
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

export default ModalTop;
