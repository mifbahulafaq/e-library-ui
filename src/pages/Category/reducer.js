
const category = (state, action)=>{
  switch(action.type){
	  case 'INITIAL_FETCHING':
	    return {...state, ...action.data};
		
	  case 'PAGE':
		const skip= state.params.limit * action.page - state.params.limit;
		return {...state, params:{...state.params, skip: skip}}
		
	  case 'SEARCH':
		return {...state, params:{...state.params,q: action.q}}
		
	  default:
	    return state;
  }
}

export { category }