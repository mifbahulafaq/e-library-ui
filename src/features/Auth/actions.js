import { ADD_USER, USER_LOGOUT } from './constants';

export function addUser(user, token){
	return {
		type: ADD_USER,
		user,
		token
	}
}

export function userLogout(){
	return {
		type: USER_LOGOUT
	}
}