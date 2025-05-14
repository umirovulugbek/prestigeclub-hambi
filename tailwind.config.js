/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '3rem',
				xl: '4rem',
				'2xl': '9rem',
			},
			center: true,
		},
		extend: {
			boxShadow: {
				shadow: '4px 8px 24px 0px rgba(35, 93, 255, 0.15)',
				shadow2: '4px 8px 24px 0px rgba(35, 93, 255, 0.05)',
				shadow3: '4px -1px 15px 0px rgba(35, 93, 255, 0.1)',
				shadow4: '0px 5px 10px 0px rgba(3, 99, 248, 0.15)',
				shadow5: ' 0px 6px 16px 0px rgba(189, 198, 211, 0.12)',
			},
			colors: {
				red: 'red',
				black: '#042B50',
				blackShark: '#141414',
				blueDark: '#4B4B59',
				blueWood: '#141414',
				blueCasper: '#B3B7CE',
				blueRibbon: '#235DFF',
				starDust: '#9E9E9E',
				tuna: '#272829',
				neutral: '#e0e0e0',
				neutralGallery: '#EEEEEE',
				neutralSand: '#EBF0F5',
				neutralAlto: '#D9D9D9',
				blueJordy: '#91aeff',
				orangeYellow: '#F7EBB7',
				redDark: '#5A2B2B',
			},
			zIndex: {
				9999: '9999',
				999: '999',
			},
			fontSize: {},
		},
		fontFamily: {
			golos: ['Golos', 'sans-serif'],
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				'.transition-max-height': {
					transition: 'max-height 0.2s ease-in-out',
				},
			});
		},
	],
};

const { colors: defaultColors } = require('tailwindcss/defaultTheme');
