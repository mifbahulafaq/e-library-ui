import React from 'react';
import style from './Main.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { initialFetching, skip, search, category, rack } from '../../features/Books/actions';
import { add, description, remove } from '../../features/BorrowBookings/actions';
import { config } from '../../config';
import debounce from 'debounce-promise';

//APIs
import { getBooks } from '../../api/book';
import { getCategories } from '../../api/category';
import { getRacks } from '../../api/rack';
import { storeBooking } from '../../api/booking';

//cpmponents
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import BorrowBooking from '../../components/BorrowBooking';

export default function Main({children}){
	const dispatch = useDispatch();
	const { books, borrowBookings } = useSelector(state=>state);
	const [categories, setCategories] = React.useState([]);
	const [racks, setRacks] = React.useState([]);
	const history = useHistory();
	
	function getAll(){
		return Promise.all([
		  getCategories(),
		  getBooks(books.params),
		  getRacks()
		]);
	}
	let debouncedFetchAll = debounce(getAll, 1000);
	
	const fetchBooks = React.useCallback(async function(){
		
		const [{data: dc},{data: db},{data: dr}] = await debouncedFetchAll()
		
		setCategories(value=>dc.error?value:dc);
		setRacks(value=>dr.error?value:dr);
		
		if(!db.error)dispatch(initialFetching(db))
			
	},[books.params.skip, books.params.q, dispatch])
	
	React.useEffect(function(){
			fetchBooks();
	},[fetchBooks])
	
	async function changeCategory(e){
		dispatch(category(e.target.value));
	}
	
	async function changeRack(e){
		dispatch(rack(e.target.value));
	}
	
	async function submitBorrowBooking(){
		
		if(borrowBookings.books.length){
			
			if(!borrowBookings.boolBor){
				
				const data = {
					duration: config.booking_duration,
					books: borrowBookings.books.map(e=>e._id)
				}
			
				const { data: result } = await storeBooking(data);
				
				if(result.length) {
					dispatch(remove())
					history.push('/booking');
				}
				
				return;
			}
			
			history.push('/borrowing');
		}
	}
	
	async function submitFilter(e){
		e.preventDefault();
		
		const { data } = await getBooks(books.params)
		dispatch(initialFetching(data));
	}
	return (
	<div className={style.container}>
	  <div className={style.bookWrapper}>	
		<div className={style.top}>
		  <div className={style.search}>
		    <input value={books.params.q} onChange={e=>dispatch(search(e.target.value))} type="text" placeholder="Search..." className={style.bookSearch} />
			<FontAwesomeIcon 
				onClick={()=>{
					const filter = document.querySelector(`.${style.filter}`);
					filter.classList.toggle(style.showFilter);
				}}  
				title="Filter" icon='filter'
			/>
			<div className={style.filter} >
				<form onSubmit={submitFilter} >
					  <div className={style.row}>
						<label htmlFor="title"><strong>Category</strong></label>
						  <select value={books.params.category?books.params.category:""} onChange={changeCategory}>
							<option value="" >Pilih</option>
							{
								categories.map((e,i)=>{
									return <option  value={e._id} key={i}>{e.name}</option>
								})
							}
						  </select>
					  </div>
					  <div className={style.row}>
						<label htmlFor="title"><strong>Rack</strong></label>
						  <select value={books.params.rack?books.params.rack:""} onChange={changeRack}>
							<option value="" >Pilih</option>
							{
								racks.map((e,i)=>{
									return <option  value={e._id} key={i}>{e.name}</option>
								})
							}
						  </select>
					  </div>
					<button type='submit'>Search</button>
				</form>
			</div>
		  </div>
		</div>
	    <div className={style.books}>
			{books.data.map((book,i)=><Card key={i} book={book} borrow={(book)=>dispatch(add(true,book))} booking={(book)=>dispatch(add(false,book))} />)}
		</div>
		<div className={style.bottom}>
		  
			<Pagination 
				changeSkip={page=>dispatch(dispatch(skip(page)))}
				displayedData={books.params.limit} 
				totalData={books.count}
				currentPage={books.page}
			/>
			
		</div>
	  </div>
	  <div style={{marginRight:borrowBookings.books.length?'0px':'-460px'}} className={style.slideWrapper}>
	    <BorrowBooking 
		  clickSubmit={submitBorrowBooking} 
		  boolBor={borrowBookings.boolBor} 
		  books={borrowBookings.books}
		  changeTextarea={(value,i)=>dispatch(description(value,i))}
		/>
	  </div>	
	</div>
  )
}