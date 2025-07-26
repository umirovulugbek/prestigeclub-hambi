import { useTranslation } from 'react-i18next';

const useTrabzoneStory = () => {
	const { i18n } = useTranslation();
	const lan = i18n.language;
	return [
		{
			id: 2,
			title: (
				<div className='flex flex-col gap-1'>
					<div className='text-sm font-medium leading-[14px]'> {lan === 'ru' ? 'Трабзон' : 'Trabzon'} </div>
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
											<>Hayotdagi eng go‘zal quyosh botishlaridan birini kuzatish uchun. Bir piyola choy va qalbda to‘liq xotirjamlik bilan.</>
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
};

export default useTrabzoneStory;
