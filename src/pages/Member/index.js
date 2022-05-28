import React from 'react';
import style from './Member.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '../../config';
import { useHistory } from 'react-router-dom';

//apis
import { getUsers } from '../../api/user';
import { deleteMember } from '../../api/member';
//components
import Image from '../../components/Image';
import Pagination from '../../components/Pagination';
import TableGreen from '../../components/TableGreen';
import SearchInput from '../../components/SearchInput';
import PageTitle from '../../components/PageTitle';

import { member as memberReducer } from './reducer';

export default function Member(){
	
	let initialState = {
	data:[],
	params:{
		skip: 0,
		limit: 8,
		q: "",
		role: 'member'
	},
	page:1,
	count:0
	};
	const [members, dispatch] = React.useReducer(memberReducer,initialState);
	const history = useHistory();
	
	const fetchMembers = React.useCallback(async ()=>{
		
		const { data } = await getUsers(members.params);
		dispatch({type:'INITIAL_FETCHING', data});
		
	},[members.params])
	
	React.useEffect(()=>{
		
		fetchMembers();
		
	},[fetchMembers])
	
	async function remove(id){
		
		const { data } = await deleteMember(id);
		if(!data.error) fetchMembers();
		
	}
	
	const column = [
		{
				header: 'No',				
				Content:({ data, indexRow })=><b>{indexRow+1}</b>
		},
		{
			header: 'Member ID', 
			Content:({ data })=><>{data.member.member_id}</>
		},
		{header: 'Name', Content:({ data })=><>{data.name}</>},
		{header: 'Jenis Kelamin', Content:({ data })=><>{data.member.gender}</>},
		{header: 'Foto', Content:({ data })=><div className={style.imgWrapper}>
					<Image src={data.member?.photo?`${config.api_host}/upload/${data.member.photo}`:''}/>
				</div>},
		{header: '', width:'10%', Content:({ data })=>
				<div className={style.svg}>
					<FontAwesomeIcon onClick={()=>history.push(`/member/${data._id}`)} title="Detail" icon={["far","list-alt"]} />
					<FontAwesomeIcon  onClick={()=>remove(data._id)} icon="trash-alt"  title="delete"/>
				</div>}
	]
	
	async function searchBtn(){
		const { data } = await getUsers(members.params);
		dispatch({type:'INITIAL_FETCHING', data});
	}
	
	return (
	  <div className={style.container}>
		<PageTitle size="1.5em">Data Member</PageTitle>
	    <div className={style.book}>
		  <div className={style.top}>
		    <div className={style.search}>
		      <SearchInput value={members.params.q} onChange={e=>dispatch({type:'SEARCH',q:e.target.value})} reset={()=>dispatch({type:'SEARCH',q:''})} />
			</div>
		  </div>
		  <TableGreen data={members.data} column={column} />
		  <div className={style.pagin}>
			<Pagination 
				changeSkip={page=>dispatch({type:'SKIP',page})}
				displayedData={members.params.limit} 
				totalData={members.count}
				currentPage={members.page}
			/>
		  </div>
		</div>
	  </div>
	)
}