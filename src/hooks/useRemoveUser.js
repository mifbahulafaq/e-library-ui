import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../features/Auth/actions';

//apis
import { logout } from '../api/auth';

export default function useRemoveUser(){
	const dispatch = useDispatch();
	const history = useHistory();
	
	return React.useCallback(()=>{
		
		logout()
		.then(({data})=>{
			
			if(!data.error) {
				console.log(data)
			}
			
			dispatch(userLogout());
			
			history.push('/login');
			
		})
		
	},[])
}