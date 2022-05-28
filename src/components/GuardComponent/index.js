import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function GuardComponent({children, role}){
	
	let {user} = useSelector(state=> state.auth);
	
	return <>
		
		{
			role?.[0] === 'any' 
			? children 
			: role?.includes(user?.role)
				? children
				: ''
		}
		
	</>
}

GuardComponent.defaultProps = {
	role: ['any']
}

GuardComponent.propTypes = {
	role: PropTypes.array
}