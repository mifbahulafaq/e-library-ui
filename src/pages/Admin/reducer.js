
const admin = (state, action)=>{
	
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
		
	  default:
	    return state;
  }
}

export { admin }