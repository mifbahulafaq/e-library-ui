import React from 'react';
import style from './App.module.css';
import {Route, HashRouter, Switch} from 'react-router-dom';
import { listen } from './app/listener'
import { useDispatch } from 'react-redux';
import { fetchUser } from './features/User/actions';

//icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {faUsers, faEllipsisV, faFilter, faExternalLinkAlt, faSignOutAlt, faCog, faHammer, faUnlockAlt, faPhoneAlt, faEdit, faTrashAlt ,faHome, faBook, faBookOpen, faSync, faPrint, faBan, faUser, faArrowLeft, faUndo, faVenusMars} from '@fortawesome/free-solid-svg-icons';
import {faCalendarAlt, faBell, faTimesCircle, faListAlt, faEnvelope, faFilePdf} from '@fortawesome/free-regular-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import GuardRoute from './components/GuardRoute';
import GuestRoute from './components/GuestRoute';

//pages
import Home from './pages/Home';
import MemberCard from './pages/MemberCard';
import Borrowing from './pages/Borrowing';
import Register from './pages/RegisterMember';
import Login from './pages/Login';
import Logout from './pages/Logout';
import SuccessfulRegistration from './pages/SuccessfulRegistration';

library.add(
	faEdit, 
	faTrashAlt, 
	faHome, 
	faBook, 
	faBookOpen, 
	faSync, 
	faPrint, 
	faBell, 
	faTimesCircle, 
	faBan,
	faUser,
	faArrowLeft,
	faListAlt,
	faUndo,
	faEnvelope,
	faPhoneAlt,
	faVenusMars,
	faCalendarAlt,
	faUnlockAlt,
	faHammer,
	faCog,
	faSignOutAlt,
	faExternalLinkAlt,
	faFilter,
	faEllipsisV,
	faFilePdf,
	faUsers
);

function App() {
	
	const dispatch = useDispatch();
	const currentAuth = localStorage.getItem('auth');
	
	React.useEffect(()=>{
	  listen();
	},[])
	
	React.useEffect(()=>{
		dispatch(fetchUser());
	},[currentAuth, dispatch])
	
  return (	
      <div className={style.app}>
	    <HashRouter>
	      <Switch>
			  <GuestRoute path='/register/successful'>
			    <SuccessfulRegistration />
			  </GuestRoute>
			  <GuestRoute path='/login'>
				<Login />
			  </GuestRoute>
			  <Route path='/logout'>
				<Logout />
			  </Route>
			  <GuestRoute path='/register'>
				<Register />
			  </GuestRoute>
			  <GuardRoute path='/borrowing' role={['admin', 'operator']}>
				<Borrowing />
			  </GuardRoute>
			  <GuardRoute path='/member/:member_id/member-card'>
				<MemberCard />
			  </GuardRoute>
			  <GuardRoute path='/' >
				<Home />
			  </GuardRoute>
		  </Switch>
	    </HashRouter>
	  </div>
  );
}

export default App;