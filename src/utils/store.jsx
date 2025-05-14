import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from './reducers';

const store = initialState => {
	const middleware = [thunk];
	return createStore(reducers, initialState, applyMiddleware(...middleware));
};
export default store;
