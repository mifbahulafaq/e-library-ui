import axios from 'axios';
import { config } from '../config';

export async function store(data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return await axios.post(`${config.api_host}/api/operators`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

export function getMembers(params){
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/operators`,{
		params,
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

export function getSingleMember(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/operators/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

export function updateOperator(id,data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.put(`${config.api_host}/api/operators/${id}`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

export function deleteOperator(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.delete(`${config.api_host}/api/operators/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}


