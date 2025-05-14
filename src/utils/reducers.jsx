// import _ from "lodash";

const INITIAL_STATE = {
	loading: false,
	loading_top: false,
	user: {},
	auth_modal: false,
	await_modal: false,
	await_data: {},
	calendar_modal: false,
	select_modal: false,
	tour_list: [],
	option_to: { to: [] },
	option_from: { from: [] },
	search_result: [],
	favourite: [],
	login_modal: false,
	home_family: [],
	home_top: [],
	home_other: [],
	comments_hotel: [],
	hotel_img: [],
	formsData: {},
	selectedPerson: null,
	story_loading: true,
	towns_loading: false,
};

const reducers = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'COMMENTS_HOTEL':
			return {
				...state,
				comments_hotel: action?.payload,
			};
		case 'HOME_FAMILY':
			return {
				...state,
				home_family: action?.payload,
			};
		case 'HOME_TOP':
			return {
				...state,
				home_top: action?.payload,
			};
		case 'HOME_OTHER':
			return {
				...state,
				home_other: action?.payload,
			};
		case 'LOGIN_MODAL':
			return {
				...state,
				login_modal: action?.payload,
			};
		case 'FAVOURITE':
			return {
				...state,
				favourite: action?.payload,
			};
		case 'SET_SEARCH_RESULT':
			return {
				...state,
				search_result: action?.payload,
			};
		case 'SET_LOADING':
			return {
				...state,
				loading: action?.payload,
			};
		case 'SET_LOADING_TOWNS':
			return {
				...state,
				towns_loading: action?.payload,
			};
		case 'SET_LOADING_TOP':
			return {
				...state,
				loading_top: action?.payload,
			};
		case 'SET_USER':
			return {
				...state,
				user: action?.payload,
			};
		case 'SET_AUTH_MODAL':
			return {
				...state,
				auth_modal: action?.payload,
			};
		case 'SET_CALENDAR_MODAL':
			return {
				...state,
				calendar_modal: action?.payload,
			};
		case 'SET_AWAIT_MODAL':
			return {
				...state,
				await_modal: action?.payload,
			};
		case 'SET_SELECT_MODAL': {
			return {
				...state,
				select_modal: action?.payload,
			};
		}
		case 'AWAIT_MODAL_DATA': {
			return {
				...state,
				await_data: action?.payload,
			};
		}
		case 'SET_TOUR': {
			return {
				...state,
				tour_list: action?.payload,
			};
		}
		case 'SET_OPTION_FROM': {
			return {
				...state,
				option_from: action?.payload,
			};
		}
		case 'SET_OPTION_TO': {
			return {
				...state,
				option_to: action?.payload,
			};
		}
		case 'HOTEL_IMG_DETAIL': {
			return {
				...state,
				hotel_img: action?.payload,
			};
		}
		case 'SET_FORMSDATA': {
			return {
				...state,
				formsData: action?.payload,
			};
		}
		case 'SET_SELECTEDPERSON': {
			return {
				...state,
				selectedPerson: action?.payload,
			};
		}
		case 'SET_STORY_LOADING': {
			return {
				...state,
				story_loading: action?.payload,
			};
		}
		default:
			return state;
	}
};
export default reducers;
