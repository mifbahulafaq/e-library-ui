import React, {useEffect} from 'react';
import {  Redirect, useHistory } from 'react-router-dom';
import style from './Borrowing.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '../../config';
import { add } from '../../features/Logs/actions'
import { remove } from '../../features/BorrowBookings/actions';

//cpmponents
import Header from '../../components/Header';
import TableGreen from '../../components/TableGreen';
import Image from '../../components/Image';
import NamePage from '../../components/NamePage';

//apis
import { storeCirculation } from '../../api/circulation';
import { getMembers } from '../../api/member';

export default function Borrowing(){
	
	const errMember1 = 'Masukan ID member';
	const errMember2 = 'Member is not found';
	const { borrowBookings } = useSelector(state=>state);
	const [member, setMember] = React.useState('');
	const [errMemberID, setErrMemberID] = React.useState(false);
	let history = useHistory();
	const dispatch = useDispatch();
	
	const column = [
		{
			header: 'Image', 
			Content:({ data })=><div className={style.imgWrapper}>
					<Image src={data.image?`${config.api_host}/upload/${data.image}`:''}/>
				</div>
		},
		{header: 'Name', Content:({ data })=><>{data.title}</>},
		{header: 'Category', Content:({ data })=><>{data.category?.name}</>},
		{header: 'Rack', Content:({ data })=><>{data.rack?.name}</>},
		{header: 'Deskripsi', Content:({ data })=><>{data.description}</>},
	]
	
	useEffect(()=>{
		return ()=>{
			dispatch(remove())
		}
	},[])
	
	async function proses(){
		
		if(!member.length) return setErrMemberID(errMember1);
		
		const { data: {data: members} } = await getMembers({member});
		
		if(!members.length) return setErrMemberID(errMember2);
		
		const data = {
			member: members[0]._id,
			date_of_return: config.date_of_return,
			detail: borrowBookings.books.map(e=>({ book:e._id, description: e.description}))
		}
		
		const { data: circulation } = await storeCirculation(data);
		
		if(circulation.error){
			console.log(circulation)
			return;
		}
		
		dispatch(add(circulation));
		
		history.push('/')
	}
	function inputIdMember(e){
		
		if(!e.target.value.length){
			setErrMemberID(errMember1)
		}else{
			setErrMemberID('')
		}
		setMember(e.target.value)
	}
	
	if(!borrowBookings.books.length) return <Redirect to='/' />
	
	return (
	  <div className={style.wrapper}>
		<div className={style.top}>
	      <Header />
		</div>
		
		<NamePage title="Peminjaman" />
		<br />
		
		<div className={style.books}>
			<TableGreen data={borrowBookings.books} column={column} />
		</div>
		<h1 className={style.err}>{errMemberID}</h1>
		<div className={style.bottom}>
			<div className={style.left}>
				<div className={style.inputMember}>
					<FontAwesomeIcon icon="user" />
					<input type='number' value={member} onChange={inputIdMember} placeholder="Member ID" />
				</div>
				<div onClick={proses} className={style.btnProcess}>
					<span>Process</span>
					<FontAwesomeIcon icon="sync" />
				</div>
			</div>
			<div onClick={()=>history.push('/')} className={style.btnBack}>
				<FontAwesomeIcon icon="arrow-left" />
				<span>Kembali</span>
			</div>
		</div>
	  </div>
	)
}