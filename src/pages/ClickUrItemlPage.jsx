import React from 'react';
import TopHotel from '../components/pages/home/TopHotel';
import NavigationOne from '../components/ui/NavigationOne';

const ClickUrlItemPage = ({ darkmode }) => {
	return (
		<>
			<div className={`min-h-screen pb-[65px] ${darkmode ? 'bg-[#141414]' : 'bg-neutralSand'}`}>
				<NavigationOne darkmode={darkmode} text={'Click Travel'} />
				<div className='container_main !px-0'>
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
					<div className='bg-white top-[-16px] relative rounded-t-[12px] px-[15px] py-[20px] text-[#141414] flex flex-col gap-3'>
						<div>
							<h2 className=' font-medium  text-lg'>Лучшие пляжи</h2>
							<p className=' text-sm'>
								Хайнань по площади можно сравнить с Бельгией, то есть для острова он огромный! Здесь почти 300 км песчаных пляжей, большинство из которых великолепны. 
							</p>
						</div>
						<div>
							<h2 className=' font-medium  text-lg'>Саньябей</h2>
							<p className=' text-sm'>
								Мечтаете сбежать от зимы? Летите в Хайнань — остров, где солнце светит круглый год, море тёплое, а природа завораживает своей красотой. Это не просто
								отдых, это настоящая перезагрузка для души и тела!{' '}
							</p>
						</div>
					</div>
					<TopHotel list={[{}, {}]} darkmode={darkmode} colorWhite={true} priceShow={true} listType='1' linktrue={true} />
				</div>
			</div>
		</>
	);
};

export default ClickUrlItemPage;
