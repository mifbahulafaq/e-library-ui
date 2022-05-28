import axios from 'axios';
import { config } from '../config';

export async function login({email, password}){
	return await axios.post(`${config.api_host}/auth/login`,{email, password})
}

export async function logout(){
	const userData = localStorage.getItem('auth');
	let {token} = userData ? JSON.parse(userData) : {};
	
	return  axios.delete(`${config.api_host}/auth/logout`,{
		headers: {
			authorization: `Bearer ${token}`
		}
	})
	.then(res=>{
		
		localStorage.removeItem('auth');
		return res;
	})
}