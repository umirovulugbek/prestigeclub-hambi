// serviceWorker.js
/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
	'/',
	'/index.html',
	'/static/css/main.css',
	'/static/js/main.js',
	'/static/js/bundle.js',
	'/static/media/logo.png',
	'/static/media/favicon.ico',
	'/static/fonts/myfont.woff2',
	'/static/data/manifest.json',
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);
});

self.addEventListener('activate', event => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
/* eslint-enable no-restricted-globals */
