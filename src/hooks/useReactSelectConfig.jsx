const useReactSelectConfig = () => {
	const theme = localStorage.getItem('theme');

	return {
		isSearchable: true,
		isMulti: false,
		styles: {
			input: provided => ({
				...provided,
				color: theme === 'dark' ? 'white' : '#1D2630',
			}),
			option: (provided, { isFocused, isSelected }) => ({
				...provided,
				color: theme === 'dark' ? 'white' : '#1D2630',
				background: theme === 'dark' ? '#272829' : 'white',
				width: '100%',
				cursor: 'pointer',
				// opacity: isFocused ? '0.8' : '',
				padding: '8px',
				transition: '400ms',
				fontSize: '16px',
				'@media (max-width: 768px)': {
					...provided['@media (max-width: 768px)'],
					fontSize: '14px',
				},
			}),
			container: provided => ({
				...provided,
				width: '100%',
			}),
			singleValue: provided => ({
				...provided,
				color: theme === 'dark' ? 'white' : '#1D2630',
			}),
			control: (provided, state) => ({
				...provided,
				outline: 'none',
				borderRadius: 12,
				border: 'none',
				// border: theme === 'dark' ? '1px solid  #1D2630' : '1px solid #E3E3E3',
				cursor: 'pointer',
				color: theme === 'dark' ? 'white' : '#1D2630',
				height: 45,
				background: theme === 'dark' ? '#272829' : '#EBF0F5',
				margin: '0',
				fontSize: '16px',
				paddingLeft: '20px',
				overflow: 'hidden',
				WebkitBoxOrient: 'vertical',
				WebkkitLineClamp: 1,
				paddingRight: '20px',
				whiteSpace: 'nowrap',
				boxShadow: '',
				transition: '400ms',
				'@media (max-width: 768px)': {
					...provided['@media (max-width: 768px)'],
					fontSize: '12px',
				},
			}),
			menuPortal: provided => ({
				...provided,
				zIndex: 999999999,
			}),
			menu: provided => ({
				...provided,
				margin: 0,
				width: '100%',

				padding: 16,
				border: '0!important',
				backgroundColor: theme === 'dark' ? '#272829' : '#ffff!important',
				borderRadius: 12,
				boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.08)',
				background: theme === 'dark' ? '#272829' : 'white',
				overflow: 'hidden',
				top: '60px',
			}),
			menuList: provided => ({
				...provided,
				padding: 0,
				height: 'auto',
				zIndex: 11111111,
				'::-webkit-scrollbar': {
					width: '4px',
					borderRadius: '12px',
				},
				'::-webkit-scrollbar-track': {
					background: '#EBF0F5',
					borderRadius: '12px',
				},
				'::-webkit-scrollbar-thumb': {
					background: '#767993',
					borderRadius: '12px',
				},
				'::-webkit-scrollbar-thumb:hover': {
					// background: '#555',
				},
			}),

			indicatorSeparator: provided => ({
				...provided,
				display: 'none',
			}),
			indicatorsContainer: (provided, { isFocused }) => ({
				...provided,
				height: '100%',
				paddingRight: '0px',
			}),
			dropdownIndicator: (provided, { isFocused }) => ({
				...provided,
				color: 'var(--grey)',
				paddingRight: isFocused ? '8px' : '0px',
				paddingLeft: isFocused ? '0px' : '8px',
				transform: isFocused ? 'rotate(180deg)' : '',
				':hover': {
					color: 'var(--grey)',
				},
			}),
			valueContainer: provided => ({
				...provided,
				padding: '0',
				fontWeight: '400',
				alignContent: 'center',
				fontSize: '16px',
				'@media (max-width: 768px)': {
					...provided['@media (max-width: 768px)'],
					fontSize: '14px',
				},
			}),
			noOptionsMessage: provided => ({
				...provided,
				color: theme === 'dark' ? 'white' : '#1D2630',
				width: '100%',
				cursor: 'pointer',
				padding: '0 12px',
				textAlign: 'left',
				fontSize: '16px',
			}),
			placeholder: provided => ({
				...provided,
				fontSize: '16px',
				fontWeight: '400',
				color: '#76787A',
			}),
		},
	};
};

export default useReactSelectConfig;
