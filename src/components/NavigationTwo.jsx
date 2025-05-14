import { useNavigate } from 'react-router-dom';
import { planIcon } from '../components/homeS3Icon';
import { Back } from './itemIcon';

const NavigationTwo = ({ darkmode }) => {
	const navigate = useNavigate();
	return (
		<>
			<div className='container_main py-[20px]'>
				<header className='flex items-center w-full'>
					<Back fill={darkmode ? '#fff' : '#141414'} onClick={() => navigate(-1)} className='-translate-x-[15px]' />
					<div className={darkmode ? 'text-white' : 'text-blueWood'}>
						<div className='flex justify-between gap-3'>
							<div className='flex gap-[10px] items-center'>
								<p className='text-lg font-semibold'>Ташкент</p>
								<p className=''>{planIcon}</p>
								<p className='text-lg font-semibold'>Хургаде</p>
							</div>
						</div>
						<div className='whitespace-nowrap mr-8 text-sm font-normal'>
							15-22 мая, 2 взрослых, 2 детей
							{/* {item?.filter?.adult > 0 ? `${item?.filter?.adult} взрослых` : null}
            {item?.filter?.CHILD > 0 ? `${item?.filter?.CHILD} детей` : null} */}
						</div>
					</div>
				</header>
				{/* <div className="flex justify-between items-center mt-2.5 md:gap-4 gap-2 bg-orangeYellow px-[11px] py-[4px] rounded-[15px]">
          <img src="/images/egypt.png" className="h-[48px]" alt="" />
          <p className="text-redDark md:font-bold font-semibold md:text-base text-xs">
            Узнай все о Хургаде за 5 минут
          </p>
          <img src="/images/dangercircle.svg" alt="" />
        </div> */}
			</div>
		</>
	);
};

export default NavigationTwo;
