import React from 'react';
import style from './SuccessfulRegistration.module.css';
import { Link } from "react-router-dom";

//cpmponents
import SiteTitle from '../../components/SiteTitle';


export default function SuccessfulRegistration(){
	return (
	  <div className={style.container}>
	    <div className={style.title}>
	      <SiteTitle size="35px" />
		</div>
		<div className={style.text}>
		  <h1>Registration is successful...</h1>
	      <h1>Please, <Link to="/login">Log In</Link> as a member</h1>
	    </div>
	  </div>
	)
}