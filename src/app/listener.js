import store from './store';
import {fetchUser} from '../features/User/actions';

let currentAuth;
let currentLogs;

function listener(){
	let previousAuth = currentAuth;
	currentAuth = store.getState().auth;
	
	let previoustLogs = currentLogs;
	currentLogs = store.getState().logs;
	
	if(  currentAuth !== previousAuth ){
		
		localStorage.setItem('auth', JSON.stringify(currentAuth));
		store.dispatch(fetchUser());
		
	}
	
	if(previoustLogs !== currentLogs){
		localStorage.setItem('logs', JSON.stringify(currentLogs));
	}
	
}

function listen(){
	store.subscribe(listener);
}

export { listen };