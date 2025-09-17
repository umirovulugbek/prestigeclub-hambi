import lgThumbnail from 'lightgallery/plugins/thumbnail';
import LightGallery from 'lightgallery/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavigationOne from '../../components/ui/NavigationOne';

// Styles
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const UserServisIcon = () => {
	return (
		<svg width='24.000000' height='24.000000' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
			<g clipPath='url(#clip1887_10678)'>
				<path
					id='Union'
					d='M11.92 12.61L11.88 12.61C8.96 12.6 6.6 10.22 6.6 7.3C6.6 4.38 8.99 2 11.92 2C14.84 2 17.23 4.38 17.23 7.31C17.23 10.23 14.84 12.61 11.92 12.61ZM11.92 3.42C9.77 3.42 8.03 5.16 8.03 7.31C8.03 9.44 9.76 11.18 11.89 11.19L11.92 11.19C14.06 11.19 15.8 9.44 15.8 7.31C15.8 5.16 14.06 3.42 11.92 3.42ZM11.92 21.87C9.96 21.87 4 21.87 4 18.17C4 14.87 8.52 14.49 11.92 14.49C13.87 14.49 19.83 14.49 19.83 18.19C19.83 21.49 15.31 21.87 11.92 21.87ZM11.92 15.99C7.66 15.99 5.5 16.72 5.5 18.17C5.5 19.63 7.66 20.37 11.92 20.37C16.18 20.37 18.33 19.63 18.33 18.19C18.33 16.73 16.18 15.99 11.92 15.99Z'
					fill='#141414'
					fillOpacity='1.000000'
					fillRule='evenodd'
				/>
			</g>
		</svg>
	);
};

export const EditServiseIcon = () => {
	return (
		<svg width='24.000000' height='24.000000' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
			<path
				id='Fill 1'
				d='M20.75 21.93L13.49 21.93C13.08 21.93 12.74 21.6 12.74 21.18C12.74 20.77 13.08 20.43 13.49 20.43L20.75 20.43C21.16 20.43 21.5 20.77 21.5 21.18C21.5 21.6 21.16 21.93 20.75 21.93Z'
				fill='#141414'
				fillOpacity='1.000000'
				fillRule='evenodd'
			/>
			<mask id='mask1887_10656' mask-type='alpha' maskUnits='userSpaceOnUse' x='2.000488' y='3.000000' width='17.180664' height='18.939453'>
				<path id='Clip 4' d='M2 3L19.18 3L19.18 21.93L2 21.93L2 3Z' fill='#000000' fillOpacity='1.000000' fillRule='evenodd' />
			</mask>
			<g mask='url(#mask1887_10656)'>
				<path
					id='Fill 3'
					d='M2.88379 21.3652C2.96484 21.7031 3.2666 21.9414 3.61377 21.9414L3.62354 21.9414L7.2627 21.8965C8.00195 21.8867 8.68994 21.5527 9.14893 20.9824C18.6768 9.0625 18.7036 9.01953 18.7349 8.9707C19.1519 8.31055 19.2817 7.52734 19.1025 6.76953C18.9229 6.00391 18.4478 5.35742 17.8398 4.99414C17.8398 4.99414 16.167 3.69531 16.1167 3.65625C14.8569 2.64453 12.9888 2.82617 11.9556 4.0625C11.9517 4.06641 11.9487 4.07031 11.9448 4.07422L2.5249 15.8574C2.06396 16.4316 1.896 17.1738 2.06494 17.8945L2.88379 21.3652ZM13.1108 5.01953L3.6958 16.793C3.5249 17.0078 3.46191 17.2832 3.5249 17.5488L4.20557 20.4336L7.24463 20.3965C7.53369 20.3926 7.80078 20.2637 7.97754 20.043C11.1948 16.0195 17.3276 8.34375 17.502 8.11914C17.6655 7.85352 17.73 7.47852 17.6436 7.11523C17.5557 6.74414 17.3247 6.42969 16.9917 6.22852C16.9209 6.17969 15.2358 4.87109 15.1836 4.83008C14.5498 4.32227 13.625 4.41016 13.1108 5.01953Z'
					clipRule='evenodd'
					fill='#141414'
					fillOpacity='1.000000'
					fillRule='evenodd'
				/>
			</g>
			<path
				id='Fill 6'
				d='M16.22 11.68C16.06 11.68 15.9 11.63 15.76 11.53L10.31 7.34C9.98 7.08 9.92 6.62 10.17 6.29C10.42 5.96 10.89 5.9 11.22 6.15L16.68 10.33C17 10.59 17.07 11.06 16.81 11.39C16.67 11.58 16.44 11.68 16.22 11.68Z'
				fill='#141414'
				fillOpacity='1.000000'
				fillRule='evenodd'
			/>
		</svg>
	);
};

