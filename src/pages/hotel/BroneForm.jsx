import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HotelTourBookingForm from '../../components/form/HotelTourBookingForm';
import { Back } from '../../components/itemIcon';

const BroneForm = ({ darkmode, setModal }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { formsData, selectedPerson } = useSelector(s => s);

	const handleFormsDataSubmit = (key, formData) => {
		dispatch({
			type: 'SET_FORMSDATA',
			payload: {
				...formsData,
				[key]: formData,
			},
		});
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	return (
		<div className={`min-h-screen  dark:bg-[#141414] bg-[#F5F5F5]`}>
			<div className='container_main !px-0'>
				<div className='bg-white dark:bg-[#141414] items-center  flex justify-between text-[#141414] dark:text-white text-lg font-normal py-[20px] text-center'>
					<Back
						onClick={() => {
							navigate(-1);
						}}
						fill={darkmode ? '#fff' : '#141414'}
					/>
					<div>Данные туриста</div>
					<div className='w-[45px] h-[45px]'></div>
				</div>

				<div className=' dark:bg-[#141414] bg-[#FFFF] w-full py-[15px] container_main flex flex-col gap-[15px] mt-[25px]'>
					<HotelTourBookingForm formsData={formsData || {}} people={selectedPerson || []} onSubmitt={handleFormsDataSubmit} setModal={setModal} />
				</div>
			</div>
		</div>
	);
};
export default BroneForm;
