import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userLogout } from '../../features/Auth/actions';
import PropTypes from 'prop-types';
import useRemoveUser from '../../hooks/useRemoveUser';

//apis
import { getSingleUser } from '../../api/user';

//pages
import PageNotFound from '../../pages/PageNotFound';

export default function GuardRoute({children, component, role, ...rest}){
	
	//const { user } = useSelector(state=>state.auth);
	const [ userData, setUserData ] = React.useState(null);
	const auth = JSON.parse(localStorage.getItem('auth'))
	const userDelete = useRemoveUser();
	
	React.useEffect(()=>{
		if(auth?.user){
	
			getSingleUser(auth.user._id)
			.then(({ data })=>{
				
				if(data.error) {
					userDelete()
					return;
				}
				
				setUserData(data)
			})
			return;
			
		}
		
		userDelete()
		
	},[userDelete])
	
	return <Route {...rest} >
	
		{ 
			userData
			? 
				role[0] === 'any'
				?
					children
				:
					role.includes(auth.user.role)
					? 
						children
					:
						<PageNotFound />
			: 
				''
		}
		
	</Route>
}

GuardRoute.defaultProps = {
	role: ['any']
}

GuardRoute.propTypes = {
	role: PropTypes.array
}