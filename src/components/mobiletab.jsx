import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BookingIcon, MoreIcon, PalmaTree } from '../components/headIcons';
import { trackEvent } from '../utils/mixpanel';

const MobileTabStyle = styled.div`
	position: fixed;
	bottom: 0;
	z-index: 1030;
	width: 100%;
	justify-content: center;
	display: flex;
	& .link {
		width: 82px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		& .icon {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		& .title {
			margin-top: 5px;
			color: #9e9e9e;
			font-size: 14px;
			font-weight: 400;
			line-height: 16px;
			text-align: center;
		}
		&:hover,
		&.active {
			& .icon {
				#mask0_1854_535,
				#mask0_1858_958 {
					& g > path,
					& path {
						fill: #fff !important;
					}
				}
				& g > path,
				& path {
					fill: #235dff !important;
					stroke: #235dff !important;
				}
			}
			& .my-apps {
				& circle,
				& path {
					stroke: #235dff;
				}
			}
			& .title {
				color: #235dff;
			}
		}
	}
`;
const MobileTab = ({ darkmode }) => {
	const { t } = useTranslation();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	return (
		<>
			<MobileTabStyle className={`!bg-white dark:!bg-[#141414] `}>
				<div
					className={`fixed  left-0 right-0 bottom-0 container_main w-full flex items-center  pt-[20px] pb-[20px]  !px-0 bg-white border-t border-[#dee7ff]   dark:!bg-[#141414] dark:border-[#646778] dark:border-t 
					`}
				>
					<div className={`flex justify-around items-center w-full`}>
						{/* <NavLink className='link' to='/'>
							<div className='icon h-[25px]'>{homeIcon}</div>
							<div className='title'>{t(home.home)}</div>
						</NavLink> */}

						<div
							onClick={() => {
								navigate('/');
							}}
							className={`link ${pathname === '/' ? 'active' : ''}`}
						>
							<div className='icon '>{PalmaTree}</div>
							<div className='title'>{t('home.find_tour')}</div>
						</div>
						<div
							onClick={() => {
								trackEvent('Homepage_top_mybrone');
								navigate('/mybooking');
							}}
							className={`link min-h-[50px] ${pathname === '/mybooking' ? 'active' : ''}`}
						>
							<div className='icon  min-h-[30px]'>{BookingIcon}</div>
							<div className='title'>{t('home.my_reservations')}</div>
						</div>
						{/* <div
							onClick={() => {
								trackEvent('Homepage_top_favorites');
								navigate('/basket');
							}}
							className={`link ${pathname === '/basket' ? 'active' : ''} `}
						>
							<div className='icon '>{FeaturedIcon}</div>
							<div className='title'>{t('home.featured')}</div>
						</div> */}

						<div
							onClick={() => {
								navigate('/services');
							}}
							className={`link ${pathname === '/services' ? 'active' : ''}`}
						>
							<div className='icon '>{MoreIcon}</div>
							<div className='title'>{t('home.more')}</div>
						</div>
					</div>
				</div>
			</MobileTabStyle>
		</>
	);
};

export default MobileTab;
