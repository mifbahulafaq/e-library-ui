import React from 'react';
import style from './Operator.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '../../config';
import { useHistory } from 'react-router-dom';

//apis
import { getUsers } from '../../api/user';
import { deleteOperator } from '../../api/operator';
//components
import Image from '../../components/Image';
import Pagination from '../../components/Pagination';
import TableGreen from '../../components/TableGreen';
import SearchInput from '../../components/SearchInput';
import FormOperator from '../../components/FormOperator';

import { operator as operatorReducer } from './reducer';

export default function Operator(){
	
	let initialState = {
	data:[],
	params:{
		skip: 0,
		limit: 8,
		q: "",
		role: 'operator'
	},
	count:0,
	page:1
	};
	const [adding, setAdding] = React.useState(false)
	const [operators, dispatch] = React.useReducer(operatorReducer,initialState);
	const history = useHistory();
	
	const fetchOperators = React.useCallback(async ()=>{
		
		const { data } = await getUsers(operators.params);
		dispatch({type:'INITIAL_FETCHING', data});
		
	},[operators.params])
	
	React.useEffect(()=>{
		
		fetchOperators();
		
	},[fetchOperators])
	
	async function remove(id){
		
		await deleteOperator(id);
		const { data } = await getUsers(operators.params);
		dispatch({type:'INITIAL_FETCHING', data});
		
	}
	
	const column = [
		{
			header: 'No.', 
			Content:({ data, indexRow })=><>{indexRow+1}</>
		},
		{header: 'Name', Content:({ data })=><>{data.name}</>},
		{header: 'Jenis Kelamin', Content:({ data })=><>{data.operator.gender}</>},
		{header: 'Email', Content:({ data })=><>{data.email}</>},
		{header: 'Alamat', Content:({ data })=><>{data.operator.address}</>},
		{header: 'Foto', Content:({ data })=><div className={style.imgWrapper}>
					<Image src={data.operator.photo?`${config.api_host}/upload/${data.operator.photo}`:''}/>
				</div>},
		{header: '', width:'10%', Content:({ data })=>
				<div className={style.svg}>
					<FontAwesomeIcon onClick={()=>history.push(`/user/operator/${data._id}`)} title="Detail" icon={["far","list-alt"]} />
					<FontAwesomeIcon  onClick={()=>remove(data._id)} icon="trash-alt"  title="delete"/>
				</div>}
	]
	
	async function searchBtn(){
		const { data } = await getUsers(operators.params);
		dispatch({type:'INITIAL_FETCHING', data});
	}
	
	return (
	  <div className={style.wrapper}>
	    <div style={{width:adding?'60%':'100%'}} className={style.data}>
		  <div className={style.top}>
		    <div className={style.search}>
				<SearchInput 
					value={operators.params.q} 
					onChange={e=>dispatch({type:'SEARCH',q:e.target.value})} 
					reset={()=>dispatch({type:'SEARCH',q:''})} 
				/>
			</div>
			<div onClick={()=>setAdding(adding?false:true)} className={style.adding}>
				  <FontAwesomeIcon icon="arrow-left" rotation={adding?180:0} />
				  <span>Add</span>
			</div>
		  </div>
		  <div className={style.table}>
			<TableGreen data={operators.data} column={column} />
		  </div>
		  <div className={style.pagin}>
			<Pagination 
				changeSkip={page=>dispatch({type:'SKIP',page})}
				displayedData={operators.params.limit} 
				totalData={operators.count}
				currentPage={operators.page}
			/>
		  </div>
		</div>
		
		<div style={{marginRight:adding?'initial':'-500px'}} className={style.formWrapper}>
			<FormOperator fetchOperators={fetchOperators} />
		</div>
	  </div>
	)
}