import axios from 'axios';
import { config } from '../config';

export function getBookings(params){
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/bookings`,{
		params,
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function storeBooking(data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.post(`${config.api_host}/api/bookings`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function processBooking(id, data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.put(`${config.api_host}/api/bookings/${id}/process`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function deleteBooking(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.delete(`${config.api_host}/api/bookings/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

