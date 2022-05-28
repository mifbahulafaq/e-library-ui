import { ADD, REMOVE } from './constants';

export default function reducer(state = {}, action){
  switch(action.type){
	  case ADD:
	    return action.data;
	  case REMOVE:
	    return {};
	  default:
	    return state;
  }
}