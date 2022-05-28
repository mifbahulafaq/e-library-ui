import React from 'react';
import style from './Circulation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useQuery from '../../hooks/useQuery';
import useGroup from '../../hooks/useGroup';

//cpmponents
import TableRow from '../../components/TableRow';
import Pagination from '../../components/Pagination';
import SearchInput from '../../components/SearchInput';
import DetailCirculation from '../../components/DetailCirculation';

import idFormatDate from '../../utils/id-format-date';
import circulationReducer from './reducer';

//APIs
import { getCirculations, getSingleCirculation} from '../../api/circulation';


export default function Circulation(){
	let z = {}
	let initialState = {
		data:[],
		params:{
			skip: 0,
			limit: 5,
			q: "",
			status: 'borrowed'
		},
		page:1,
		count:0
	};
	//date format
	let opt1 = { dateStyle:'short', timeStyle:'medium'};
	let opt2 = { day:"numeric", month:"numeric", year: "numeric"};
	let locale = 'en-GB';
	//state
	const [circulations, dispatch] = React.useReducer(circulationReducer,initialState);
	const [circulationGroups, setCirculationGroups] = React.useState([]);
	const [singleCirculation, setSingleCirculation] = React.useState({});
	const [singlePay, setSinglePay] = React.useState(0);
	const [borrowing, setBorrowing] = React.useState(true);
	const log = useSelector(state=>state.singleLog);
	const dispatchRedux = useDispatch();
	const location = useLocation();
	let queryString = useQuery();
	let [ dataGroup, setDataGroup] = useGroup([],'circulation');
	
	const fetchCirculations = React.useCallback(async ()=>{
		
		if(!queryString.get('circulation_id')){
			try{
				
				const { data } = await getCirculations(circulations.params);
				console.log(data)
				dispatch({type:'INITIAL_FETCHING', data});

			}catch(err){
				throw err
				return;
			}
		}
		
	},[circulations.params, singleCirculation])
	
	React.useEffect(async ()=>{
		if(queryString.get('circulation_id')){
			const { data } = await getCirculations({detailId: queryString.get('circulation_id')});
			if(data.count){
				dispatch({
					type:'INITIAL_FETCHING', 
					data: {...data,
						params: {...circulations.params, status: data.data[0].status}
					}
				});
			}
		}
		
	},[queryString.get('circulation_id')])
	
	React.useEffect(()=>{
		fetchCirculations();
	},[fetchCirculations])
	
	React.useEffect(()=>{
		
		setDataGroup(circulations.data);
		
	},[circulations.data]);
	
	const searchBtn = async ()=>{
		const { data } = await getCirculations(circulations.params)
		dispatch({type:'INITIAL_FETCHING', data})
	}
	
	async function setSingleData(id){
		const { data } = await getSingleCirculation(id)
		setSingleCirculation(data)
	}
	
	const column = [
		{
				header: 'No',
				rowSpan:true, 				
				Content:({ data, indexRow })=><b>{indexRow+1}</b>
		},
		{
				header: 'Tanggal Pinjam',
				rowSpan:true, 				
				Content:({ data })=><b>{idFormatDate(data.circulation.date_of_loan,locale)}</b>
		},
		{
			header: 'Anggota', 
			rowSpan:true, 
			Content:({ data })=><b>{data.circulation.member?.name} ({data.circulation.member?.member_id})</b>
		},
		{
			header: 'Harus dikembalikan', 
			rowSpan:true, 
			Content:({ data })=>{
				
				const theDate = data.circulation?.date_of_return
				const dateNow = Date.now();
				const boolDate = Boolean(dateNow<=new Date(theDate).getTime() || data.status === 'returned')
				
				return <div className={`${style.label} ${boolDate?"":style.labelRed}`} >
					<b> {idFormatDate(theDate,locale,opt2)} </b>
				</div>
			}
		},
		{
			header: 'Dikembalikan', 
			rowSpan:false, 
			Content:({ data })=>{
				
				const theDate = data.returned;
				
				return <>
					{theDate?idFormatDate(theDate,locale,opt1):""}
				</>
			}
		},
		{header: 'Book', rowSpan:false, Content:({ data })=><>{data.book?.title}</>},
		{header: 'Deskripsi', rowSpan:false, Content:({ data })=><>{data.description}</>},
		{
			header: '', 
			rowSpan:false, 
			Content:({ data })=>
				<div style={{color:data._id===singleCirculation._id?'red':'#005ffa'}} className={style.svg}>
					<FontAwesomeIcon onClick={()=>{
						setSingleData(data._id)
					}} title="Detail" icon={["far","list-alt"]} />
				</div>
		}
	]
	
	function status(status){
		setBorrowing(status)
		dispatch({type:'STATUS',status})
	}
	
	return (
	  <div className="wrapper">
		<div className={style.filter}>
			<div className={style.search}>
				<SearchInput 
					value={circulations.params.q} 
					onChange={e=>dispatch({type:'SEARCH',q:e.target.value})} 
					reset={()=>dispatch({type:'SEARCH',q:''})} 
				/>
			</div>
			<ul className={style.navCirculation}>
				<li className={circulations.params.status==="borrowed"?style.navActive:""} onClick={()=>status(true)}>Peminjaman</li>
				<li className={circulations.params.status==="returned"?style.navActive:""} onClick={()=>status(false)}>Pengembalian</li>
			</ul>
		</div>
		<TableRow column={column} dataGroup={dataGroup} />
		<div className={style.pagin}>
			<Pagination 
				changeSkip={page=>dispatch({type:'SKIP',page})}
				displayedData={circulations.params.limit} 
				totalData={circulations.count}
				currentPage={circulations.page}
			/>
		</div>
		<div style={{display:singleCirculation.circulation?'block':'none'}} className={style.detail}>
			<DetailCirculation closeDetail={()=>setSingleCirculation({})} setItem={setSingleData} item={singleCirculation} input={singlePay} setInput={setSinglePay} />
		</div>
	  </div>
	)
}
