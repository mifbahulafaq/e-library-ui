import axios from 'axios';
import { config } from '../config';

export function getCategories(params){
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/categories`,{
		params,
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function storeCategory(data){
	console.log(data)
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.post(`${config.api_host}/api/categories`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function getSingleCategory(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/categories/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function updateCategory(id,data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.put(`${config.api_host}/api/categories/${id}`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function deleteCategory(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.delete(`${config.api_host}/api/categories/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

