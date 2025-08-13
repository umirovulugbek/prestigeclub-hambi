import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../../assets/air-travel.json';

const LoadingMain = ({ text }) => {
	const { t } = useTranslation();
	const [percent, setPercent] = useState(0);
	useEffect(() => {
		// if (is_loading === true) {
		// 	setPercent(0);
		// }
		const interval = setInterval(() => {
			setPercent(prevPercent => {
				const newPercent = prevPercent + Math.floor(Math.random() * 30);
				return newPercent < 100 ? newPercent : prevPercent;
			});
		}, 100);
		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<div className='dark:bg-[#141414]'>
			<div className='container_main  !px-0'>
				<div className='bg-white dark:bg-[#141414] h-[100vh] top-0 bottom-0 right-0 z-9999 flex flex-col justify-center items-center'>
					<div className='max-w-[500px]'>
						<Lottie animationData={Loader} loop={true} />
					</div>
					<div className='load_t mx-[15px] w-[430px] max-w-[80%] h-[7px] flex-shrink-0 rounded-[90px] bg-[#556C824C]  sm:w-[300px]'>
						<div className='load rounded-[90px] bg-[#3648aa]  transition h-[7px] flex-shrink-0' style={{ width: `${percent}%` }}></div>
					</div>
					{text ? (
						<div className='text-[20px] text-[#141414]  dark:text-white text-center mt-5'>{text}</div>
					) : (
						<>
							<div className=' text-[20px] text-[#141414]  dark:text-white mt-5'>{t('home.loading_title')}....</div>
							<div className=' text-[20px] text-[#141414]  dark:text-white text-center'>{t('home.loading_desc')}</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoadingMain;
