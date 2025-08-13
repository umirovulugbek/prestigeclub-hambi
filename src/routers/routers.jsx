import { AnimatePresence } from 'framer-motion';
import mixpanel from 'mixpanel-browser';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';
import useDarkSide from '../hooks/useDarkSide';

import BroneForm from '../pages/hotel/BroneForm';
import HotelListByGraphicTour from '../pages/hotel/HotelListByGraphicTour';
import HotelTourBookingBrone from '../pages/hotel/HotelTourBookingBrone';
import TourDetail from '../pages/main/TourDetail';
import TourUzbekistan from '../pages/tour-uzb/TourUzbekistan';
import TourUzbekistanBrone from '../pages/tour-uzb/TourUzbekistanBrone';
import Axios from '../utils/httpsClinet';
import { setToken } from '../utils/tokenStorge';
import TrackPageViews from '../utils/TrackPageViews';
const HotelDetail = lazy(() => import('../pages/hotel/HotelDetail'));
const HotelDetailComment = lazy(() => import('../pages/hotel/HotelDetailComment'));
const HotelGalleryFromDetail = lazy(() => import('../pages/hotel/HotelGalleryFromDetail'));
const HotelSelectingNumber = lazy(() => import('../pages/hotel/HotelSelectingNumber'));
const HotelTourBooking = lazy(() => import('../pages/hotel/HotelTourBooking'));
const HotelListBySearch = lazy(() => import('../pages/hotel/HotelListBySearch'));
const Services = lazy(() => import('../pages/main/Services'));
const Settings = lazy(() => import('../pages/main/Settings'));
const MyBooking = lazy(() => import('../pages/main/MyBooking'));
const MyBookingDetail = lazy(() => import('../pages/main/MyBookingDetail'));
const FindTour = lazy(() => import('../pages/main/FindTour'));
const NotFound = lazy(() => import('../pages/main/NotFound'));
const Basket = lazy(() => import('../pages/main/Basket'));
const ClickTravel = lazy(() => import('../pages/click-travel/ClickTravel'));
const HotelDetailAmenities = lazy(() => import('../pages/hotel/HotelDetailAmenities'));
const HotelListByHotel = lazy(() => import('../pages/hotel/HotelListByHotel'));
const ProgramTour = lazy(() => import('../pages/tour-uzb/ProgramTour'));
const FaqsTourUzb = lazy(() => import('../pages/tour-uzb/FaqsTourUzb'));
const HotelRixos = lazy(() => import('../pages/hotel/HoteRixos'));
const AppRouter = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { i18n } = useTranslation();
	const [colorTheme, setTheme] = useDarkSide();
	const [darkSide, setDarkSide] = useState(colorTheme === 'dark' ? false : true);

	useEffect(() => {
		setDarkSide(colorTheme === 'dark' ? false : true);
	}, [location, darkSide, colorTheme]);

	const getCookie = cname => {
		let name = cname + '=';
		let decodedCookie = decodeURIComponent(document.cookie);

		let ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	};

	const getUser = access_token => {
		Axios(null, access_token)
			.get(`/api/v1/click-me`)
			.then(res => {
				dispatch({ type: 'SET_USER', payload: res?.data });
				const isWebViewOpened = sessionStorage.getItem('webview_opened');
				if (!isWebViewOpened) {
					// const baseUrl = 'https://travel-front.bpm-tripusk.uz/';
					// const utmParams = '?utm_source=click_superapp&utm_medium=webview&utm_campaign=homepage';
					// window.open(baseUrl + utmParams, '_blank');
					mixpanel.track('User_info', { device_type: res?.data?.user?.phone_number || 'nomalum', App_open: 'true' });
					sessionStorage.setItem('webview_opened', 'true');
				}
			})
			.catch(err => {});
	};

	const postClickOneTime = click_web_session => {
		const formData = new FormData();

		formData.append('web_session', click_web_session);

		Axios()
			.post(`/api/v1/click-login`, formData)
			.then(r => {
				setToken(r?.data?.token);
				getUser(r?.data?.token);
			})
			.catch(e => {})
			.finally(() => {});
	};

	useEffect(() => {
		const value = getCookie('click-web-session');
		const theme = getCookie('click-theme');
		setTheme(theme ? theme : 'dark');
		const language = getCookie('click-language');

		localStorage.setItem('i18nextLng', language ? language : 'ru');
		i18n.changeLanguage(language ? language : 'uz');
		postClickOneTime(value ? value : 'dc251856-5a4a-4fab-a183-f448ca8a5df0');
	}, []);

	useEffect(() => {
		const trackPageView = () => {
			if (typeof window.ym !== 'undefined') {
				window.ym(98339232, 'hit', window.location.pathname);
			}
		};

		trackPageView();
	}, []);

	return (
		<div className={`App`}>
			<AnimatePresence mode='wait'>
				<Routes location={location} key={location.pathname}>
					{[
						{ path: '/hotels/detail/', element: <HotelDetail darkmode={darkSide} /> },
						{ path: '/hotels/detail/home/', element: <HotelDetail darkmode={darkSide} /> },
						{ path: '/hotels/detail/comment', element: <HotelDetailComment darkmode={darkSide} /> },
						{ path: '/hotels/detail/amenities/:id', element: <HotelDetailAmenities darkmode={darkSide} /> },
						{ path: '/hotels/detail/gallery/', element: <HotelGalleryFromDetail darkmode={darkSide} /> },
						{ path: '/hotels/detail/hotelselectingnumber/', element: <HotelSelectingNumber darkmode={darkSide} /> },
						{ path: '/hotels/detail/hoteltourbooking/:id', element: <HotelTourBooking darkmode={darkSide} /> },
						{ path: '/hotels/detail/hoteltourbooking/:id/brone', element: <HotelTourBookingBrone darkmode={darkSide} /> },
						{ path: '/hotels/result', element: <HotelListBySearch darkmode={darkSide} /> },
						{ path: '/hotels/rixos-result', element: <HotelRixos darkmode={darkSide} /> },
						{ path: '/hotels/tour-info', element: <TourDetail darkmode={darkSide} /> },
						{ path: '/hotels/result-hotel', element: <HotelListByHotel darkmode={darkSide} /> },
						{ path: '/hotels/result-graphic-tour', element: <HotelListByGraphicTour darkmode={darkSide} /> },
						{ path: '/services', element: <Services darkmode={darkSide} /> },
						{ path: '/settings', element: <Settings darkmode={darkSide} /> },
						{ path: '/mybooking', element: <MyBooking darkmode={darkSide} /> },
						{ path: '/mybooking/detail/:id', element: <MyBookingDetail darkmode={darkSide} /> },
						{ path: '/basket', element: <Basket darkmode={darkSide} /> },
						{ path: '/', element: <FindTour darkmode={darkSide} /> },
						{ path: '/click-travel/:slug', element: <ClickTravel darkmode={darkSide} /> },
						{ path: '/tour-uzbekistan/:id', element: <TourUzbekistan darkmode={darkSide} /> },
						{ path: '/tour-uzbekistan/:id/brone', element: <TourUzbekistanBrone darkmode={darkSide} /> },
						{ path: '/tour-uzbekistan/program/:id', element: <ProgramTour darkmode={darkSide} /> },
						{ path: '/tour-uzbekistan/faqs/:id', element: <FaqsTourUzb darkmode={darkSide} /> },
						{ path: '/brone-form', element: <BroneForm darkmode={darkSide} /> },
						{ path: '*', element: <NotFound darkmode={darkSide} /> },
					].map(({ path, element }) => (
						<Route
							key={path}
							path={path}
							element={
								<Suspense
								// fallback={<LoadingMain />}
								>
									{element}
								</Suspense>
							}
						/>
					))}
				</Routes>
			</AnimatePresence>
		</div>
	);
};

const App = () => (
	<Router>
		<TrackPageViews />
		<YMInitializer accounts={[98339232]} options={{ clickmap: true, trackLinks: true, accurateTrackBounce: true }} version='2' />
		<AppRouter />
	</Router>
);

export default App;
