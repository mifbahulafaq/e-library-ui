import axios from 'axios';
import { config } from '../config';

export function getBooks(params){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/books`,{
		params,
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function storeBook(data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.post(`${config.api_host}/api/books`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function getSingleBook(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/books/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function updateBook(id,data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.put(`${config.api_host}/api/books/${id}`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function deleteBook(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.delete(`${config.api_host}/api/books/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

