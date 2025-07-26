import { useTranslation } from 'react-i18next';

const useIstanbulStory = () => {
	const { i18n } = useTranslation();
	const lan = i18n.language;
	return [
		{
			id: 3,
			title: (
				<>
					<div className='text-sm font-medium leading-[14px]'> {lan === 'ru' ? 'Стамбул' : 'Istanbul'} </div>
				</>
			),
			image: '/images/istanbul-stories-1.jpg',
			bgColor: 'bg-[#203D8F]',
			stories: [
				{
					content: () => {
						return (
							<div className=' w-full h-full px-[15px] '>
								<img src='/images/istanbul-stories-1.jpg' alt='' className=' absolute left-0 top-0  w-full right-0 bottom-0 h-full object-cover' />
								<div className=' z-10  relative flex  justify-between h-full  flex-col pb-[100px] pt-[60px]'>
									<div>
										<h2 className='text-white font-semibold text-[64px]'>{lan === 'ru' ? 'Стамбул' : 'Istanbul'}</h2>
										<p className='font-semibold text-[26px] text-white mt-[35px]'>
											{lan === 'ru' ? <>Город, в котором история встречает современность</> : <>Tarix va zamonaviylik tutashgan shahar</>}
										</p>
									</div>
									<p className='font-medium text-[17px] bg-white p-[15px] rounded-[10px]'>
										{lan === 'ru' ? (
											<>
												Где ещё за один день можно: <br /> — Завтракать в Европе, а ужинать в Азии <br /> — Кататься на пароме по Босфору <br /> —
												Погулять по рынкам Османской империи <br /> — Сделать фото на фоне мечетей и Галатской башни
											</>
										) : (
											<>
												Bir kunda nimalar qilish mumkin? <br /> — Yevropada nonushta, Osiyoda tushlik <br /> — Bosfor boʻylab paromda aylanish <br /> —
												Ming yillik bozorlarda sayr qilish <br /> — Goʻzal masjidlar va Galata minorasida suratga tushish
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
							<div className='bg-[#EBF0F5] w-full h-full relative'>
								<div className='pt-[30px] grid grid-cols-2 gap-[5px] px-[5px] mb-[11px]'>
									<img src='/images/istanbul-stories-2-1.png' alt='' className='w-full h-[207px] rounded-xl object-cover' />
									<img src='/images/istanbul-stories-2-2.png' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/istanbul-stories-2-3.png' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/istanbul-stories-2-4.png' alt='' className='w-full h-[207px] rounded-xl' />
								</div>
								<div className='bg-white pt-[25px] px-[20px] flex-col rounded-t-[20px] h-full flex  gap-3'>
									<div>
										<div className=' text-lg font-semibold'>
											{lan === 'uz'
												? 'Sultanahmet va qadimiy markazTarixni his qilish uchun eng toʻgʻri joy'
												: 'Султанахмет и древний город История, которой тысячи лет'}
										</div>
										<div className='text-[17px]  font-medium text-[#141414]'>
											{lan === 'uz' ? (
												<>
													- Ko‘k masjid, Ayasofiya va Topqopi saroyi <br /> - Katta bozor va Misr bozori <br /> - Sharq muhiti: ziravorlar hidi,
													azon ovozi <br /> - Har bir burchagi ochiqxatga o‘xshagan joy
												</>
											) : (
												<>
													Голубая мечеть, Айя-София и дворец Топкапы <br /> - Гранд-базар и Египетский рынок <br /> - Атмосфера Востока: ароматы
													специй, звуки азана <br /> - Место, где каждый уголок — открытка
												</>
											)}
										</div>
									</div>
									<div className=' absolute bottom-9 bg-[#235DFF] w-[calc(100%_-_40px)] flex justify-center items-center  rounded-[30px] h-[57px] font-medium text-white text-[20px]'>
										{lan === 'ru' ? 'Далее' : 'Keyingisi'}
									</div>
								</div>
							</div>
						);
					},
				},
				{
					content: () => {
						return (
							<div className='bg-[#EBF0F5] w-full h-full relative'>
								<div className='pt-[30px] grid grid-cols-2 gap-[5px] px-[5px] mb-[11px]'>
									<img src='/images/istanbul-stories-3-1.png' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/istanbul-stories-3-2.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/istanbul-stories-3-3.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/istanbul-stories-3-4.jpg' alt='' className='w-full h-[207px] rounded-xl' />
								</div>
								<div className='bg-white pt-[25px] px-[20px] flex-col rounded-t-[20px] h-full flex  gap-3'>
									<div>
										<div className=' text-lg font-semibold'>
											{lan === 'ru'
												? 'Таксим, Галата и уличная жизнь Современный ритм Стамбула'
												: 'Taksim, Galata va shahar ritmi Zamonaviy Istanbulning yuragi'}
										</div>
										<div className='text-[17px]  font-medium text-[#141414]'>
											{lan === 'uz' ? (
												<>
													- Istiqlol ko‘chasi
													<br /> - jonli musiqa va do‘konlarr
													<br /> - Qahvaxonalar va zamonaviy kafelar <br /> - Galata minorasi va Bosfor manzarasi <br /> - Ko‘prikda kechki sayr va
													Karako‘y’da kechki ovqat
												</>
											) : (
												<>
													- Улица Истикляль — живая музыка и магазины <br /> - Кофейни и модные кафе <br /> - Галатская башня и панорама Босфора{' '}
													<br /> - Вечерняя прогулка по мосту и ужин в Каракёй
												</>
											)}
										</div>
									</div>
									<div className=' absolute bottom-9 bg-[#235DFF] w-[calc(100%_-_40px)] flex justify-center items-center  rounded-[30px] h-[57px] font-medium text-white text-[20px]'>
										{lan === 'ru' ? 'Далее' : 'Keyingisi'}
									</div>
								</div>
							</div>
						);
					},
				},
				{
					content: () => {
						return (
							<div className='bg-[#EBF0F5] w-full h-full relative'>
								<div className='pt-[30px] grid grid-cols-2 gap-[5px] px-[5px] mb-[11px]'>
									<img src='/images/istanbul-stories-4-1.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/istanbul-stories-4-2.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/istanbul-stories-4-3.png' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/istanbul-stories-4-4.jpg' alt='' className='w-full h-[207px] rounded-xl' />
								</div>
								<div className='bg-white pt-[25px] px-[20px] flex-col rounded-t-[20px] h-full flex  gap-3'>
									<div>
										<div className=' text-lg font-semibold'>
											{lan === 'ru'
												? 'Босфор и два мира Стамбул с воды — другое измерение'
												: 'Bosfor va ikki dunyo Istanbulni suvdan koʻrish — boshqa olam'}
										</div>
										<div className='text-[17px]  font-medium text-[#141414]'>
											{lan === 'uz' ? (
												<>
													- Yevropa va Osiyo orasida parom bilan sayohat <br /> - Bosfor ko‘prigi birlik ramzi sifatida <br /> - Dolmabahcha saroyi
													va sohildagi masjidlar manzarasi <br /> - Unutib bo‘lmaydigan Istambul
												</>
											) : (
												<>
													- Прогулка на пароме между Европой и Азией <br /> - Мост через Босфор как символ единства
													<br /> - Вид на дворец Долмабахче и мечети у воды
													<br /> - Стамбул, который невозможно забыть
												</>
											)}
										</div>
									</div>
									<div className=' absolute bottom-9 bg-[#235DFF] w-[calc(100%_-_40px)] flex justify-center items-center  rounded-[30px] h-[57px] font-medium text-white text-[20px]'>
										Тур в Стамбул от 8млн
									</div>
								</div>
							</div>
						);
					},
				},
			],
		},
	];
};

export default useIstanbulStory;
