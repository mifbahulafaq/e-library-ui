import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//apis
import { getUsers, deleteUser } from '../../api/user';
//components
import Pagination from '../../components/Pagination';
import TableGreen from '../../components/TableGreen';
import SearchInput from '../../components/SearchInput';
import FormAdmin from '../../components/FormAdmin';

import { admin as adminReducer } from './reducer';

export default function Admin(){
	
	let {user} = useSelector(state=> state);
	let initialState = {
	data:[],
	params:{
		skip: 0,
		limit: 8,
		q: "",
		role: 'admin'
	},
	count:0,
	page:1
	};
	
	const [admins, dispatch] = React.useReducer(adminReducer,initialState);
	
	const fetchAdmins = React.useCallback(async ()=>{
		const { data } = await getUsers(admins.params);
		dispatch({type:'INITIAL_FETCHING', data});
		
	},[admins.params])
	
	React.useEffect(()=>{
		
		fetchAdmins();
		
	},[fetchAdmins])
	
	async function remove(id){
		
		await deleteUser(id);
		const { data } = await getUsers(admins.params);
		dispatch({type:'INITIAL_FETCHING', data});
		
	}
	
	const column = [
		{
			header: 'No.', 
			Content:({ data, indexRow })=><>{indexRow+1}</>
		},
		{header: 'Name', Content:({ data })=><>{data.name}</>},
		{header: 'Email', Content:({ data })=><>{data.email}</>},
		{header: '', width:'10%', Content:({ data })=>
				<div className={style.svg}>
					{
					user._id === data._id ?
					''
					:
					<FontAwesomeIcon  onClick={()=>remove(data._id)} icon="trash-alt"  title="delete"/>
					}
				</div>}
	]
	
	async function searchBtn(){
		const { data } = await getUsers(admins.params);
		dispatch({type:'INITIAL_FETCHING', data});
	}
	console.log(admins.data)
	console.log(user)
	return (
	  <div className={style.wrapper}>
	    <div  className={style.data}>
		  <div className={style.top}>
		    <div className={style.search}>
				<SearchInput 
					value={admins.params.q} 
					onChange={e=>dispatch({type:'SEARCH',q:e.target.value})} 
					reset={()=>dispatch({type:'SEARCH',q:''})} 
				/>
			</div>
		  </div>
		  <div className={style.table}>
			<TableGreen data={admins.data} column={column} />
		  </div>
		  <div className={style.pagin}>
			<Pagination 
				changeSkip={page=>dispatch({type:'SKIP',page})}
				displayedData={admins.params.limit} 
				totalData={admins.count}
				currentPage={admins.page}
			/>
		  </div>
		</div>
		
		<div className={style.formWrapper}>
			<FormAdmin fetchAdmins={fetchAdmins} />
		</div>
	  </div>
	)
}