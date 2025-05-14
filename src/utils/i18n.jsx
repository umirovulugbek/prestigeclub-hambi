import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import languageEn from '../locate/en.json';
import languageRU from '../locate/ru.json';
import languageUZ from '../locate/uz.json';

i18n.use(XHR)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			ru: languageRU,
			uz: languageUZ,
			en: languageEn,
		},
		lng: window.localStorage.getItem('language') || 'uz',
		fallbackLng: 'ru',
		debug: true,
		ns: ['translations'],
		defaultNS: 'translations',
		keySeparator: '.',
		interpolation: {
			escapeValue: false,
			formatSeparator: ',',
		},
		react: {
			wait: true,
			bindI18n: 'languageChanged loaded',
			bindStore: 'added removed',
			nsMode: 'default',
			// useSuspense: false,
		},
	});

export default i18n;
