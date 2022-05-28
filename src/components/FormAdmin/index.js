import React from 'react';
import style from './FormAdmin.module.css';
import reqStatus from '../../utils/req-status';
import * as validation from '../../validation';

//apis
import { storeAdmin } from '../../api/admin';

//components
import InputBorder from '../../components/InputBorder';

export default function FormMember({ fetchAdmins }){
	const obj = {
		name:"",
		email:"",
		password:""
	}
	const [status, setStatus] = React.useState(reqStatus.idle);
	const [form, setForm] = React.useState(obj);
	const [err, setErr] = React.useState(obj);
	const widthInput = "65%";
	
	
	const handleSubmit = async event=>{
		event.preventDefault();
		
		setStatus(reqStatus.process);
		
		let boolErr = false;
		
		for(let prop in obj){
			  
			const data = String(form[prop]);
			 
		    if(!data.length){
				
			  boolErr = true;
			  setStatus(reqStatus.error)
			  
			  setErr(err=>({...err, [prop]: "Please fill out this field"}))
			}
			
		    if(err[prop].length){
				
			  boolErr = true;
			  setStatus(reqStatus.error)
			
			}
		}
		
		if(!boolErr){
			
		    const { data } = await storeAdmin(form);
			
			if(data.error){
			  
			  setStatus(reqStatus.error)
			  
			  const fields = Object.keys(data.fields)
			  fields.forEach(field=>{
				  setErr({...err, [field]:data.fields[field]?.message})
			  })
			  
			  return;
			  
			}
			
		  fetchAdmins();
		  setStatus(reqStatus.idle);
		  setForm(obj);
		  
		}
	}
	
	const input = name=>{
		return function(e){
			
			if(e.target.value.length){
				setErr({...err, [name]:validation[name](e.target.value)});
			}else{
				setErr({...err, [name]:""});
			}
			
		  
			if(name==="photo") return setForm({...form,[name]:e.target.files[0]})
			setForm({...form,[name]:e.target.value})
		}
	}
	
	function cancelSubmit(){
		setForm(obj)
	}
	
	return (
		<form className={style.form} onSubmit={handleSubmit}>
			  <div className={style.row}>
				<label htmlFor="nama"><strong>Nama</strong></label>
				<InputBorder width={widthInput} id="nama" err={err.name} value={form.name} onChange={input('name')} />
			  </div>
			  <div className={style.row}>
				<label htmlFor="email"><strong>Email</strong></label>
				<InputBorder width={widthInput} id="email" err={err.email} value={form.email} onChange={input('email')} />
			  </div>
			  <div className={style.row}>
				<label htmlFor="password"><strong>Password</strong></label>
				<InputBorder type="password" width={widthInput} id="password" err={err.password} value={form.password} onChange={input('password')} />
			  </div>
			  <div className={style.btn}>
				<button className={style.add} disabled={status===reqStatus.process} type="submit">
				{status===reqStatus.process?"Adding..":"Add"}
				</button>
				<button className={style.remove} onClick={cancelSubmit} type="reset" >Remove</button>
			  </div>		  
		</form>
	)
}

/*TableRow.propTypes = {
	column: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired
}*/