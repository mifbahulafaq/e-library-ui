import { ADD, CHANGE_DESCRIPTION, REMOVE } from './constants';

export function add(borrow, book){
	return {
		type: ADD,
		borrow,
		book
	}
}

export function description(value, index){
	return {
		type: CHANGE_DESCRIPTION,
		index,
		description: value
	}
}

export function remove(){
	return {
		type: REMOVE
	}
}