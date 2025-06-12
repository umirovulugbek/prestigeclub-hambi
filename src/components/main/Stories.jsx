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
				<div className='container_main !px-0 w-full'>
					<div className='relative h-screen' onClick={e => e.stopPropagation()}>
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
		{
			id: 2,
			title: (
				<div className='flex flex-col gap-1'>
					<div className='text-sm font-medium leading-[14px]'> {lan === 'ru' ? 'Дананг' : 'Danang'} </div>
					<p className=' font-bold text-[10px]'> {lan === 'ru' ? 'Рекомендуемые отели' : 'Tavsiya etilgan mehmonxonalar'} </p>
				</div>
			),
			image: '/images/trabzon-stories-1.png',
			bgColor: 'bg-[#203D8F]',
			stories: [
				{
					content: () => {
						return (
							<div className=' w-full h-full    px-[15px] '>
								<img src='/images/trabzon-stories-1.png' alt='' className=' absolute left-0 top-0  w-full right-0 bottom-0 h-full object-cover' />
								<div className=' z-10  relative flex  justify-between h-full items-center flex-col pb-[100px] pt-[60px]'>
									<div>
										<h2 className='text-white font-semibold text-[64px]'>{lan === 'ru' ? 'Трабзон' : 'Trabzon'}</h2>
										<p className='font-semibold text-[26px] text-white mt-[35px]'>
											{lan === 'ru' ? (
												<>
													Горы... Чанные террасы... <br /> черное море...
												</>
											) : (
												<>Tog‘lar... Qora dengiz...</>
											)}
										</p>
										<p className='font-semibold text-[26px] text-white mt-[20px]'>
											{' '}
											{lan === 'ru'
												? ' Почему стоит поехать в Трабзон и Ризе хотя бы раз?'
												: 'Nima uchun Trabzon va Rizega kamida bir marta tashrif buyurishga arziydi?'}
										</p>
									</div>
									<p className='font-medium text-[17px] bg-white p-[15px] rounded-[10px]'>
										{lan === 'ru' ? (
											<>
												Есть места, куда нужно попасть хотя бы один раз в жизни. Трабзон и Ризе — из таких. Это не про "показать в сторис", а про
												"почувствовать и сохранить внутри".
											</>
										) : (
											<>
												Hayotda kamida bir marta borish kerak bo‘lgan joylar bor. Trabzon va Rize ana shunday joylardan. Bu "ijtimoiy tarmoqlarda
												ko‘z-ko‘z qilish" emas, balki "his etish va qalbingizda saqlash" haqida.
											</>
										)}
									</p>
								</div>
							</div>
						);
					},
				},
				{
					content: () => {
						return (
							<div className=' w-full h-full  bg-[#196e0c]  px-[15px] '>
								<img src='/images/trabzon-stories-2.jpg' alt='' className=' absolute left-0 top-0  w-full right-0 bottom-0 h-full object-cover' />
								<div className=' z-10  relative flex  justify-between h-full items-center flex-col pb-[100px] pt-[60px]'>
									<div></div>
									<p className='font-medium text-[17px] bg-white p-[15px] rounded-[10px]'>
										{lan === 'ru' ? (
											<>Чтобы увидеть, как выглядит настоящий покой. Тишина, природа, чайные склоны — всё, что нужно, чтобы выдохнуть.</>
										) : (
											<>
												Haqiqiy osoyishtalik qanday bo‘lishini ko‘rish uchun. Sukunat, tabiat, choy tepaliklari - nafas rostlash uchun zarur bo‘lgan
												barcha narsa.
											</>
										)}
									</p>
								</div>
							</div>
						);
					},
				},
				{
					content: () => {
						return (
							<div className=' w-full h-full  bg-[#0b3704]  px-[15px] '>
								<img src='/images/trabzon-stories-3.jpg' alt='' className=' absolute left-0 top-0  w-full right-0 bottom-0 h-full object-cover' />
								<div className=' z-10  relative flex  justify-between h-full items-center flex-col pb-[100px] pt-[60px]'>
									<div></div>
									<p className='font-medium text-[17px] bg-white p-[15px] rounded-[10px]'>
										{lan === 'ru' ? (
											<>Чтобы оказаться внутри облаков. Нет фильтров. Только ты, горы и дыхание природы.</>
										) : (
											<>Bulutlar qo‘ynida bo‘lish uchun. Hech qanday sun’iylik yo‘q. Faqat sen, tog‘lar va tabiatning nafasi.</>
										)}
									</p>
								</div>
							</div>
						);
					},
				},
				{
					content: () => {
						return (
							<div className=' w-full h-full  bg-[#49963d]  px-[15px] '>
								<img src='/images/trabzon-stories-4.jpg' alt='' className=' absolute left-0 top-0  w-full right-0 bottom-0 h-full object-cover' />
								<div className=' z-10  relative flex  justify-between h-full items-center flex-col pb-[100px] pt-[60px]'>
									<div></div>
									<p className='font-medium text-[17px] bg-white p-[15px] rounded-[10px]'>
										{lan === 'ru' ? (
											<>Чтобы понять, что такое "ничего не делать" — и быть счастливым. Озеро Узунгёль просто останавливает время. </>
										) : (
											<>"Hech narsa qilmaslik"ning mohiyatini anglash va baxtli bo‘lish uchun. Uzungo‘l vaqtni to‘xtatib qo‘yadi, xolos.</>
										)}
									</p>
								</div>
							</div>
						);
					},
				},
				{
					content: () => {
						return (
							<div className=' w-full h-full  bg-[#75a914]  px-[15px] '>
								<img src='/images/trabzon-stories-5.jpg' alt='' className=' absolute left-0 top-0  w-full right-0 bottom-0 h-full object-cover' />
								<div className=' z-10  relative flex  justify-between h-full items-center flex-col pb-[100px] pt-[60px]'>
									<div></div>
									<p className='font-medium text-[17px] bg-white p-[15px] rounded-[10px]'>
										{lan === 'ru' ? (
											<>Чтобы почувствовать простую, тёплую радость вдалеке от городского шума. Здесь живёт настоящий уют. </>
										) : (
											<>Shahar shovqinidan uzoqda oddiy, iliq quvonchni his qilish uchun. Bu yerda haqiqiy uyg‘unlikni topasiz.</>
										)}
									</p>
								</div>
							</div>
						);
					},
				},
				{
					content: () => {
						return (
							<div className=' w-full h-full  bg-[#196e0c]  px-[15px] '>
								<img src='/images/trabzon-stories-6.jpg' alt='' className=' absolute left-0 top-0  w-full right-0 bottom-0 h-full object-cover' />
								<div className=' z-10  relative flex  justify-between h-full items-center flex-col pb-[100px] pt-[60px]'>
									<div></div>
									<p className='font-medium text-[17px] bg-white p-[15px] rounded-[10px]'>
										{lan === 'ru' ? (
											<>Чтобы увидеть, как люди строили в невозможных местах и почувствовать силу веры и времени — прямо в скале. </>
										) : (
											<>
												Odamlarning ilojsiz joylarda qanday qurilish olib borganini ko‘rish va ishonch hamda vaqtning kuchini his qilish uchun -
												to‘g‘ridan-to‘g‘ri qoyada.
											</>
										)}
									</p>
								</div>
							</div>
						);
					},
				},
				{
					content: () => {
						return (
							<div className=' w-full h-full  bg-[#196e0c]  px-[15px] '>
								<img src='/images/trabzon-stories-7.jpg' alt='' className=' absolute left-0 top-0  w-full right-0 bottom-0 h-full object-cover' />
								<div className=' z-10  relative flex  justify-between h-full items-center flex-col pb-[100px] pt-[60px]'>
									<div></div>
									<p className='font-medium text-[17px] bg-white p-[15px] rounded-[10px]'>
										{lan === 'ru' ? (
											<>Чтобы встретить один из самых красивых закатов в жизни. С чашкой чая и полным спокойствием внутри. </>
										) : (
											<>Hayotdagi eng go‘zal quyosh botishlaridan birini kuzatish uchun.  Bir piyola choy va qalbda to‘liq xotirjamlik bilan.</>
										)}
									</p>
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
