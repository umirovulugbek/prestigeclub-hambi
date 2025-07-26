import { useTranslation } from 'react-i18next';

const useNyachangStory = () => {
	const { i18n } = useTranslation();
	const lan = i18n.language;
	return [
		{
			id: 4,
			title: (
				<>
					<div className='text-sm font-medium leading-[14px]'> {lan === 'ru' ? 'Нячанг' : 'Nyachang'} </div>
				</>
			),
			image: '/images/nyachang-stories-1.jpg',
			bgColor: 'bg-[#203D8F]',
			stories: [
				{
					content: () => {
						return (
							<div className=' w-full h-full    px-[15px] '>
								<img src='/images/nyachang-stories-1.jpg' alt='' className=' absolute left-0 top-0  w-full right-0 bottom-0 h-full object-cover' />
								<div className=' z-10  relative flex  justify-between h-full  flex-col pb-[100px] pt-[60px]'>
									<div>
										<h2 className='text-white font-semibold text-[64px]'>{lan === 'ru' ? 'Нячанг' : 'Nyachang'}</h2>
										<p className='font-semibold text-[26px] text-white mt-[35px]'>
											{lan === 'ru' ? <>Курорт, который влюбляет с первого взгляда</> : <>Bir ko‘rishdayoq sevib qoladigan kurort</>}
										</p>
									</div>
									<p className='font-medium text-[17px] bg-white p-[15px] rounded-[10px]'>
										{lan === 'ru' ? (
											<>
												Где ещё за день можно: <br /> — Позагорать на белоснежном пляже <br /> — Поплавать у островов и кораллов <br /> — Прокатиться по
												канатке прямо над морем <br /> — Окунуться в лечебные грязевые источники
											</>
										) : (
											<>
												Bir kunda yana qayerlarda quyidagilarni qilish mumkin: <br /> — Oppoq qumli sohilda quyoshda toblanish <br /> — Orollar va
												marjon riflari atrofida suzish <br /> — Dengiz ustidan arqonli yo‘lda sayr qilish <br /> — Shifobaxsh balchiqli buloqlarga
												cho‘milish
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
									<img src='/images/nyachang-stories-2-1.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/nyachang-stories-2-2.png' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/nyachang-stories-2-3.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/nyachang-stories-2-4.jpg' alt='' className='w-full h-[207px] rounded-xl' />
								</div>
								<div className='bg-white pt-[25px] px-[20px] flex-col rounded-t-[20px] h-full flex  gap-3'>
									<div>
										<div className=' text-lg font-semibold'>
											{lan === 'ru' ? 'Острова и VinWonders — приключения для всех' : ' Orollar va VinWonders - barchaga mo‘ljallangan sarguzashtlar'}
										</div>
										<div className='text-[17px]  font-medium text-[#141414]'>
											{lan === 'ru' ? (
												<>
													— Морские экскурсии и катера на острова Хон Мун, Хон Там, Хон Че 🛥 <br /> — VinWonders: канатка над морем, аквапарк, шоу,
													сафари 🎢 <br />— Дайвинг и снорклинг среди кораллов 🐠 <br /> — Рыбалка, SUP и катание на бананах 🚤
												</>
											) : (
												<>
													— Xon Mun, Xon Tam, Xon Che orollariga dengiz sayohatlari va kater sayr🛥 <br /> — VinWonders: dengiz uzra kanat yo‘li,
													akvapark, tomoshalar, safari 🎢 <br /> — Marjonlar orasida g‘avvoslik va snorkling 🐠 <br />— Baliq ovlash, SUP va banan
													qayiqda uchish 🚤
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
									<img src='/images/nyachang-stories-3-1.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/nyachang-stories-3-2.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/nyachang-stories-3-3.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/nyachang-stories-3-4.jpg' alt='' className='w-full h-[207px] rounded-xl' />
								</div>
								<div className='bg-white pt-[25px] px-[20px] flex-col rounded-t-[20px] h-full flex  gap-3'>
									<div>
										<div className=' text-lg font-semibold'>{lan === 'uz' ? 'Dengizga qaragan Nyachang mehmonxonalari' : 'Отели Нячанга с видом на море'}</div>
										<div className='text-[17px]  font-medium text-[#141414]'>
											{lan === 'ru' ? (
												<>
													— Прямо на первой линии: Vinpearl, Marriot, Amiana, Intercontinental <br /> — Халяль-концепции, семейные номера и
													романтические люксы <br />— Панорамные бассейны, спа, кухни из морепродуктов <br /> — Подходит и для пар, и для отдыха с
													детьми
												</>
											) : (
												<>
													- Birinchi qatorda joylashgan: Vinpearl, Marriot, Amiana, Intercontinental <br /> - Halol konsepsiyali, oilaviy xonalar va
													romantik lyukslar <br /> - Panoramali hovuzlar, spa markazlari, dengiz mahsulotlari oshxonalari <br /> - Juftliklar uchun
													ham, bolalar bilan dam olish uchun ham qulay
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
									<img src='/images/nyachang-stories-4-1.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/nyachang-stories-4-2.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/nyachang-stories-4-3.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/nyachang-stories-4-4.jpg' alt='' className='w-full h-[207px] rounded-xl' />
								</div>
								<div className='bg-white pt-[25px] px-[20px] flex-col rounded-t-[20px] h-full flex  gap-3'>
									<div>
										<div className=' text-lg font-semibold'>{lan === 'ru' ? 'Песок как пудра, море — как бирюза' : 'Maldiv orollaridagi kabi oppoq qum'}</div>
										<div className='text-[17px]  font-medium text-[#141414]'>
											{lan === 'uz' ? (
												<>
													— Центральный пляж, Бай Зай и дикие бухты <br /> — Идеально для прогулок, фотосессий и закатов <br /> — Мало людей, много
													тени и пальм 🌴 <br />— Чистота, комфорт и шаг до шезлонга
												</>
											) : (
												<>
													- Markaziy plyaj, Bay Zay va yovvoyi qo‘ltiqlar <br /> - sayr qilish, suratga tushish va quyosh botishini kuzatish uchun
													ajoyib joylar <br /> - Odam kam, soya va palmalar ko‘p 🌴 <br /> - Tozalik, qulaylik va shezlongga bir qadam masofada
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
			],
		},
	];
};

export default useNyachangStory;
