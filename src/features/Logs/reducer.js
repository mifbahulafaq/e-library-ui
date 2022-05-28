import { ADD, REMOVE, READ } from './constants';

const currentLogs = localStorage.getItem('logs');

let initialState = currentLogs? JSON.parse(currentLogs): [];

export default function reducer(state = initialState, action){
	
		
	
  switch(action.type){
	  case ADD:
		
		let data = action.data.map(({_id, status, updatedAt})=>({_id, status,created: updatedAt, read: false}))
			
		return [...state, ...data];
		
	  case REMOVE:
	  
		let remainRemove = state.filter(e=>{
			return !e.read
		})
		return [...remainRemove]
		
	  case READ:
	  
		let remainRead = state.filter(e=>{
			return !action.data.includes(e)
		})
		
		let read = action.data.map(e=>({...e, read: true}))
		return [...remainRead,...read]
		
	default:
	    return state;
  }
}