export const BookMarkServiseIcon = () => {
	return (
		<svg width='24.000000' height='24.000000' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
			<mask id='mask1887_10691' mask-type='alpha' maskUnits='userSpaceOnUse' x='3.000000' y='2.011719' width='17.052734' height='19.853516'>
				<path id='Clip 2' d='M3 2.01L20.05 2.01L20.05 21.86L3 21.86L3 2.01Z' fill='#000000' fillOpacity='1.000000' fillRule='evenodd' />
			</mask>
			<g mask='url(#mask1887_10691)'>
				<path
					id='Fill 1'
					d='M7.47656 21.8652L7.58545 21.8652L15.6045 21.8652C18.1177 21.7637 20.0718 19.7129 20.0537 17.2031L20.0537 8.03711C20.0537 7.84375 19.9785 7.6582 19.8447 7.51953L14.7798 2.24219C14.6377 2.09375 14.4424 2.01172 14.2388 2.01172L7.57178 2.01172C5.1084 2.01172 3.05957 4.00977 3.00146 6.49023L3.00146 17.1875C2.94678 19.7109 4.95459 21.8086 7.47656 21.8652ZM7.57373 3.51172C5.9165 3.51172 4.54053 4.85352 4.50146 6.50781L4.50146 17.2031C4.46436 18.916 5.81445 20.3281 7.51074 20.3652L15.5747 20.3652C17.2437 20.2969 18.5654 18.9102 18.5537 17.209L18.5537 8.33984L13.9185 3.51172L7.57373 3.51172Z'
					clipRule='evenodd'
					fill='#141414'
					fillOpacity='1.000000'
					fillRule='evenodd'
				/>
			</g>
			<path
				id='Fill 6'
				d='M13.78 16.1L8.38 16.1C7.97 16.1 7.63 15.77 7.63 15.35C7.63 14.94 7.97 14.6 8.38 14.6L13.78 14.6C14.2 14.6 14.53 14.94 14.53 15.35C14.53 15.77 14.2 16.1 13.78 16.1Z'
				fill='#141414'
				fillOpacity='1.000000'
				fillRule='evenodd'
			/>
			<path
				id='Fill 8'
				d='M11.74 12.35L8.38 12.35C7.97 12.35 7.63 12.01 7.63 11.6C7.63 11.19 7.97 10.85 8.38 10.85L11.74 10.85C12.15 10.85 12.49 11.19 12.49 11.6C12.49 12.01 12.15 12.35 11.74 12.35Z'
				fill='#141414'
				fillOpacity='1.000000'
				fillRule='evenodd'
			/>
			<path
				id='Fill 4'
				d='M19.29 8.98L16.54 8.98C14.71 8.97 13.22 7.48 13.22 5.65L13.22 2.75C13.22 2.33 13.56 2 13.97 2C14.38 2 14.72 2.33 14.72 2.75L14.72 5.65C14.72 6.66 15.54 7.48 16.54 7.48L19.29 7.48C19.71 7.48 20.04 7.82 20.04 8.23C20.04 8.64 19.71 8.98 19.29 8.98Z'
				fill='#141414'
				fillOpacity='1.000000'
				fillRule='evenodd'
			/>
		</svg>
	);
};
export const SettingsServiseIcon = () => {
	return (
		<svg width='24.000000' height='24.000000' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
			<g clipPath='url(#clip1887_10706)'>
				<path
					id='Fill 3'
					d='M13.34 21.28C12.93 21.28 12.59 20.94 12.59 20.53L12.59 18.51C12.59 18.09 12.93 17.76 13.34 17.76C13.76 17.76 14.09 18.09 14.09 18.51L14.09 20.53C14.09 20.94 13.76 21.28 13.34 21.28Z'
					fill='#141414'
					fillOpacity='1.000000'
					fillRule='evenodd'
				/>
				<path
					id='Fill 5'
					d='M13.34 15.82C12.93 15.82 12.59 15.48 12.59 15.07L12.59 10.25C12.59 9.83 12.93 9.5 13.34 9.5C13.76 9.5 14.09 9.83 14.09 10.25L14.09 15.07C14.09 15.48 13.76 15.82 13.34 15.82Z'
					fill='#141414'
					fillOpacity='1.000000'
					fillRule='evenodd'
				/>
				<path
					id='Fill 1'
					d='M13.34 8.17C12.93 8.17 12.59 7.83 12.59 7.42L12.59 5C12.59 4.58 12.93 4.25 13.34 4.25C13.76 4.25 14.09 4.58 14.09 5L14.09 7.42C14.09 7.83 13.76 8.17 13.34 8.17Z'
					fill='#141414'
					fillOpacity='1.000000'
					fillRule='evenodd'
				/>
				<mask id='mask1887_10713' mask-type='alpha' maskUnits='userSpaceOnUse' x='0.750000' y='4.000000' width='21.500000' height='17.500000'>
					<path id='Clip 8' d='M0.75 4L22.25 4L22.25 21.5L0.75 21.5L0.75 4Z' fill='#000000' fillOpacity='1.000000' fillRule='evenodd' />
				</mask>
				<g mask='url(#mask1887_10713)'>
					<path
						id='Fill 7'
						d='M4.79785 21.5L18.2021 21.5C20.4341 21.5 22.25 19.7012 22.25 17.4922L22.25 14.9004C22.25 14.4863 21.9141 14.1504 21.5 14.1504C20.7129 14.1504 20.0732 13.5234 20.0732 12.752C20.0732 11.9785 20.7129 11.3516 21.5 11.3516C21.6992 11.3516 21.8901 11.2715 22.0298 11.1309C22.1709 10.9902 22.25 10.7988 22.25 10.6016L22.249 8.00781C22.249 5.79883 20.4331 4 18.2012 4L4.79883 4C2.56689 4 0.750977 5.79883 0.750977 8.00781L0.75 10.6855C0.75 10.8828 0.829102 11.0742 0.970215 11.2148C1.10986 11.3555 1.30078 11.4355 1.5 11.4355C2.31299 11.4355 2.92676 12.002 2.92676 12.752C2.92676 13.5234 2.28711 14.1504 1.5 14.1504C1.08594 14.1504 0.75 14.4863 0.75 14.9004L0.75 17.4922C0.75 19.7012 2.56592 21.5 4.79785 21.5ZM2.25 15.5547L2.25 17.4922C2.25 18.875 3.39307 20 4.79785 20L18.2021 20C19.6069 20 20.75 18.875 20.75 17.4922L20.75 15.5547C19.499 15.2246 18.5732 14.0938 18.5732 12.752C18.5732 11.4082 19.498 10.2773 20.75 9.94727L20.749 8.00781C20.749 6.625 19.606 5.5 18.2012 5.5L4.79883 5.5C3.39404 5.5 2.25098 6.625 2.25098 8.00781L2.25 10.0254C3.51709 10.3359 4.42676 11.4219 4.42676 12.752C4.42676 14.0938 3.50098 15.2246 2.25 15.5547Z'
						clipRule='evenodd'
						fill='#141414'
						fillOpacity='1.000000'
						fillRule='evenodd'
					/>
				</g>
			</g>
		</svg>
	);
};

