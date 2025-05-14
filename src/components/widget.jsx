import React, { useEffect, useRef } from 'react';

function GetReviewWidget({ widgetId, onClick = () => {} }) {
	const widgetContainerRef = useRef(null);

	useEffect(() => {
		if (window.GetReview && window.GetReview.API && widgetContainerRef.current) {
			window.GetReview.API.reset();
			if (typeof window.GetReview.API.createWidget === 'function') {
				window.GetReview.API.createWidget(widgetId, {
					container: widgetContainerRef.current,
				});
			} else {
				console.log('createWidget is not a function');
			}
		} else {
			console.log('GetReview API or container is not available');
		}
	}, [widgetId]);

	return <div ref={widgetContainerRef} onClick={onClick} data-widget-id={widgetId} className='getreview-widget' />;
}

export default GetReviewWidget;
