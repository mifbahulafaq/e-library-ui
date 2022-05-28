import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GuestRoute({log, children, component, ...rest}){
	
	//const { user } = useSelector(state=>state.auth);
	const {user} = JSON.parse(localStorage.getItem('auth'))
	console.log(user)
	return <Route {...rest} >
	
		{ 
			!user
			? 
				children
			: 
				<Redirect to='/' />
		}
		
	</Route>
}