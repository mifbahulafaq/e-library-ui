import axios from 'axios';
import { config } from '../config';

export function getUsers(params){
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/users`,{
		params,
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

export function getSingleUser(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	const token = auth?.token
	
	return axios.get(`${config.api_host}/api/users/${id}`,{
		headers: {
			authorization: `Bearer ${token || ''}`
		}
	})
}

export function updateEmail(id,data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.put(`${config.api_host}/api/users/${id}/email`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function updatePassword(id,data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.put(`${config.api_host}/api/users/${id}/password`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

export function deleteUser(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.delete(`${config.api_host}/api/users/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}


