import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Stories from 'react-insta-stories';
import PreloadImage from 'react-preload-image';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '../homeS3Icon';

const StoryModal = ({ stories, onClose, setSelectStories }) => {
	const { story_loading } = useSelector(s => s);
	const dispatch = useDispatch();

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<div className=''>
			<div className='fixed   inset-0 z-[99999] bg-black flex items-center justify-center' onClick={onClose}>
				<div className='container_main !px-0'>
					<div className='relative     h-screen' onClick={e => e.stopPropagation()}>
						<Stories
							stories={stories}
							onAllStoriesEnd={() => {
								setSelectStories(null);
							}}
							onStoryEnd={() => {
								dispatch({ type: 'SET_STORY_LOADING', payload: true });
							}}
							keyboardNavigation
							autoPlay
							progressStyles={{
								background: '#235DFF',
								borderRadius: '10px',
								height: '5px',
							}}
							progressWrapperStyles={{
								background: '#ffffff',
								borderRadius: '10px',
								height: '5px',
								shadow: 'none',
							}}
							// width={window.innerWidth}
							width={'100%'}
							height={window.innerHeight}
							defaultInterval={3000}
							isPaused={story_loading}
						/>

						<button className='absolute top-7 right-4 text-white text-3xl font-bold p-2  z-[999999] rounded-full ' onClick={onClose}>
							<CloseIcon fill={'#FFFF'} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const Storiess = () => {
	const [selectStories, setSelectStories] = useState(null);
	const { i18n } = useTranslation();
	const lan = i18n.language;

	const data = [
		// {
		// 	id: 1,
		// 	title: (
		// 		<div className='flex flex-col gap-1'>
		// 			<p className=' font-bold'>Дананг</p>
		// 			<div className='text-sm font-medium leading-[14px]'>Рекомендуемые отели</div>
		// 		</div>
		// 	),
		// 	image: '/images/story-danang.jpg',
		// 	stories: [
		// 		{
		// 			content: () => {
		// 				return (
		// 					<div className='relative w-full h-full'>
		// 						<PreloadImage duration='300ms' lazy src='/images/story-danang.jpg' alt='' className=' absolute left-0 top-0 right-0 bottom-0 w-full h-full object-cover' />
		// 						<div className=' z-10  relative flex  justify-between h-full items-center flex-col'>
		// 							<div></div>
		// 							<div></div>
		// 							<div></div>
		// 							<div className=' mx-[15px]'>
		// 								<h1 className='text-white font-semibold text-[64px] leading-[150%] text-start select-none'>Дананг</h1>
		// 								<p className='bg-white p-[15px] rounded-[10px] select-none'>
		// 									Идеальное сочетание природы, культуры и современного комфорта! Золотые пляжи, потрясающие пейзажи и исторические достопримечательности
		// 									делают его одним из самых востребованных курортов.
		// 								</p>
		// 							</div>
		// 							<div></div>
		// 						</div>
		// 					</div>
		// 				);
		// 			},
		// 		},
		// 		{
		// 			content: () => {
		// 				return (
		// 					<div className='relative w-full h-full'>
		// 						<PreloadImage duration='300ms' lazy src='/images/crowne-plaza.jpg' alt='' className=' absolute left-0 top-0 right-0 bottom-0 w-full h-full object-cover' />
		// 						<div className=' z-10   flex  justify-between h-full items-center flex-col'>
		// 							<div></div>
		// 							<div className='m-[15px] flex gap-3 flex-col z-[999999]'>
		// 								<p className='bg-[#235DFF] py-[5px] px-[15px] rounded-lg  w-max text-xl  font-semibold text-white select-none'>Crowne Plaza Danang</p>
		// 								<p className='bg-white p-[15px] rounded-[10px] mb-5 select-none'>
		// 									Объект размещения расположен в одном из лучших районов г. Da Nang — Hòa H?i, вблизи от интересных мест и популярных ресторанов. Для более
		// 									комфортного размещения этот 4.5-звездочный отель предлагает гостям непосредственно на своей территории такие услуги, как термальная
		// 									купальня, массаж и сауна.
		// 								</p>
		// 								<button
		// 									onClick={() => {
		// 										if (window.location.href !== 'https://kun.uz/') {
		// 											window.location.href = 'https://kun.uz/';
		// 										}
		// 									}}
		// 									className='w-full z-[999999] select-none   cursor-pointer bg-white h-[55px] font-medium  rounded-[10px] flex justify-center items-center'
		// 								>
		// 									Перейти в отель
		// 								</button>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				);
		// 			},
		// 		},
		// 	],
		// },
		{
			id: 1,
			title: (
				<div className='flex flex-col gap-1'>
					<p className=' font-bold text-[10px]'>{lan === 'ru' ? 'Все об онлайн бронировании' : 'Hammasi haqida onlayn bron qilish'}</p>
					{/* <div className='text-sm font-medium leading-[14px]'>Рекомендуемые отели</div> */}
				</div>
			),
			image: '/images/stroy-bg-1.svg',
			bgColor: 'bg-[#203D8F]',
			stories: [
				{
					content: () => {
						return (
							<div className=' relative w-full h-full bg-[#235DFF80]  px-[15px] pt-10'>
								<div className='w-full h-[200px]'>
									<img src='/images/stroty-content-1.svg' alt='' className='h-[200px]  w-full' />
								</div>
								<div className='flex flex-col text-white'>
									<h1 className=' font-semibold text-[26px] leading-[40px] mb-3'>
										{lan === 'ru' ? 'Онлайн бронирование — это удобно и выгодно!' : 'Onlayn band qilish - qulay va foydali!'}
									</h1>
									<p className=' text-[22px] leading-[24px] mb-2'>
										{lan === 'ru'
											? 'Забронируй тур за пару минут — без звонков и переплат. Всё удобно, быстро и по лучшей цене.'
											: 'Turni bir necha daqiqada band qiling - qo‘ng‘iroqlarsiz va ortiqcha to‘lovlarsiz. Hammasi qulay, tez va eng yaxshi narxda.'}
									</p>
									<h3 className='font-semibold text-[22px] leading-[35px] mb-2'>{lan === 'ru' ? 'Как забронировать тур ?' : 'Turni qanday band qilish mumkin?'}</h3>
									<div className='  text-[20px] leading-[35px] ml-1'>
										1.{lan === 'ru' ? 'Выбери направление' : "Yo'nalishni tanlang"} <br /> 2.{' '}
										{lan === 'ru' ? 'Укажи дату и кол-во ночей' : 'Sana va tunlar sonini tanlang'} <br /> 3.{' '}
										{lan === 'ru' ? 'Выбери подходящий отель' : 'Mos mexmonxonani tanlang'} <br /> 4.{' '}
										{lan === 'ru' ? 'Выбери номер и тип питание' : 'Xona va ovqatlanish turini tanlang'} <br /> 5.{' '}
										{lan === 'ru' ? 'Проверь состав тура' : 'Tur tarkibini tekshiring'} <br /> 6.{' '}
										{lan === 'ru' ? 'Введи данные — и бронируй' : "Ma'lumotlarni kiriting - va band qiling"}
									</div>
								</div>
							</div>
						);
					},
				},
			],
		},
	];
	return (
		<div className='mb-4 flex gap-3'>
			{data.map(item => (
				<div key={item.id} onClick={() => setSelectStories(item.stories)} className={`w-[95px] h-[115px] relative cursor-pointer rounded-lg ${item?.bgColor}`}>
					<PreloadImage
						duration='300ms'
						lazy
						src={item.image}
						alt={item.title}
						className='absolute !rounded-lg w-full h-full object-cover stories-img '
						innerStyle={{
							borderRadius: '8px',
						}}
						style={{
							borderRadius: '8px',
						}}
					/>
					<div className='absolute bottom-2 left-2 right-2   text-white'>{item.title}</div>
				</div>
			))}

			{selectStories && <StoryModal setSelectStories={setSelectStories} stories={selectStories} onClose={() => setSelectStories(null)} />}
		</div>
	);
};

export default Storiess;
