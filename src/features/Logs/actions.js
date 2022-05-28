import { ADD, REMOVE, READ } from './constants';

export function add(data){
	return {
		type: ADD,
		data
	}
}

export function remove(){
	return {
		type: REMOVE
	}
}

export function read(data){
	return {
		type: READ,
		data	
	}
}