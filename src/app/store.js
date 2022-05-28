import authReducer from '../features/Auth/reducer';
import booksReducer from '../features/Books/reducer';
import borrowBookingsReducer from '../features/BorrowBookings/reducer';
import logsReducer from '../features/Logs/reducer';
import userReducer from '../features/User/reducer';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
	auth: authReducer,
	books: booksReducer,
	borrowBookings: borrowBookingsReducer,
	logs: logsReducer,
	user: userReducer
});

const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store;