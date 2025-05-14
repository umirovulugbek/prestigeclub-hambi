import mixpanel from 'mixpanel-browser';

mixpanel.init('0465544108799fccecac0caa17f000ee');

const trackEvent = (eventName, properties = {}) => {
	mixpanel.track(eventName, properties);
};

export { mixpanel, trackEvent };
