import React from 'react';
import style from './Booking.module.css';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '../../config';
import { useDispatch } from 'react-redux';
import { add } from '../../features/Logs/actions'

//apis
import { getBookings, deleteBooking, processBooking } from '../../api/booking';
//components
import Pagination from '../../components/Pagination';
import Alert from '../../components/Alert';
import GuardComponent from '../../components/GuardComponent';
import SearchInput from '../../components/SearchInput';

import groupingData from '../../utils/grouping-data';
import times from '../../utils/times';
import { booking as bookingReducer } from './reducer';

const TrGroup = ({children})=><>{children}</>

export default function Booking(){
	let initialState = {
	data:[],
	params:{
		skip: 0,
		limit: 8,
		q: ""
	},
	count:0,
	page:1
	};
	
	const [bookings, dispatch] = React.useReducer(bookingReducer,initialState);
	const [bookingGroups, setBookingGroups] = React.useState([]);
	const [alertErr, setAlertErr] = React.useState('');
	let history = useHistory();
	const dispatchRedux = useDispatch();
	
	const fetchBookings = React.useCallback(async ()=>{
		
		const { data } = await getBookings(bookings.params);
		dispatch({type:'INITIAL_FETCHING', data});
	},[bookings.params])
	
	React.useEffect(()=>{
		fetchBookings();
	},[fetchBookings])
	
	React.useEffect(()=>{
		
		let result = groupingData(bookings.data,'booking');
		
		setBookingGroups(result);
		
	},[bookings.data])
	
	async function clickDelete(id){
		await deleteBooking(id);
		fetchBookings();
	}
	
	async function prosses(id){
		
		const theDate = Date.now() + Number(config.date_of_return);
		const data = {date_of_return: new Date(theDate).toLocaleString("en-US",{dateStyle:'short'})}
		
		const { data: result } = await processBooking(id, data);
		
		if(result.error) return setAlertErr(result.message)
			
		dispatchRedux(add([result]));
		fetchBookings();
	}
	
	return (
	  <div className={style.container}>
	    <div className={style.booking}>
		  <div className={style.top}>
		    <SearchInput 
				value={bookings.params.q} 
				onChange={e=>dispatch({type:'SEARCH',q:e.target.value})} 
				reset={()=>dispatch({type:'SEARCH',q:''})} 
			/>
		  </div>
		  {alertErr && <Alert type="danger" message={alertErr} crossIcon={()=>setAlertErr('')}/>}
		  <div className={style.tableWrapper}>
	        <table>
		      <thead>
		        <tr>
		          <th>No.</th>
		          <th>Tanggal</th>
		          <th>Anggota</th>
		          <th>Durasi</th>
		          <th>Buku</th>
		          <th></th>
		          <th></th>
		        </tr>
		      </thead>
		      <tbody>
			  {
				bookingGroups.map((d,i)=>{
					
				  let theDate = new Date(d[0].booking.date);
				  let locale = 'en-GB';
				  
				 return  <TrGroup key={i}>
					<tr>
					  <td rowSpan={d.length+1}><b>{i+1}</b></td>
					  <td rowSpan={d.length+1}><b>{theDate.toLocaleString(locale)}</b></td>
					  <td rowSpan={d.length+1}>{d[0].booking.member?.name}{'\t'}({d[0].booking.member?.member_id})</td>
					</tr>
					{d.map((d2,i)=>{
						
					  let style ={color:d2.remaining_duration?'#444444':'#f44336'};
					  let runProcess = d2.remaining_duration?true:false;
					  
					  
					  
					  return <tr className={style.borderErr} key={i}>
							  <td><span style={style}>{times(d2.remaining_duration)}</span>{' '}{`(${d2.status})`}</td>
							  <td>{d2.book?.title}</td>
							  <td>
							    <FontAwesomeIcon onClick={()=>clickDelete(d2._id)} style={{display:d2.remaining_duration?'none':'initial'}} icon="trash-alt"  title="delete"/>
								<FontAwesomeIcon onClick={()=>clickDelete(d2._id)} icon="ban"  style={{display:d2.remaining_duration?'initial':'none'}} title="batal"/>
							  </td>
							  <td>
								<GuardComponent role={['admin','operator']}>
									<div onClick={()=>runProcess?prosses(d2._id):''} style={{backgroundColor:d2.remaining_duration?'#2877d2':'#999999'}}>Process</div>
								</GuardComponent>
							  </td>
					    </tr>
					})}
				  </TrGroup>
			    })
			  }
				
		      </tbody>
		    </table>
		  </div>
		  <div className={style.pagin}>
			<Pagination 
				changeSkip={page=>dispatch({type:'SKIP',page})}
				displayedData={bookings.params.limit} 
				totalData={bookings.count}
				currentPage={bookings.page}
			/>
		  </div>
		</div>
		{
		/*<div className={style.formWrapper}>
			<div className={style.searchBooking}>
				<input   type="text" placeholder="Search..." />
				<span >x</span>
			</div>
			<div className={style.formContent}>
			</div>
		    <div className={style.bottom}>Submit</div>
		</div>*/
		}
			 
	  </div>
	)
}