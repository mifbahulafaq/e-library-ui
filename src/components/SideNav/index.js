import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation } from 'react-router-dom';
import style from './SideNav.module.css';

//components
import GuardComponent from '../GuardComponent';

export default function SideNav(){
	let { pathname } = useLocation();
	
	let [klikDropdown, setKlikDropdown] = useState(false);
	let [menuUser, setMenuUser] = useState('User');
	
	useEffect(()=>{
		
		const dropdownUrl = ['Admin','Operator'];
		setMenuUser('User')
		
		dropdownUrl.forEach(e=>{
			if( pathname.indexOf(e.toLowerCase()) >= 0 ) return setMenuUser(e);
		})
		
	},[pathname])
	
	return (
	  <ul className={style.sideNav}>
		<li className={style.menu}>
			<NavLink exact to="/" className={isActive=>isActive?style.active:""}>
				<div className={style.top}></div>
				<div className={style.menuName} >
					<FontAwesomeIcon icon="home" /><h1>Home</h1>
				</div>
				<div className={style.bottom}></div>
			</NavLink>
		</li>
		<li className={style.menu}>
			<NavLink to="/book" className={isActive=>isActive?style.active:""}>
				<div className={style.top}></div>
				<div className={style.menuName} >
					<FontAwesomeIcon icon="book" /><h1>Book</h1>
				</div>
				<div className={style.bottom}></div>
			</NavLink>
		</li>
		<li className={style.menu}>
			<NavLink to="/member" className={isActive=>isActive?style.active:""}>
				<div className={style.top}></div>
				<div className={style.menuName} >
					<FontAwesomeIcon icon="user" /><h1>Member</h1>
				</div>
				<div className={style.bottom}></div>
			</NavLink>
		</li>
		<li className={style.menu}>
			<NavLink to="/booking" className={isActive=>isActive?style.active:""}>
				<div className={style.top}></div>
				<div className={style.menuName} >
					<FontAwesomeIcon icon="book-open" /><h1>Booking</h1>
				</div>
				<div className={style.bottom}></div>
			</NavLink>
		</li>
		<li className={style.menu}>
			<NavLink exact to="/circulation" className={isActive=>isActive?style.active:""}>
				<div className={style.top}></div>
				<div className={style.menuName} >
					<FontAwesomeIcon icon="sync" /><h1>Circulation</h1>
				</div>
				<div className={style.bottom}></div>
			</NavLink>
		</li>
		<li className={style.menu}>
			<NavLink to="/circulation/report" className={isActive=>isActive?style.active:""}>
				<div className={style.top}></div>
				<div className={style.menuName} >
					<FontAwesomeIcon icon="book" /><h1>Laporan</h1>
				</div>
				<div className={style.bottom}></div>
			</NavLink>
		</li>
		<GuardComponent role={['admin']}>
			<li className={`${style.menuDropdown}`} >
				<div  
					className={`${style.link} ${klikDropdown?style.click:''} ${klikDropdown?style.rotate:''} ${menuUser !== 'User'?style.active:''}`} 
					onClick={e=>setKlikDropdown(!klikDropdown)} >
					
					<div className={style.top}></div>
					<div className={style.menuName} >
						<FontAwesomeIcon icon="users" /><h1>{menuUser}</h1>
					</div>
					<ul className={`${style.dropDown} ${klikDropdown?style.playDropdown:''}`}>
						<li><NavLink to="/user/admin">Admin</NavLink></li>
						<li><NavLink to="/user/operator">Operator</NavLink></li>
					</ul>
					<div className={style.bottom}></div>
					
				</div>
			</li>
		</GuardComponent>
	  </ul>
	)
	  
}