import { AnimatePresence } from 'framer-motion';
import mixpanel from 'mixpanel-browser';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
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

	const getUserFromBeeline = async access_token => {
		try {
			const res = await Axios().get('/api/beeline/me');

			dispatch({ type: 'SET_USER', payload: res.data?.data });

			const isWebViewOpened = sessionStorage.getItem('webview_opened');
			if (!isWebViewOpened) {
				mixpanel.track('User_info', {
					device_type: res?.data?.msisdn || 'nomalum',
					App_open: 'true',
				});
				sessionStorage.setItem('webview_opened', 'true');
			}
		} catch (err) {
			console.error('Beeline foydalanuvchi olishda xatolik:', err);
		}
	};

	const getBeelineToken = () => {
		let token = localStorage.getItem('x-user-token');

		if (!token) {
			const params = new URLSearchParams(window.location.search);
			token = params.get('token');
		}

		return token;
	};

	useEffect(() => {
		const token = getBeelineToken();
		// const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMjBiNjlkNC01NDJlLTQyM2QtYmI2Ny01NjEwZTJiZGJhODciLCJtc2lzZG4iOiI5OTg5MDAwMTA4MzMiLCJ1c2VyX2lkIjo5NzkxMzgzLCJzZXNzaW9uX2lkIjoxMzk2ODcxOSwiZGV2aWNlX2lkIjo4MTY4MjU5LCJpbnRlZ3JhdGlvbl90eXBlIjoiYXV0b19yZW50IiwiZXhwIjoxNzU4NzA3MzEwLCJpYXQiOjE3NTgxMDI1MTB9.O2XB9I-aShRHK3NAgRYdpkXyZ_nGuQQWwlJjnfs7GSumlwg6pKsS85WiQ_-TQSG1dJDneiyiDqFM3Cct9HxTd9hCmoT2Lop9HjIGRSr2vTDxIlbethvCHHKOStl_p3MovRlxJ0Okt49_IPdZwgEIDqIGXvUQrc427Mrb2dv7gHO-ZIprPxzhLdscDt9cEODazrMW23nspVGpbNnJJMSrfJdnkLbPJuKvmv6BfHIbcK57E7CxqdeDDiA0W3BGL2MqPAWW44geYmqK3WlY_dMM6-qs4C2UGKVBLbi4ZIrNhCob8zmfvJtS7WXgbbrxbu-idjHC7rGI8jDOzM_y4P6HQw`;

		const theme = localStorage.getItem('beeline-theme');
		setTheme(theme ? theme : 'light');

		const language = localStorage.getItem('beeline-language');
		localStorage.setItem('i18nextLng', language ? language : 'uz');
		i18n.changeLanguage(language ? language : 'uz');

		if (token) {
			setToken(token);
			getUserFromBeeline(token);
		}
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
						// { path: '/', element: <FindTour darkmode={darkSide} /> },
						{ path: '/', element: <Navigate to='/services' replace /> },
						{ path: '/tour-uzbekistan/:id', element: <TourUzbekistan darkmode={darkSide} /> },
						{ path: '/tour-uzbekistan/:id/brone', element: <TourUzbekistanBrone darkmode={darkSide} /> },
						{ path: '/tour-uzbekistan/program/:id', element: <ProgramTour darkmode={darkSide} /> },
						{ path: '/tour-uzbekistan/faqs/:id', element: <FaqsTourUzb darkmode={darkSide} /> },
						{ path: '/brone-form', element: <BroneForm darkmode={darkSide} /> },
						{ path: '*', element: <NotFound darkmode={darkSide} /> },
					].map(({ path, element }) => (
						<Route key={path} path={path} element={<Suspense>{element}</Suspense>} />
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
