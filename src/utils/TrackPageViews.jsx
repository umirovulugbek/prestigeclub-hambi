import mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const TrackPageViews = () => {
	const location = useLocation();
	const { user } = useSelector(s => s);

	useEffect(() => {
		mixpanel.track('Page Viewed', {
			page: location.pathname,
			referrer: document.referrer || 'direct',
			user_id: `${user?.user?.first_name} ${user?.user?.last_name}` || 'guest',
			timestamp: new Date().toISOString(),
			phone_number: user?.user?.phone_number,
		});
	}, [location.pathname]);

	return null;
};

export default TrackPageViews;
