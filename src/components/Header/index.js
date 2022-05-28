import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link, NavLink} from 'react-router-dom';
import { config } from '../../config'
import { userLogout } from '../../features/Auth/actions';
import { removeUser } from '../../features/User/actions';
import { read } from '../../features/Logs/actions';

//components
import Title from '../SiteTitle';
import Image from '../Image';
import GuardComponent from '../GuardComponent';

//utils
import times from '../../utils/times';

export default function Header(){
	
	let {user, logs} = useSelector(state=> state);
	const dispatch = useDispatch();
	const history = useHistory();
	
	let borrowedLogs = logs.filter(data=>data.status === "borrowed" && !data.read),
		returnedLogs = logs.filter(data=>data.status === "returned" && !data.read),
		timeBorrowed,
		timeReturned,
		borrowedCreated,
		returnedCreated
	
	if(borrowedLogs.length){
		
		borrowedCreated = new Date(borrowedLogs[borrowedLogs.length - 1].created).getTime();
		timeBorrowed = times(Date.now() - borrowedCreated);
	}
	
	if(returnedLogs.length){
		returnedCreated = new Date(returnedLogs[returnedLogs.length - 1].created).getTime();
		timeReturned = times(Date.now() - returnedCreated);
	}
	
	return (
	  <div className={style.header}>
	    <div className={style.title}><Link to='/'><Title size="30px" /></Link></div>
        <div className={style.right}>
		  <GuardComponent role={['member']}>
			  <div className={style.menuMember}>
				<NavLink to="/circulation" className={isActive=>isActive?style.active:""}>
					<FontAwesomeIcon icon="sync" /><h1>Circulation</h1>
				</NavLink>
				<NavLink to="/booking" className={isActive=>isActive?style.active:""}>
					<FontAwesomeIcon icon="book-open" /><h1>Booking</h1>
				</NavLink>
			  </div>
		  </GuardComponent>
		  <div className={`${style.logWrapper} ${borrowedLogs.length || returnedLogs.length ?style.logActive:""}`}>
			<GuardComponent role={['admin','operator']}>
				<FontAwesomeIcon 
					onClick={()=>{
						const log = document.querySelector(`.${style.log}`);
						log.classList.toggle(style.playDropdown);
					}} 
					icon={["far","envelope"]}
				/>
			</GuardComponent>
			<div className={style.log} >
				<div className={style.top}>Log Circulation</div>
				<ul>
				
					<li>
						<Link onClick={()=>dispatch(read(borrowedLogs))} to="/circulation-log">
							<div className={style.left}>
								<FontAwesomeIcon icon="sync" />
								<span>{borrowedLogs.length} Peminjaman baru</span>
							</div>
							<span className={style.time}>{timeBorrowed}</span>
						</Link>
					</li>
					
					<li>
						<Link onClick={()=>dispatch(read(returnedLogs))} to="/circulation-log">
							<div className={style.left}>
								<FontAwesomeIcon icon="sync" />
								<span>{returnedLogs.length} Pengembalian baru</span>
							</div>
							<span className={style.time}>{timeReturned}</span>
						</Link>
					</li>
					
				</ul>
				<div onClick={()=>dispatch(read(logs))} className={style.bottom}><Link to="/circulation-log">Read More Messages</Link></div>
			</div>
		  </div>
		  
		  <div 
			onClick={()=>{
				const dropdown = document.querySelector(`.${style.dropDown}`);
				dropdown.classList.toggle(style.playDropdown);
			}} 
			className={style.profil}
		  >
			<div className={style.userImg}>
				<div className={style.imgRadius}>
					<Image src={user[user.role]?.photo?`${config.api_host}/upload/${user[user.role]?.photo}`:'/image/user-image.png'}/>
				</div>
			</div>
			
			<div className={style.detail}>
				<div>
					<h1 className={style.userName}>{user?.name||""}</h1>
				</div>
			</div>
		  </div>
			<ul className={style.dropDown} >
				<li>
					<NavLink
					to={
						(function(){
							switch(user.role){
							  case 'member':
								return `/member/${user._id}`
								
							  case 'operator':
								return `/user/operator/${user._id}`
								
							  case 'admin':
								return `/user/admin/${user._id}/edit`
								
							  default:
								return '/';
							}
						})()
					} 
					className={isActive=>isActive?style.active:""}
					>
						<FontAwesomeIcon icon="user" /><span>{user.role==='admin'?'Edit Profil':"Profil"}</span>
					</NavLink>
				</li>
				
				<li>
					<NavLink to="/logout" >
						<FontAwesomeIcon icon="sign-out-alt" /><span>Logout</span>
					</NavLink>
				</li>
			</ul>
		</div>
	  </div>
	)
}
/*
jika 
admin = profil, setting , logout
jika operator atau member =  Edit profil, setting , logout
*/