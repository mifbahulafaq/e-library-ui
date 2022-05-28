import { ADD, CHANGE_DESCRIPTION, REMOVE } from './constants';

let initialState = {
	boolBor: true,
	books: []
};

export default function reducer(state = initialState, action){
	
		
	
  switch(action.type){
	  case ADD:
	  
	    if(state.boolBor !== action.borrow) state.books = [];
		
		if(state.books.length < 2){
				
			if(action.borrow) action.book.description = "";
			
			const find = state.books.find(data=>data===action.book);
				
			if(find) return state;
			
			return {boolBor: action.borrow, books: [...state.books, action.book]};
		}
			
		return state;
		
	  case CHANGE_DESCRIPTION:
	  
		state.books[action.index].description = action.description;
		
		return {...state};
	
	  case  REMOVE:
		return {...state, books: []}
		
	default:
	    return state;
  }
}