import { INITIAL_FETCHING, SKIP, SEARCH, CATEGORY, RACK } from './constants';

export function initialFetching(data){
	return {
		type: INITIAL_FETCHING,
		data
	}
}

export function skip(page){
	
	return {
		type: SKIP,
		page
	}
}

export function search(keyword){
	return {
		type: SEARCH,
		q: keyword
	}
}

export function category(category){
	return {
		type: CATEGORY,
		category
	}
}

export function rack(rack){
	return {
		type: RACK,
		rack
	}
}