
const book = (state, action)=>{
  switch(action.type){
	  case 'INITIAL_FETCHING':
	    return {...state, ...action.data};
		
	  case 'PAGE':
		const skip= state.params.limit * action.page - state.params.limit;
		return {...state, params:{...state.params, skip: skip}}
		
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