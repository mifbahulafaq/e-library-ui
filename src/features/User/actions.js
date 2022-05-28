import { ADD, REMOVE } from './constants';

//apis
import { getSingleUser } from '../../api/user';

export function fetchUser(){
	return async function(dispatch, getState){
		
		const auth = getState().auth;
		
		if(auth.user){
			
			try{
				
				const { data } = await getSingleUser(auth.user._id);
				if(!data.error) dispatch(addUser(data));
				
			}catch(err){
				console.log(err)
			}
		}
		
	}
}

export function addUser(data){
	return {
		type: ADD,
		data
	}
}

export function removeUser(){
	return {
		type: REMOVE
	}
}