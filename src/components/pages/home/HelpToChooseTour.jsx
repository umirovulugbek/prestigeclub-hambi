import React from 'react';

const HelpToChooseTour = () => {
	return (
		<>
			<div className='container_main'>
				<div
					className='flex gap-3 items-center justify-between px-[15px] py-[13px] rounded-[15px]'
					style={{
						boxShadow: '4px 8px 24px 0px #235DFF26',
						background: 'linear-gradient(90deg, #4FACFE 0%, #00F2FE 100%)',
					}}
				>
					<div>
						<p className='font-bold text-base text-white'>Не знаешь какой тур выбрать?</p>
						<p className='font-semibold text-sm text-white mt-1'>Ответь на пару вопросов и получи лучшее предложение</p>
					</div>
					<img src='images/vectorstar.svg' className='w-[57px] h-[57px] mr-[20px]' alt='' />
				</div>
			</div>
		</>
	);
};

export default HelpToChooseTour;
