import { ADD_USER, USER_LOGOUT } from './constants';

const currentAuth = localStorage.getItem('auth');
let initialState = currentAuth ? JSON.parse(currentAuth) : {user: null, token: null};

export default function reducer(state = initialState, action){
  switch(action.type){
	  case ADD_USER:
	    return {user: action.user, token: action.token}
		
	  case USER_LOGOUT:
	    return {user: null, token: null};
	  default:
	    return state;
  }
}