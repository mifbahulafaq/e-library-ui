import axios from 'axios';
import { config } from '../config';

export function getCirculations(params){
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/circulations`,{
		params,
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function reportCirculation(params){
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/circulations/report`,{
		params,
		headers: {
			authorization: `Bearer ${auth.token}`
		},
		responseType: 'blob'
	})
}
export function storeCirculation(data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.post(`${config.api_host}/api/circulations`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function getSingleCirculation(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/circulations/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function payCirculation(id,fine_payment){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.put(`${config.api_host}/api/circulations/${id}/pay`,{fine_payment},{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function returnCirculation(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	console.log(auth.token)
	return axios.put(`${config.api_host}/api/circulations/${id}/return`,null,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

