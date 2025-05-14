import styled from 'styled-components';

export const AddFav = styled.div`
	position: relative;
	& .add-favorites {
		border-radius: 50%;
		height: 36px;
		right: 18px;
		top: 16px;
		width: 36px;
		& svg {
			transition: 0.3s;
		}
		& .fixed-svg {
			left: -0.5px;
			position: absolute;
			top: 8.8px;
		}
		& .like {
			transform: scale(0);
		}
		&:active {
			& svg {
				transform: scale(1.3);
			}
		}
	}
	& .liked {
		background: transparent;
	}
`;

export const StyleCom = styled.div`
	.swiper-wrapper {
		height: 195px !important;
	}
`;
export const MobileTabStyle = styled.div`
	height: 60px;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 1030;
	width: 100%;
	justify-content: center;
	display: flex;
	& .link {
		cursor: pointer;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		& .icon {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		& .title {
			margin-top: 5px;
			color: #9e9e9e;
			font-size: 14px;
			font-weight: 400;
			line-height: 16px;
			text-align: center;
		}
		&:hover,
		&.active {
			& .icon {
				#mask0_1854_535,
				#mask0_1858_958 {
					& g > path,
					& path {
						fill: #fff !important;
					}
				}
				& g > path,
				& path {
					fill: #235dff !important;
				}
			}
			& .my-apps {
				& circle,
				& path {
					stroke: #235dff;
				}
			}
			& .title {
				color: #235dff;
			}
		}
	}
`;

export const CalendarStyle = styled.div`
	.react-calendar__navigation__label__labelText {
		font-size: 22px;
	}
	.react-calendar__month-view {
		margin: 5px;
	}
	.react-calendar__navigation {
		align-items: center;
		margin-top: 0.7rem;
		margin-bottom: 0.7rem;
	}
	.react-calendar {
		background: ${({ theme }) => (theme === 'dark' ? '#272829' : '#ffff')} !important;
		border: none !important;
		border-radius: 13.1px 13.1px 0px 0px !important;
		width: 100%;
		overflow: hidden !important;
	}

	.react-calendar__month-view__days {
		border-bottom-left-radius: 13.1px !important;
	}
	.react-calendar__navigation__next-button {
		background: ${({ theme }) => (theme === 'dark' ? "url('/images/next-arrow.svg')" : "url('/images/next-arrow-black.svg')")} no-repeat center center;
		background-size: contain;
		border: none;
		width: 30px;
		height: 29px;
		text-indent: -9999px;
	}

	.react-calendar__navigation__prev-button {
		background: ${({ theme }) => (theme === 'dark' ? "url('/images/prev-arrow.svg')" : "url('/images/prev-arrow-black.svg')")} no-repeat center center;
		background-size: contain;
		border: none;
		width: 30px;
		height: 29px;
		text-indent: -9999px;
	}
	.react-calendar__tile {
		border-radius: 10px;
		height: 44px;
		padding: 0 !important;
		margin: 2px 0px;
		font-size: 17px;
		font-weight: 400 !important;
		background-color: transparent !important;
		transition: 0.2s ease-in-out;
	}

	.react-calendar__tile.react-calendar__tile--active > abbr {
		/* background-color: #235dff !important; */
		/* color: white !important; */
		padding: 4px 8px;
		border-radius: 4px;
		width: 44px !important;
		height: 44px !important;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px !important;
	}

	.react-calendar__tile:disabled > abbr {
		background-color: transparent;
	}
	.react-calendar__tile:hover {
		background-color: transparent;
	}
	.tile-date abbr {
		padding: 4px 8px;
		border-radius: 4px;
		width: 44px !important;
		height: 44px !important;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px !important;
	}

	.empty-date abbr {
		background-color: ${({ theme }) => (theme === 'dark' ? '#757575' : '#C5D2E0')} !important;
		color: ${({ theme }) => (theme === 'dark' ? '#bdbdbd' : '#14141440')} !important;
	}

	/* To'g'ridan-to'g'ri charter bor bo'lsa */
	.direct-charter abbr {
		background-color: ${({ theme }) => (theme === 'dark' ? '#608aff' : '#9CB6FF')} !important;
		color: ${({ theme }) => (theme === 'dark' ? '#ffff' : '#141414')} !important;
	}

	/* Cheklangan charter bo'lsa */
	.limited-charter abbr {
		background-color: ${({ theme }) => (theme === 'dark' ? '#e3b786' : '#FF880040')} !important;
		color: ${({ theme }) => (theme === 'dark' ? '#ffff' : '#141414')} !important;
	}
	.react-calendar__navigation__label,
	.react-calendar__navigation__next-button,
	.react-calendar__navigation__prev-button {
		background-color: ${({ theme }) => (theme === 'dark' ? '#272829' : 'transparent')} !important;
		color: ${({ theme }) => (theme === 'dark' ? 'white' : 'inherit')};
	}

	.react-calendar__month-view__weekdays__weekday--weekend,
	.react-calendar__month-view__weekdays__weekday {
		font-weight: 600 !important;
		color: ${({ theme }) => (theme === 'dark' ? 'white' : 'inherit')};
	}
	.react-calendar__navigation__prev-button {
		order: 1 !important;
	}
`;
