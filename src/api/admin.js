import axios from 'axios';
import { config } from '../config';

export async function storeAdmin(data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return await axios.post(`${config.api_host}/api/admins`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}
export function updateAdmin(id,data){
	
	const auth= JSON.parse(localStorage.getItem('auth'));
	
	return axios.put(`${config.api_host}/api/admins/${id}`,data,{
		headers: {
			authorization: `Bearer ${auth.token}`
		}
	})
}

