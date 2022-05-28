import React from 'react';
import style from './Register.module.css';
import { useHistory, Link } from 'react-router-dom';
import reqStatus from '../../utils/req-status';
import * as validation from '../../validation';

//apis
import { register } from '../../api/member';

//cpmponents
import Title from '../../components/SiteTitle';
import Input from '../../components/Input';


export default function Register({children}){
	const obj = {
		name:"",
		gender:"",
		place:"",
		address:"",
		email:"",
		password:"",
		date_of_birth:"",
		phone_number:"",
		photo: ""
	}
	const [status, setStatus] = React.useState(reqStatus.idle);
	const [form, setForm] = React.useState(obj);
	const [err, setErr] = React.useState(obj);
	const history = useHistory();
	
	
	
	const handleSubmit = async event=>{
		console.log('submit')
		event.preventDefault();
		
		setStatus(reqStatus.process);
		let boolErr = false;
		
		for(let prop in form){
			
		  if(prop !== "phone_number" && prop !== "photo"){
			  
		    if(!form[prop].length){
				
			  boolErr = true;
			  setStatus(reqStatus.error)
			  
			  setErr(err=>({...err, [prop]: `Enter your ${prop}`}))
			}
			
		    if(err[prop].length){
				
			  boolErr = true;
			  setStatus(reqStatus.error)
			
			}
			
		  }
		}
		
		if(!boolErr){
			
		  const formData = new FormData();
		  
		  for(let key in form){
			  formData.append(key,form[key]);
		  }
		  
		  const { data } = await register(formData);
		  if(data.error){
			  
			  setStatus(reqStatus.error)
			  
			  const fields = Object.keys(data.fields)
			  fields.forEach(field=>{
				  setErr({...err, [field]:data.fields[field]?.message})
			  })
			  
			  return;
			  
		  }
		  setStatus(reqStatus.success);
		  history.push('/register/successful');
		  
		}
	}
	
	const input = name=>{
		return function(e){
			
		  if (name !== 'phone_number' && name !== 'photo') setErr({...err, [name]:validation[name](e.target.value)});
		  
		  if(name==="photo") return setForm({...form,[name]:e.target.files[0]})
		  setForm({...form,[name]:e.target.value})
		}
	}
	
	return (
	<div className={style.container}>
	  <div className={style.title}>
		<Title size="30px" />
	  </div>
	  <div className={style.form}>
	    <div className={style.top}>
		  <h1>New member</h1>
		</div>
		<form onSubmit={handleSubmit}>	
		  <div className={style.field}>
		    <div>
			  <h4 className={style.error}>{err.name}</h4>
		      <Input type="text" value={form.name} placeholder="Full name" onChange={input('name')} />
			</div>
			<div>
			  <h4 className={style.error}>{err.gender&&"Enter your gender"}</h4>
			  <div className={style.row}>
	            <Input type="radio" name="gender" label="Male" value="male" onChange={input('gender')} />
	            <Input type="radio" name="gender" label="Female" value="female" onChange={input('gender')}/>
	          </div>
			</div>
			<div>
				<h4 className={style.error}>{err.place || err.date_of_birth}</h4>
				<div className={style.row}>
					<Input type="text" value={form.place} placeholder="Place" onChange={input('place')}/>	
					<Input width="200px" type="date" value={form.date_of_birth} onChange={input('date_of_birth')}/>
				</div>
			</div>
			<div>
			  <h4 className={style.error}>{err.address}</h4>
	          <Input type="text" value={form.address} placeholder="Address" onChange={input('address')}/>
	        </div>
			<div>
			  <h4 className={style.error}>{err.email}</h4>
			  <Input type="text" value={form.email} placeholder="Email address" onChange={input('email')}/>
	        </div>
			<div>
			  <h4 className={style.error}>{err.password}</h4>
			  <Input type="password" value={form.password} placeholder="New password" onChange={input('password')}/>
	        </div>
			<div>
			  <Input type="text" value={form.phone_number} placeholder="Phone number" onChange={input('phone_number')}/>
	        </div>
			<div>
			  <h4 className={style.error}>{err.photo}</h4>
			  <Input type="file" onChange={input('photo')} />
		    </div>
		  </div>
		  <div className={style.bottom}>
		    <button disabled={status===reqStatus.process} type="Submit">{status===reqStatus.process?"Registring":"Register"}</button>
			<h1>Already have an account? <Link to="/login">Sign In</Link> now</h1>
		  </div>
		</form>
      </div>
	</div>
  )
}