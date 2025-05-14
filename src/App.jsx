import React, { useEffect } from 'react';
import Router from './routers/routers';
import Axios from './utils/httpsClinet';

const App = () => {
	useEffect(() => {
		const handleTouchMove = event => {
			if (event.touches.length > 1) {
				event.preventDefault();
			}
		};

		const handleGestureStart = event => {
			event.preventDefault();
		};

		document.addEventListener('touchmove', handleTouchMove, { passive: false });
		document.addEventListener('gesturestart', handleGestureStart);

		return () => {
			document.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('gesturestart', handleGestureStart);
		};
	}, []);

	const saveVersionToLocal = version => {
		localStorage.setItem('appVersion', version);
	};

	const getVersionFromLocal = () => {
		return localStorage.getItem('appVersion');
	};

	const checkVersion = () => {
		const localVersion = getVersionFromLocal() === null ? 1 : getVersionFromLocal();
		Axios()
			.get(`/api/v1/check-version/?version=${localVersion}`)
			.then(response => {
				const serverVersion = response.data.version?.version;
				if (serverVersion) {
					updateApp(serverVersion);
				}
			})
			.catch(error => {
				console.error('Error checking version:', error);
			});
	};

	const updateApp = newVersion => {
		saveVersionToLocal(newVersion);
	};

	useEffect(() => {
		checkVersion();
	}, []);

	return (
			<Router />
	);
};

export default App;
