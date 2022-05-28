import axios from 'axios';
import { config } from '../config';

export function getRacks(params){
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/racks`,{
		params,
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function storeRack(data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.post(`${config.api_host}/api/racks`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function getSingleRack(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/racks/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function updateRack(id,data){
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.put(`${config.api_host}/api/racks/${id}`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function deleteRack(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.delete(`${config.api_host}/api/racks/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

