import lgThumbnail from 'lightgallery/plugins/thumbnail';
import LightGallery from 'lightgallery/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MobileTab from '../components/mobiletab';
import NavigationOne from '../components/ui/NavigationOne';

// Styles
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import { useTranslation } from 'react-i18next';
import InputDiv from '../components/form/InputDiv';

const Settings = ({ darkmode }) => {
	const { user } = useSelector(s => s);
	const { t } = useTranslation();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	const formatPhoneNumber = number => {
		if (!number || typeof number !== 'string') {
			throw new Error('Invalid input');
		}
		return number?.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
	};

	return (
		<div className={`min-h-screen pb-[65px] bg-neutralSand dark:bg-[#141414] ${darkmode ? '' : ''}`}>
			<NavigationOne darkmode={darkmode} text={t('home.settings')} />
			<div className='container_main flex flex-col gap-[8px] !px-0 pt-[65px]'>
				<div className='mt-9 mb-0'>
					<div className='flex flex-col gap-[14px] justify-center w-full items-center'>
						{user?.user?.avatar_image ? (
							<LightGallery plugins={[lgThumbnail]} elementClassNames='grid grid-cols-1'>
								<a href={user?.user?.avatar_image}>
									<img
										src={user?.user?.avatar_image}
										className='w-[96px] h-[96px] rounded-full object-cover'
										alt=''
										onError={e => {
											e.target.src =
												'https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067';
										}}
									/>
								</a>
							</LightGallery>
						) : (
							<div className='w-[75px] h-[75px] rounded-full bg-neutralAlto'></div>
						)}
						<div className='flex flex-col'>
							<div className='text-2xl text-blueWood dark:text-white font-normal'>
								{user?.user?.first_name} {user?.user?.last_name}
							</div>
						</div>
					</div>
				</div>
				<div className='bg-white dark:bg-[#272829] overflow-hidden mx-[15px] mt-[15px] shadow-shadow5 dark:shadow-none rounded-2xl flex flex-col gap-6 py-6 px-4'>
					<InputDiv value={user?.user?.first_name} title={t('home.name')} darkmode={darkmode} />
					<InputDiv className='!cursor-auto' value={user?.user?.last_name} title={t('home.surname')} darkmode={darkmode} />
					<InputDiv title={t('home.phone_number')} value={user?.user?.phone_number ? formatPhoneNumber(user?.user?.phone_number) : user?.user?.phone_number} darkmode={darkmode} />
				</div>
			</div>
			<MobileTab darkmode={darkmode} />
		</div>
	);
};

export default Settings;
