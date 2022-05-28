import React from 'react';
import style from './Login.module.css';
import { useHistory, Link } from 'react-router-dom';
import reqStatus from '../../utils/req-status';
import { useDispatch } from 'react-redux';
import { addUser } from '../../features/Auth/actions'

//apis
import { login } from '../../api/auth';

//components
import Title from '../../components/SiteTitle';
import Input from '../../components/Input';


export default function Login({children}){
	const obj = {
		email:"",
		password:""
	}
	const [status, setStatus] = React.useState(reqStatus.idle);
	const [form, setForm] = React.useState(obj);
	const [err, setErr] = React.useState(obj);
	const [loginErr, setLoginErr] = React.useState("");
	const dispatch = useDispatch();
	const history = useHistory();
	
	function validation(name, e){
	  const value = e.target.value;
	  const emailRx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
			
	  switch(name){
	    case "password":
		  if(value.length < 3 || value.length > 255){
	        setErr({...err, [name]:`your ${name} is less than 3 char or more than 255`})
		  }else{
			setErr({...err, [name]:""})
		  }
		  break;
	    case "email":
		  if(!emailRx.test(value)){
			setErr({...err, email:"email must be a valid email"})
		  }else{
			setErr({...err, email:""})
		  }
		  break;
		default:
		  setErr({...err})
	  }
	}
	
	const handleSubmit = async event=>{
		
		event.preventDefault();
		
		setStatus(reqStatus.process);
		let boolErr = false;
		
		for(let prop in form){
			
		  if(!form[prop].length){
				
		    boolErr = true;
			setStatus(reqStatus.error);
			setErr(err=>({...err, [prop]: `Enter your ${prop}`}))
			  
	      }
			
		  if(err[prop].length){
			boolErr = true;
			setStatus(reqStatus.error);
		  }
		}
		
		if(!boolErr){
			
		  const { data } = await login(form);
		  
		  if(data.error){
			  
			  setStatus(reqStatus.error)
			  setLoginErr(data.message);
			  return;
			  
		  }
		  
		  setStatus(reqStatus.success);
		  
		  dispatch(addUser(data.user, data.token));
		  
		  history.push('/');
		  
		}
	}
	
	const input = name=>{
		return function(e){
		  validation(name,e);
		  
		  if(name==="photo") return setForm({...form,[name]:e.target.files[0]})
		  setForm({...form,[name]:e.target.value})
		}
	}
	
	return (
	<div className={style.container}>
	  <div className={style.title}>
		<Title size="30px" />
	  </div>
	  <h4 className={style.error}>{loginErr}</h4>
	  <div className={style.form}>
	    <div className={style.top}>
		  <h1>Log In</h1>
		</div>
		<form onSubmit={handleSubmit}>	
		  <div className={style.field}>
			<div>
			  <h4 className={style.error}>{err.email}</h4>
			  <Input type="text" value={form.email} placeholder="Email address" onChange={input('email')}/>
	        </div>
			<div>
			  <h4 className={style.error}>{err.password}</h4>
			  <Input type="password" value={form.password} placeholder="New password" onChange={input('password')}/>
	        </div>
		  </div>
		  <div className={style.bottom}>
		    <button disabled={status===reqStatus.process} type="submit">{status===reqStatus.process?"Loging In..":"Log In"}</button>
			<h1><Link to="/register">Register</Link> as a member</h1>
		  </div>
		</form>
      </div>
	</div>
  )
}