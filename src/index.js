import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'toastr/build/toastr.min.css';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import * as serviceWorker from './serviceWorker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import mixpanel from 'mixpanel-browser';
import 'react-loading-skeleton/dist/skeleton.css';
import './utils/i18n';
import createStore from './utils/store';

const root = createRoot(document.getElementById('root'));
mixpanel.init('0465544108799fccecac0caa17f000ee', { debug: true, track_pageview: true });

const store = createStore();
const queryClient = new QueryClient();
root.render(
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</Provider>
);
reportWebVitals();
// serviceWorker.unregister();
