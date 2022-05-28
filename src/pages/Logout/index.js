import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import reqStatus from '../../utils/req-status';
import { userLogout } from '../../features/Auth/actions';
import useRemoveUser from '../../hooks/useRemoveUser';

//apis
import { logout } from '../../api/auth';

//components
import Title from '../../components/SiteTitle';
import Input from '../../components/Input';


export default function Logout(){
	
	const userLogout = useRemoveUser();
	
	React.useEffect(()=>{
		userLogout();
	},[])
	
	return "waiting logout..."
}