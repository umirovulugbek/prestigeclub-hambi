import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../../utils/mixpanel';
import { Back } from './../itemIcon';

const NavigationOne = ({ is_trackEvent = false, trackEvent_link = '', darkmode, link = 'clickup://actions/close_screen', linkClose = false, text = '', bg = 'bg-white', is_close = true }) => {
	const navigate = useNavigate();

	const handleBackClick = () => {
		if (linkClose) {
			window.location.replace(link);
		} else {
			navigate(-1);
		}
		if (is_trackEvent) {
			trackEvent(trackEvent_link);
		}
	};

	return (
		<div className='container_main !px-0'>
			<header className={` fixed  z-40 container_main  w-full  rounded-b-[20px]  top-0 overflow-hidden  ${bg} dark:bg-[#272829] `}>
				<div className=' flex items-center justify-between  h-[65px] '>
					{is_close && (
						<>
							{linkClose ? (
								<a href='clickup://actions/close_screen'>
									<Back
										fill={darkmode ? '#fff' : '#141414'}
										// className='-translate-x-[15px]'
									/>{' '}
								</a>
							) : (
								<Back
									fill={darkmode ? '#fff' : '#141414'}
									onClick={handleBackClick}
									// className='-translate-x-[15px]'
								/>
							)}
						</>
					)}
					<div className='text-[#141414] w-full flex justify-center text-lg font-normal  dark:text-white'>{text}</div>
					<div className='w-[45px]'></div>
				</div>
			</header>
		</div>
	);
};

export default NavigationOne;