const Services = ({ darkmode }) => {
	const { user } = useSelector(s => s);
	const { t } = useTranslation();
	const navigate = useNavigate();

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
		<div className={`min-h-screen pb-[65px] ${darkmode ? 'bg-[#141414]' : 'bg-neutralSand'}`}>
			<NavigationOne is_close={false} darkmode={darkmode} text={t('home.service')} />
			<div className='container_main flex flex-col gap-[8px] !px-0 pt-[65px]'>
				<div className='bg-white dark:bg-[#272829] pl-[15px] pr-[30px] py-[20px] mx-[15px] mt-[15px] shadow-shadow5 dark:shadow-none rounded-2xl flex justify-between items-center'>
					<div className='flex gap-[14px] items-center'>
						{user?.user?.avatar_image ? (
							<LightGallery plugins={[lgThumbnail]} elementClassNames='grid grid-cols-1'>
								<a href={user?.user?.avatar_image}>
									<img
										src={user?.user?.avatar_image}
										className='w-[75px] h-[75px] rounded-full object-cover'
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
							<div className='text-sm text-blueWood dark:text-white font-medium'>
								{user?.first_name} {user?.last_name || 'User'}
							</div>
							<div className='text-sm text-blueWood dark:text-white font-medium'>{user?.msisdn ? formatPhoneNumber(user?.msisdn) : `+998 ** *** ** **`}</div>
						</div>
					</div>
				</div>

				{/* <div className='bg-white dark:bg-[#272829] overflow-hidden mx-[15px] mt-[15px] shadow-shadow5 dark:shadow-none rounded-2xl'>
					<div
						onClick={() => {
							window.location.href = 'https://t.me/Salomprestige_bot';
						}}
						className='cursor-pointer'
					>
						<div className={`py-[20px] ${' border-b border-b-[#F7F7F9]'} dark:border-b-[#4B4B59] pl-[15px] pr-[30px] flex  justify-between items-center`}>
							<div className='flex gap-[14px] items-center'>
								<NaushnukIcon fill={darkmode ? '#fff' : '#141414'} />
								<div className='text-blueWood dark:text-white text-base'>{t('home.support')}</div>
							</div>
							<ArrowRight fill={darkmode ? '#ffff' : '#042B50'} />
						</div>
					</div>

					<div
						onClick={() => {
							navigate('/settings');
						}}
						className='cursor-pointer'
					>
						<div className={`py-[20px]  dark:border-b-[#4B4B59] pl-[15px] pr-[30px] flex  justify-between items-center`}>
							<div className='flex gap-[14px] items-center'>
								<Settings2ServiseIcon fill={darkmode ? '#fff' : '#141414'} />
								<div className='text-blueWood dark:text-white text-base'>{t('home.settings')}</div>
							</div>
							<ArrowRight fill={darkmode ? '#ffff' : '#042B50'} />
						</div>
					</div>
				</div> */}
			</div>

			{/* <MobileTab darkmode={darkmode} /> */}
		</div>
	);
};

export default Services;
