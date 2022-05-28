import axios from 'axios';
import { config } from '../config';

export function getLogs(params){
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.get(`${config.api_host}/api/circulation-logs`,{
		params,
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

export function deleteLog(id){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.delete(`${config.api_host}/api/circulation-logs/${id}`,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}