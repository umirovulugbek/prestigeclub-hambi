import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import mixpanel from 'mixpanel-browser';

import App from './App';
import createStore from './utils/store';
import './utils/i18n';

// Styles
import 'toastr/build/toastr.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';

// Init Mixpanel
mixpanel.init('0465544108799fccecac0caa17f000ee', {
	debug: true,
	track_pageview: true,
});

// Init Redux store & React Query
const store = createStore();
const queryClient = new QueryClient();

// Render App
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</Provider>
);

// If you need service workers in future:
// import * as serviceWorker from './serviceWorker';
// serviceWorker.unregister();
