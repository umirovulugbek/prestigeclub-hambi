import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SlickSliderForCardOne from '../components/SlickSliderForCardOne';
import TourIncludes from '../components/TourIncludes';
import MobileTab from '../components/mobiletab';
import FamilyHoliday from '../components/pages/home/FamilyHoliday';
import Hotels18 from '../components/pages/home/Hotels18';
import TopHotel from '../components/pages/home/TopHotel';
import NavigationOne from '../components/ui/NavigationOne';
import Axios from '../utils/httpsClinet';

const Home = ({ darkmode }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [home_top, setHomeTop] = useState([]);
	const { t, i18n } = useTranslation();

	const { home_family, home_other } = useSelector(s => s);

	const [headerSlick, setHeaderSlick] = useState([
		{
			image: '/images/banner1.png',
		},
		{
			image: '/images/banner2.png',
		},
		{
			image: '/images/banner3.png',
		},
		{
			image: '/images/banner4.png',
		},
		{
			image: '/images/banner5.png',
		},
	]);
	const [weekSlick, setWeekSlick] = useState([
		{
			image: '/images/weeknew.jpg',
		},
		{
			image: '/images/weeknew.jpg',
		},
		{
			image: '/images/weeknew.jpg',
		},
		{
			image: '/images/weeknew.jpg',
		},
	]);
	const [clickTag, setClickTag] = useState([
		{
			title: 'Безопастность',
			color: '#54DA8A',
		},
		{
			title: 'Онлайн бронирование',
			color: '#FFB75A',
		},
		{
			title: 'Только лучшие туры',
			color: '#3B71FE',
		},
		{
			title: 'На связи 24/7',
			color: 'linear-gradient(90deg, #4FACFE 0%, #00F2FE 100%), linear-gradient(0deg, rgba(35, 93, 255, 0.15), rgba(35, 93, 255, 0.15))',
		},
	]);

	useEffect(() => {
		getFamily();
		getOther();
		getTop();
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});

		// navigate('/findtour');
	}, []);

	const getFamily = () => {
		Axios()
			.get(`api/v1/search/top-hotels2/?type_id=3`)
			.then(res => {
				let data = res?.data?.data;
				dispatch({ type: 'HOME_FAMILY', payload: data });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: 'HOME_FAMILY', payload: [] });
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	const getOther = () => {
		Axios()
			.get(`api/v1/search/top-hotels/?type_id=2`)
			.then(res => {
				let data = res?.data?.data;
				dispatch({ type: 'HOME_OTHER', payload: data });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: 'HOME_OTHER', payload: [] });
			})
			.finally(() => {
				// setLoading(false);
			});
	};
	const getTop = () => {
		Axios()
			.get(`api/v1/search/top-hotels/?type_id=1`)
			.then(res => {
				let data = res?.data?.data;
				setHomeTop(data);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				// setLoading(false);
			});
	};
	return (
		<>
			<div className={`min-h-screen pb-[65px] ${darkmode ? 'bg-[#141414]' : 'bg-neutralSand'}`}>
				{/* navigation */}
				<NavigationOne darkmode={darkmode} linkClose={true} text={t('home.find')} />
				<div className='pt-[80px] pb-[40px]'>
					{/* header */}
					<SlickSliderForCardOne list={headerSlick} h388={false} shadowShow={true} />
					{/* Click Travel */}
					<div className='container_main !px-0'>
						<div className='getreview-widget' data-widget-id='jNM6BHNGXL63Bn66'></div>
						<div className='getreview-widget' data-widget-id='X9K8j7DmQrxuHw1c'></div>
						<div className='getreview-widget' data-widget-id='yV38CjBcHciBoS7l'></div>
						<div class='getreview-widget' data-widget-id='BZ5Jaw2uUGbUxXrg'></div>
					</div>
					{/* Family holiday */}
					{home_family?.length > 0 ? <FamilyHoliday list={home_family.slice(0, 6)} darkmode={darkmode} listType='3' linktrue={true} /> : null}
					<div className='container_main !px-0'>
						<TourIncludes />
					</div>
					<TopHotel all={true} list={home_top?.slice(0, 6)} darkmode={darkmode} colorWhite={true} priceShow={true} listType='1' linktrue={true} />
					{/* Hotels18 */}
					{home_other?.length > 0 ? <Hotels18 list={home_other.slice(0, 6)} darkmode={darkmode} listType='2' linktrue={true} /> : null}

					<MobileTab darkmode={darkmode} />
				</div>
			</div>
		</>
	);
};

export default Home;
