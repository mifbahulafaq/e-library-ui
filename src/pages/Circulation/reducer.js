
const circulation = (state, action)=>{
	
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
		
	  case 'STATUS':
	  
		return {...state, params:{...state.params,status: action.status?'borrowed':'returned'}}
		
	  case 'SINGLE':
	  
		return {...state, params:{...state.params,detailId: action._id, status: action.status}}
		
	  default:
	    return state;
  }
}

export { circulation as default }