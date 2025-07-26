import { useTranslation } from 'react-i18next';

const useDanangStory = () => {
	const { i18n } = useTranslation();
	const lan = i18n.language;
	return [
		{
			id: 3,
			title: (
				<>
					<div className='text-sm font-medium leading-[14px]'> {lan === 'ru' ? 'Дананг' : 'Danang'} </div>
				</>
			),
			image: '/images/danang-stories-1.jpg',
			bgColor: 'bg-[#203D8F]',
			stories: [
				{
					content: () => {
						return (
							<div className=' w-full h-full    px-[15px] '>
								<img src='/images/danang-stories-1.jpg' alt='' className=' absolute left-0 top-0  w-full right-0 bottom-0 h-full object-cover' />
								<div className=' z-10  relative flex  justify-between h-full  flex-col pb-[100px] pt-[60px]'>
									<div>
										<h2 className='text-white font-semibold text-[64px]'>{lan === 'ru' ? 'Дананг' : 'Danang'}</h2>
										<p className='font-semibold text-[26px] text-white mt-[35px]'>
											{lan === 'ru' ? <>Вьетнам, который удивляет</> : <>Hayratlanarli Vyetnam</>}
										</p>
									</div>
									<p className='font-medium text-[17px] bg-white p-[15px] rounded-[10px]'>
										{lan === 'ru' ? (
											<>
												Где ещё можно за один день: <br /> — Позагорать на пляже <br /> — Подняться в горы по канатке <br /> — Пройтись по {'>'}
												французской деревне <br /> — И сфоткаться на мосту с руками великана?
											</>
										) : (
											<>
												Yana qayerda bir kunda: <br /> - Plyajda quyoshda toblanish <br /> - Arqonli yo‘l orqali tog‘ga ko‘tarilish <br /> - Fransuz
												qishlog‘ida sayr qilish - Va ulkan qo‘lli ko‘prikda rasm oldirishni amalga oshirish mumkin?
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
									<img src='/images/danang-stories-2-1.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/danang-stories-2-2.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/danang-stories-2-3.png' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/danang-stories-2-4.jpg' alt='' className='w-full h-[207px] rounded-xl' />
								</div>
								<div className='bg-white pt-[25px] px-[20px] flex-col rounded-t-[20px] h-full flex  gap-3'>
									<div>
										<div className=' text-lg font-semibold'>
											{lan === 'uz' ? 'Ba Na Hills - Vyetnamdagi fransuz ertagi' : 'Ба На Хиллс — французская сказка во Вьетнаме'}
										</div>
										<div className='text-[17px]  font-medium text-[#141414]'>
											{lan === 'uz' ? (
												<>
													1400 metr balandlikda joylashgan manzaralar: <br /> - Mashhur Oltin ko‘prik 🏗 <br /> - Rekord balandlikdagi kanat yo‘li 🚠
													<br /> - Yevropadagidek me’morchilik 🇫🇷 <br /> - Bulutlar orasidagi ko‘ngilochar bog‘ 🎢
												</>
											) : (
												<>
													Пейзажи на высоте 1400 метров: <br /> — Знаменитый Золотой мост 🏗 <br /> — Канатная дорога с рекордной высотой 🚠 <br /> —
													Архитектура как в Европе 🇫🇷 <br /> — Парк развлечений прямо в облаках 🎢
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
									<img src='/images/danang-stories-3-1.png' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/danang-stories-3-2.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/danang-stories-3-3.png' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/danang-stories-3-4.png' alt='' className='w-full h-[207px] rounded-xl' />
								</div>
								<div className='bg-white pt-[25px] px-[20px] flex-col rounded-t-[20px] h-full flex  gap-3'>
									<div>
										<div className=' text-lg font-semibold'>
											{lan === 'uz' ? 'Danangning eng sara mehmonxonalari - plyaj bo‘yida joylashgan' : 'Лучшие отели Дананга — прямо у пляжа'}
										</div>
										<div className='text-[17px]  font-medium text-[#141414]'>
											{lan === 'ru' ? (
												<>
													Отдохни с комфортом: <br /> — Отели с халяль-концепцией <br /> — Прямой выход к пляжу <br /> — Бассейны, спа, кухня и
													идеальный сервис <br /> — Выбор для семей, пар и релакса
												</>
											) : (
												<>
													Qulay dam oling: <br /> — Halol tamoyillariga mos mehmonxonalar <br /> — Plyajga bevosita chiqish imkoniyati <br /> —
													Suzish havzalari, spa, oshxona va ajoyib xizmat ko‘rsatish <br /> — Oilalar, juftliklar va hordiq chiqarish uchun eng
													maqbul tanlov
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
									<img src='/images/danang-stories-4-1.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/danang-stories-4-2.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/danang-stories-4-3.jpg' alt='' className='w-full h-[207px] rounded-xl' />
									<img src='/images/danang-stories-4-4.jpg' alt='' className='w-full h-[207px] rounded-xl' />
								</div>
								<div className='bg-white pt-[25px] px-[20px] flex-col rounded-t-[20px] h-full flex  gap-3'>
									<div>
										<div className=' text-lg font-semibold'>{lan === 'uz' ? 'Qum, palma daraxtlari va ajoyib sohil' : 'Песок, пальмы и идеальный пляж'}</div>
										<div className='text-[17px]  font-medium text-[#141414]'>
											{lan === 'uz' ? (
												<>
													Janubi-Sharqiy Osiyoning eng toza sohillari: <br /> — Oppoq qum va tiniq dengiz <br /> — Sayyohlar soni kam, xilvatlik
													ko‘p <br /> — Surat olish, hordiq chiqarish va sayr qilish uchun ajoyib joy <br /> — Dengiz mehmonxonangizdan bir qadam
													narida joylashgan
												</>
											) : (
												<>
													Чистейшие пляжи Юго-Восточной Азии: <br /> — Белый песок и прозрачное море <br /> — Мало туристов и много уединения <br />{' '}
													— Отлично для фото, релакса и прогулок <br /> — Море в шаге от вашего отеля
												</>
											)}
										</div>
									</div>
									<div className=' absolute bottom-9 bg-[#235DFF] w-[calc(100%_-_40px)] flex justify-center items-center  rounded-[30px] h-[57px] font-medium text-white text-[20px]'>
										Тур в Дананг от 8млн
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

export default useDanangStory;
