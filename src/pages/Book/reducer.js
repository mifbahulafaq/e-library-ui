
const book = (state, action)=>{
	
  function skip(page){
	  return state.params.limit * page - state.params.limit;
  }
  
  switch(action.type){
	  case 'INITIAL_FETCHING':
	    return {...state, ...action.data};
		
	  case 'SKIP':
		return {...state, params:{...state.params, skip: skip(action.page)}, page: action.page}
		
	  case 'SEARCH':
		return {...state, params:{...state.params,q: action.q}}
		
	  case 'CATEGORY':
		return {...state, params:{...state.params,category: action.category}}
		
	  case 'RACK':
		return {...state, params:{...state.params,rack: action.rack}}
		
	  default:
	    return state;
  }
}

export { book }