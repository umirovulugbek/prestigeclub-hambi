import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { trackEvent } from '../../utils/mixpanel';
import { BookingIcon, MoreIcon, PalmaTree } from '../headIcons';

const MobileTab = ({ darkmode }) => {
	const { t } = useTranslation();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const linkBase = 'w-[82px] cursor-pointer flex flex-col justify-center items-center';
	const titleBase = 'mt-[5px] text-[#9e9e9e] text-[14px] font-normal leading-[16px] text-center';
	const activeTitle = 'text-[#235dff]';

	return (
		<div className='fixed bottom-0 z-[1030] w-full flex justify-center !bg-white dark:!bg-[#141414]'>
			<div className='fixed left-0 right-0 bottom-0 container_main w-full flex items-center pt-[20px] pb-[20px] !px-0 bg-white border-t border-[#dee7ff] dark:!bg-[#141414] dark:border-[#646778] dark:border-t'>
				<div className='flex justify-around items-center w-full'>
					{/* Home */}
					<div onClick={() => navigate('/')} className={`${linkBase} ${pathname === '/' ? 'active' : ''}`}>
						<div className={`icon flex justify-center items-center ${pathname === '/' ? '[&>svg_*]:fill-[#235dff] [&>svg_*]:stroke-[#235dff]' : ''}`}>{PalmaTree}</div>
						<div className={`${titleBase} ${pathname === '/' ? activeTitle : ''}`}>{t('home.find_tour')}</div>
					</div>

					{/* My Booking */}
					<div
						onClick={() => {
							trackEvent('Homepage_top_mybrone');
							navigate('/mybooking');
						}}
						className={`${linkBase} min-h-[50px] ${pathname === '/mybooking' ? 'active' : ''}`}
					>
						<div className={`icon min-h-[30px] flex justify-center items-center ${pathname === '/mybooking' ? '[&>svg_*]:fill-[#235dff] [&>svg_*]:stroke-[#235dff]' : ''}`}>
							{BookingIcon}
						</div>
						<div className={`${titleBase} ${pathname === '/mybooking' ? activeTitle : ''}`}>{t('home.my_reservations')}</div>
					</div>

					{/* More */}
					<div onClick={() => navigate('/services')} className={`${linkBase} ${pathname === '/services' ? 'active' : ''}`}>
						<div className={`icon flex justify-center items-center ${pathname === '/services' ? '[&>svg_*]:fill-[#235dff] [&>svg_*]:stroke-[#235dff]' : ''}`}>{MoreIcon}</div>
						<div className={`${titleBase} ${pathname === '/services' ? activeTitle : ''}`}>{t('home.more')}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileTab;
