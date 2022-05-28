import React from 'react';
import style from './LogCirculation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import idFormatDate from '../../utils/id-format-date';
import { useSelector, useDispatch } from 'react-redux';
import { remove as removeLogs } from '../../features/Logs/actions';

//apis
import { getLogs, deleteLog} from '../../api/log';
//components
import Pagination from '../../components/Pagination';
import TableGreen from '../../components/TableGreen';
import SearchInput from '../../components/SearchInput';

import { log as logReducer } from './reducer';

export default function LogCirculation(){
	
	let initialState = {
		data:[],
		params:{
			skip: 0,
			limit: 5,
			q: ""
		},
		count:0,
		page: 1
	};
	let logRedux = useSelector(state=> state.logs);
	const dispatchRedux = useDispatch();
	const [logs, dispatch] = React.useReducer(logReducer,initialState);
	const history = useHistory();
	//date format
	let locale = 'en-GB';
	
	const fetchLogs = React.useCallback(async ()=>{
		
		const { data } = await getLogs(logs.params);
		dispatch({type:'INITIAL_FETCHING', data});
		
	},[logs.params, logRedux])
	
	React.useEffect(()=>{
		
		fetchLogs();
		
	},[fetchLogs])
	
	React.useEffect(()=>{
		return function(){
			dispatchRedux(removeLogs())
		}
	},[dispatchRedux])
	
	
	async function remove(id){
		
		await deleteLog(id);
		const { data } = await getLogs(logs.params);
		dispatch({type:'INITIAL_FETCHING', data});
		
	}
	
	const column = [
		{
				header: 'No',				
				Content:({ data, indexRow })=><b>{indexRow+1}</b>
		},
		{
			header: 'Operator', 
			Content:({ data })=><>{data.user?.name} ({data.user?.role})</>
		},
		{
			header: 'Peminjam', 
			Content:({ data })=><>{data.detail_circulation?.circulation?.member?.name} ({data.detail_circulation?.circulation?.member?.member_id})</>
		},
		{
			header: 'Tanggal Pinjam',
			Content:({ data })=>  <>{idFormatDate(data.detail_circulation?.circulation?.date_of_loan,locale)}</>
		},
		{
			header: 'Status',
			Content:({ data })=>  <div className={`${style.status} ${style[data.status]}`}>{data.status}</div>
		},
		{header: 'Buku', Content:({ data })=><>{data.detail_circulation?.book?.title}</>},
		{header: '', width:'10%', Content:({ data })=>
				<div className={style.svg}>
					<FontAwesomeIcon 
						onClick={()=>{
							history.push(`/circulation?circulation_id=${data.detail_circulation._id}`)
						}} 
						title="Detail" 
						icon="external-link-alt" 
					/>
					<FontAwesomeIcon  onClick={()=>remove(data._id)} icon="trash-alt"  title="delete"/>
				</div>}
	]
	
	async function searchBtn(){
		const { data } = await getLogs(logs.params);
		dispatch({type:'INITIAL_FETCHING', data});
	}
	
	return (
	  <div className={style.container}>
		<h1>Data Log Circulation</h1>
	    <div className={style.log}>
		  <div className={style.top}>
		    <div className={style.search}>
		      <SearchInput value={logs.params.q} onChange={e=>dispatch({type:'SEARCH',q:e.target.value})} searchBtn={searchBtn} />
			</div>
		  </div>
		  <TableGreen sameData={logRedux} data={logs.data} column={column} />
		  <div className={style.pagin}>
			<Pagination 
				changeSkip={page=>dispatch({type:'SKIP',page})}
				displayedData={logs.params.limit} 
				totalData={logs.count}
				currentPage={logs.page}
			/>
		  </div>
		</div>
	  </div>
	)
}