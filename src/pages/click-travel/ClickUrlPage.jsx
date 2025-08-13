import React from 'react';
import { useNavigate } from 'react-router-dom';
import GetReviewWidget from '../../components/main/widget';
import TopHotel from '../../components/pages/home/TopHotel';
import NavigationOne from '../../components/ui/NavigationOne';

const ClickUrlPage = ({ darkmode }) => {
	const navigate = useNavigate();
	return (
		<>
			<div className={`min-h-screen pb-[65px] ${darkmode ? 'bg-[#141414]' : 'bg-neutralSand'}`}>
				<NavigationOne darkmode={darkmode} text={'Click Travel'} />
				<div className='container_main !px-0'>
					<img src='/images/click_travle_img.svg' alt='' className='w-full' />
					<div className=' bg-white py-[20px]  rounded-t-[12px] top-[-20px] relative flex flex-col gap-2'>
						<div className='px-[15px] flex flex-col gap-2'>
							<h2 className='text-[#141414] font-medium text-xl text-center'>Отпуск в раю: Хайнань ждёт вас!</h2>
							<p className='text-[#141414AA] text-center text-base'>
								Мечтаете сбежать от зимы? Летите в Хайнань — остров, где солнце светит круглый год, море тёплое, а природа завораживает своей красотой. Это не просто
								отдых, это настоящая перезагрузка для души и тела!
							</p>
							<div className='  flex  overflow-x-scroll gap-2  '>
								{[{}, {}, {}, {}]?.map((item, index) => {
									return (
										<div
											key={index}
											className='text-[#141414] whitespace-nowrap bg-[#DEE7FF] dark:bg-[#141414]  dark:text-white font-normal h-[34px] text-base text-start flex justify-center items-center px-3 rounded-[5px]'
										>
											{/* {item?.tag} */}
											asdas
										</div>
									);
								})}
							</div>
						</div>
						<div className='pl-[15px]'>
							<GetReviewWidget widgetId='4WXrqVI8RvFJ5HVG' />
						</div>
						<div className='mt-4'>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d473375.7341476142!2d91.0204317614998!3d22.04010977927399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suz!2s!4v1734806329964!5m2!1suz!2s'
								width='100%'
								height='430'
								allowFullScreen=''
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
							></iframe>
						</div>
						<div className='bg-white top-[-16px] relative rounded-t-[12px] px-[15px] pt-[20px] text-[#141414] flex flex-col gap-3'>
							<h2 className=' font-medium  text-lg'>Лучшие пляжи</h2>
							<p className=' text-sm'>
								Хайнань по площади можно сравнить с Бельгией, то есть для острова он огромный! Здесь почти 300 км песчаных пляжей, большинство из которых великолепны. 
							</p>
							<button
								onClick={() => {
									navigate('/click-url/1');
								}}
								className=' bg-[#DEE7FF]  !font-urbanist px-[5px] py-[10px]  rounded-[5px] flex justify-between items-center w-full'
							>
								Узнать подробнее о каждом пляже
								<svg width='20' height='16' viewBox='0 0 20 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M1.72576 6.59255H15.2117L11.9773 3.37223C11.7125 3.10743 11.5638 2.74828 11.5638 2.3738C11.5638 1.99931 11.7125 1.64016 11.9773 1.37536C12.2421 1.11056 12.6013 0.961792 12.9758 0.961792C13.3502 0.961792 13.7094 1.11056 13.9742 1.37536L19.5992 7.00036C19.7272 7.1341 19.8276 7.2918 19.8945 7.46442C20.0352 7.80679 20.0352 8.1908 19.8945 8.53317C19.8276 8.70579 19.7272 8.86349 19.5992 8.99723L13.9742 14.6222C13.8435 14.754 13.6879 14.8587 13.5166 14.93C13.3452 15.0014 13.1614 15.0382 12.9758 15.0382C12.7901 15.0382 12.6063 15.0014 12.435 14.93C12.2636 14.8587 12.1081 14.754 11.9773 14.6222C11.8455 14.4915 11.7409 14.336 11.6695 14.1646C11.5981 13.9932 11.5614 13.8094 11.5614 13.6238C11.5614 13.4382 11.5981 13.2543 11.6695 13.083C11.7409 12.9116 11.8455 12.7561 11.9773 12.6254L15.2117 9.40505H1.72576C1.3528 9.40505 0.995113 9.25689 0.731392 8.99317C0.467669 8.72944 0.319511 8.37176 0.319511 7.9988C0.319511 7.62583 0.467669 7.26815 0.731392 7.00443C0.995113 6.7407 1.3528 6.59255 1.72576 6.59255Z'
										fill='#141414'
									/>
								</svg>
							</button>
						</div>
					</div>
					<TopHotel list={[{}, {}]} darkmode={darkmode} colorWhite={true} priceShow={true} listType='1' linktrue={true} />
				</div>
			</div>
		</>
	);
};

export default ClickUrlPage;
