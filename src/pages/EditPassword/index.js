import React from 'react';
import style from './EditPassword.module.css';
import {useRouteMatch} from 'react-router-dom';
import reqStatus from '../../utils/req-status';

//apis
import { updatePassword } from '../../api/user';

//components
import PageTitle from '../../components/PageTitle';
import InputBorder from '../../components/InputBorder';

export default function EditPassword(){
	const obj = {
		old_password: "",
		password: "",
		confirm_password: ""
	}
	const [status, setStatus] = React.useState(reqStatus.idle);
	const [form, setForm] = React.useState(obj);
	const [err, setErr] = React.useState(obj);
	let { params } = useRouteMatch();
	
	const styleInput = {
		width:"300px"
	}
	
	const input = name=>{
		
		return function(e){
			
			const value = e.target.value;
			//validation
			
			if(value.length > 255 || value.length < 3 ){
				setErr({...err, [name]:"Panjang password harus antara 3 - 255 karakter"});
			}else{
				setErr({...err, [name]:""});
			}
			
			switch(name){
				case "confirm_password":
				
					setErr(err=>({...err, confirm_password: value!==form.password?"Password tidak sama":err.confirm_password}));
					break;
					
				case "password":
				
					if(form.confirm_password.length){
						setErr(err=>({...err, confirm_password: form.confirm_password!==value?"Password tidak sama":err.confirm_password}));
					}
					break;
					
				default:
					setErr(err=>err);
			}
			
			//end validation
			
			//input
			setForm({...form,[name]:value})
		}
	}
	const handleSubmit = async event=>{
		
		event.preventDefault();
		setStatus(reqStatus.process);
		
		let boolErr = false;
		
		//obj loop validation
		for(let prop in obj){
			
			const data = form[prop]
			 
		    if(!data.length){
				
			  boolErr = true;
			  setStatus(reqStatus.error)
			  
			  setErr(err=>({...err, [prop]: `This field is required`}))
			}
			
		    if(err[prop].length){
				
			  boolErr = true;
			  setStatus(reqStatus.error)
			
			}
			
		}
		
		//submit
		if(!boolErr){
			
			const {confirm_password, ...payload} = form;
			
			updatePassword(params.user_id,payload)
			.then( async ({data})=>{
				
			  if(data.error){
				  
				  setStatus(reqStatus.error)
				  
				  if(data.fields){
					  
					  const fields = Object.keys(data.fields)
					  
					  fields.forEach(field=>{
						  
						  setErr({...err, [field]:data.fields[field]?.message});
						  
					  })
						return;
				  }
				  
				  setErr({...err, old_password:data.message})
				  return;
				  
			  }
			  
			  setStatus(reqStatus.success);
			  setForm(obj)
			  setTimeout(()=>{
				  setStatus(reqStatus.idle)
			  },2000)
			  
			})
		}
	}
	
	return (
	  <div className={style.wrapper}>
		<PageTitle size="1.5em">Ubah Password</PageTitle>
		<div className={style.contains}>
			<h1 style={{display:status===reqStatus.success?'initial':'none'}} className={style.success}>Password changed successfully!</h1>
			<form onSubmit={handleSubmit}>
				<div className={style.row}>
					<label>Password lama <span>*</span></label>
					<InputBorder type="password" {...styleInput} err={err.old_password} value={form.old_password} onChange={input('old_password')} />
				</div>
				<div className={style.row}>
					<label>Password baru <span>*</span></label>
					<InputBorder type="password" {...styleInput} err={err.password} value={form.password} onChange={input('password')} />
				</div>
				<div className={style.row}>
					<label>Konfirmasi Password <span>*</span></label>
					<InputBorder type="password" {...styleInput} err={err.confirm_password} value={form.confirm_password} onChange={input('confirm_password')} />
				</div>
				<div className={style.btn}>
					<button type="Submit">Ubah Password</button>
				</div>
			</form>
		</div>
	  </div>
	)
}