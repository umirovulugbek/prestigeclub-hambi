import { useNavigate } from 'react-router-dom';
import { Back } from './itemIcon';

const NavigationThree = ({ darkmode, title, centerShow = false }) => {
	const navigate = useNavigate();
	return (
		<>
			<header className='container_main py-[20px]'>
				<div className='flex items-center w-full'>
					<Back fill={darkmode ? '#fff' : '#141414'} onClick={() => navigate(-1)} className='-translate-x-[15px]' />
					<div className={`text-lg font-semibold ${darkmode ? 'text-white' : 'text-blueWood'} ${centerShow ? 'flex w-full justify-center' : 'line-clamp-1'}`}>{title}</div>
				</div>
			</header>
		</>
	);
};

export default NavigationThree;
