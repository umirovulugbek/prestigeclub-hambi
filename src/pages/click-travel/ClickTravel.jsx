import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import GetReviewWidget from '../../components/main/widget';
import ButtonMain from '../../components/ui/ButtonMain';
import NavigationOne from '../../components/ui/NavigationOne';
import SyncScroll from '../../components/ui/SyncScroll';
import useTopHotelApi from '../../hooks/api/useTopHotelApi';
import { trackEvent } from '../../utils/mixpanel';

const ClickTravel = ({ darkmode }) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { slug } = useParams();
	const { home_top } = useTopHotelApi();

	const travelData = {
		1: {
			title: t('home.travelData-title-1'),
			bgImage: '/images/bg-fukok.svg',
			description: t('home.travelData-description-1'),
			tags: [t('home.tag-1'), t('home.tag-2'), t('home.tag-3'), t('home.tag-4'), t('home.tag-5'), t('home.tag-6'), t('home.tag-7')],
			bannerImage: '/images/fukok-banner.svg',
			bestHotelsTitle: t('home.travelData-bestHotelsTitle'),
			widgetId: 'vcD1qbpHzwIKPr7L',
			accardion_data: [
				{ question: t('home.11-question'), answer: t('home.11-answer') },
				{ question: t('home.12-question'), answer: t('home.12-answer') },
				{ question: t('home.13-question'), answer: t('home.13-answer') },
				{ question: t('home.14-question'), answer: t('home.14-answer') },
				{ question: t('home.15-question'), answer: t('home.15-answer') },
			],
		},
		2: {
			link: '/hotels/result-hotel/?town_from_inc=1853&tour_operator_id=1&state_id=10&hotel_key=9056&tour_somo_id=7',
			title: t('home.travelData-title-2'),
			bgImage: '/images/bg-sharm-el-sheikh.svg',
			description: t('home.travelData-description-2'),
			tags: [
				t('home.sharmteg1'),
				t('home.sharmteg2'),
				t('home.sharmteg3'),
				t('home.sharmteg4'),
				t('home.sharmteg5'),
				t('home.sharmteg6'),
				t('home.sharmteg7'),
				t('home.sharmteg8'),
				t('home.sharmteg9'),
				t('home.sharmteg10'),
			],
			bannerImage: '/images/fukok-banner.svg',
			bestHotelsTitle: t('home.travelData-bestHotelsTitle'),
			widgetId: 'aYIIUjJemDqedXYk',
			accardion_data: [
				{ question: t('home.1-question'), answer: t('home.1-answer') },
				{ question: t('home.2-question'), answer: t('home.2-answer') },
				{ question: t('home.3-question'), answer: t('home.3-answer') },
				{ question: t('home.4-question'), answer: t('home.4-answer') },
				{ question: t('home.5-question'), answer: t('home.5-answer') },
			],
		},
		3: {
			link: '/hotels/result?town_from_inc=1853&tour_operator_id=1&state_id=43&checkin=20250527&nights=8&towns[]=34&adult=2&childs=0&tour_somo_id=34&',
			title: t('home.travelData-title-3'),
			bgImage: '/images/bg-nyachang.svg',
			description: t('home.travelData-description-3'),
			tags: [
				t('home.nyachangteg1'),
				t('home.nyachangteg2'),
				t('home.nyachangteg3'),
				t('home.nyachangteg4'),
				t('home.nyachangteg5'),
				t('home.nyachangteg6'),
				t('home.nyachangteg7'),
				t('home.nyachangteg8'),
				t('home.nyachangteg9'),
				t('home.nyachangteg10'),
			],
			bannerImage: '/images/fukok-banner.svg',
			bestHotelsTitle: t('home.travelData-bestHotelsTitle'),
			widgetId: 'SoakshkjYkehLHqv',
			tour_somo_id: 34,
			accardion_data: [
				{ question: t('home.6-question'), answer: t('home.6-answer') },
				{ question: t('home.7-question'), answer: t('home.7-answer') },
				{ question: t('home.8-question'), answer: t('home.8-answer') },
				{ question: t('home.9-question'), answer: t('home.9-answer') },
				// { question: t('home.10-question'), answer: t('home.10-answer') },
			],
			town_name: t('home.nyachang'),
			state_name: t('home.vetnam'),
			comments: [
				{
					name: t('home.comment_name1'),
					comment: t('home.comment_nyachang1'),
				},
				{
					name: t('home.comment_name2'),
					comment: t('home.comment_nyachang2'),
				},
				{
					name: t('home.comment_name3'),
					comment: t('home.comment_nyachang3'),
				},
				{
					name: t('home.comment_name4'),
					comment: t('home.comment_nyachang4'),
				},
				{
					name: t('home.comment_name5'),
					comment: t('home.comment_nyachang5'),
				},
			],
		},
	};
	const currentData = travelData[slug] || travelData[1];

	return (
		<div className={`min-h-screen pb-[65px] ${darkmode ? 'bg-[#141414]' : 'bg-[#EBF0F5]'}`}>
			<NavigationOne
				trackEvent_link='nyachang_view_back'
				is_trackEvent={true}
				linkClose={true}
				link='https://my.click.uz/app/webView?url=https%3A%2F%2Ftravel-front.bpm-tripusk.uz%2F&auth=true&hide_cross=true'
				darkmode={darkmode}
				text={t('home.nyachang_from_27')}
			/>
			<div className='container_main !px-0'>
				<img src={currentData?.bgImage} alt='' className='w-full relative top-[45px]' />
				<div className='top-[30px] relative flex flex-col gap-5 '>
					<div className='bg-white dark:bg-[#272829] py-[20px] rounded-t-[12px] flex flex-col gap-4 mb-[15px]'>
						<div className='px-[10px] flex flex-col gap-4'>
							<div className='bg-[#77B2F4]  dark:bg-[#192E46] py-4 px-4 rounded-xl flex-col flex gap-3 text-center'>
								<h2 className='text-white  leading-[28px] font-semibold text-[22px]'>{t('home.discount_title')}</h2>
								<p className='text-white  text-base'>{t('home.discount_desc')} </p>
							</div>
							<GetReviewWidget
								onClick={() => {
									trackEvent('nyachang_view_str');
								}}
								widgetId={currentData.widgetId}
							/>
							<h2 className='text-[#141414] dark:text-white font-medium text-xl text-center'>{currentData.title}</h2>
							<p className='text-[#141414AA] dark:text-white text-center text-base  leading-[18px]'>{currentData.description}</p>
							<div className='flex overflow-x-scroll gap-2'>
								<SyncScroll data={currentData.tags} />
							</div>
							<img src='/images/linedashed.svg' alt='' className='py-2' />
							<p className=' text-center dark:text-white text-[#141414] font-medium text-base '>
								{t('home.prestige_team1')} <span className='!text-[#235DFF] cursor-pointer'>{t('home.prestigeDMC')}</span>, {t('home.prestige_team2')}
							</p>
							<div className='flex  gap-[10px]  items-center'>
								<div
									onClick={() => {
										trackEvent('nyachang_view_str_DMC_widget');
									}}
									data-widget-id={'oQvDZglSEl7fZfwJ'}
									className='getreview-widget !w-auto'
								/>
								<div>
									<img src='/images/team_prstg.svg' alt='' />
								</div>
							</div>
						</div>

						<div className='px-[10px] flex flex-col gap-3'>
							<ButtonMain
								text={t('home.view_all_hotel')}
								type_color={'t_blue'}
								onClick={() => {
									trackEvent('nyachang_view_click_button');
									navigate(currentData?.link);
								}}
							/>
						</div>
					</div>

					<div className=' pl-[15px] flex flex-col gap-3 '>
						<h2 className=' font-medium text-base  text-[#141414] dark:text-white'>{t('home.reviews_direction_nyachang')}</h2>
						<div
							onScroll={() => {
								trackEvent('nyachang_view_review');
							}}
							className='flex gap-[10px] overflow-x-scroll'
						>
							{currentData?.comments?.map((item, index) => {
								return (
									<div
										key={index}
										className='bg-white dark:bg-[#272829] text-[#141414] dark:text-white min-w-[300px] p-[15px] flex flex-col gap-[10px] rounded-[15px]'
									>
										<div className='flex justify-between'>
											<div className='flex flex-col'>
												<div className=' font-medium'>{item?.name}</div>
												<div className=' text-xs'>
													{currentData?.state_name}, {currentData?.town_name}
												</div>
											</div>
											<img src='/images/rating.svg' alt='' />
										</div>
										<div className=' text-sm'>{item?.comment}</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className=' px-[15px] flex flex-col gap-3 '>
						{currentData?.accardion_data?.map((item, index) => {
							return (
								<div key={index} className='flex flex-col rounded-lg bg-white dark:bg-[#272829] text-[#141414] dark:text-white p-[15px] gap-3'>
									<div className=' font-medium text-base'>{item?.question}</div>
									<img src='/images/linedashed.svg' alt='' />
									<div className='  text-sm'>{item?.answer}</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClickTravel;
