import { useTranslation } from 'react-i18next';

const useBroneInfoStory = () => {
	const { i18n } = useTranslation();
	const lan = i18n.language;
	return [
		{
			id: 1,
			title: (
				<div className='flex flex-col gap-1'>
					<p className=' font-bold text-[10px]'>{lan === 'ru' ? 'Все об онлайн бронировании' : 'Hammasi haqida onlayn bron qilish'}</p>
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
};

export default useBroneInfoStory;
