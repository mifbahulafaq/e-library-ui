import axios from 'axios';
import { config } from '../config';

export async function register(data){
	return await axios.post(`${config.api_host}/api/members`,data)
}

export function getMembers(params){
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/members`,{
		params,
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

export function getSingleMember(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/members/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

export function updateMember(id,data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.put(`${config.api_host}/api/members/${id}`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

export function deleteMember(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.delete(`${config.api_host}/api/members/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}


