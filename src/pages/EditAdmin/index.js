import React from 'react';
import style from './EditAdmin.module.css';
import {useRouteMatch} from 'react-router-dom';
import * as validation from '../../validation';
import reqStatus from '../../utils/req-status';
import { useSelector ,useDispatch } from 'react-redux';
import { fetchUser } from '../../features/User/actions';

//apis
import { getSingleUser } from '../../api/user';
import { updateAdmin } from '../../api/admin';

//components
import PageTitle from '../../components/PageTitle';
import InputBorder from '../../components/InputBorder';

export default function EditAdmin(){
const obj = {
		name: "",
		email: "",
		password: "",
		confirm_password: ""
	}
	const dispatch = useDispatch();
	const auth = useSelector(state=>state.auth);
	const [status, setStatus] = React.useState(reqStatus.idle);
	const [form, setForm] = React.useState(obj);
	const [err, setErr] = React.useState(obj);
	const [singleAdmin, setSingleAdmin] = React.useState({});
	let { params } = useRouteMatch();
	const widthInput = "80%";
	
	const fetchAdmin = React.useCallback(async function(formEmpty){

		getSingleUser(params.admin_id)
		.then(({ data })=>{
			setSingleAdmin(data);
			
			let { role, _id, ...payload } = data;
			
			setForm(form=>{
				let a = formEmpty?formEmpty:form;
				return {...a,...payload}
			});
		})
	},[params.admin_id])
	
	React.useEffect(()=>{
		fetchAdmin();
	},[fetchAdmin])
	
	const input = name=>{
		
		return function(e){
			
			const value = e.target.value;
			//validation
			
			if(value.length){
				
				setErr({...err, [name]:name==="confirm_password"?"":validation[name](value)});
				
				switch(name){
					case "confirm_password":
					
						setErr(err=>({...err, confirm_password: value!==form.password?"Password tidak sama":err.confirm_password}));
						break;
						
					case "password":
					
						if(form.confirm_password.length){
							setErr(err=>({...err, confirm_password: form.confirm_password!==value?"Password tidak sama":""}));
						}
						break;
						
					default:
						setErr(err=>err);
				}
			}else{
				setErr({...err, [name]:""});
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
			
			if(prop !== "password" && prop !== "confirm_password"){
			 
				if(!data.length){
					
				  boolErr = true;
				  setStatus(reqStatus.error)
				  
				  setErr(err=>({...err, [prop]: `This field is required`}))
				}
			}
			
		    if(err[prop].length){
				
			  boolErr = true;
			  setStatus(reqStatus.error)
			
			}
			
		}
		
		//submit
		if(!boolErr){
			let {confirm_password, ...payload } =  form;
			if(!form.password.length) delete payload.password;
			
			updateAdmin(params.admin_id,payload)
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
				  
			  }
			  
			if(data._id === auth.user._id) dispatch(fetchUser());
			  
			  setStatus(reqStatus.success);
			  fetchAdmin(obj);
			  setTimeout(()=>{
				  setStatus(reqStatus.idle)
			  },2000)
			  
			})
		}
	}
	
	return (
	  <div className={style.wrapper}>
		<PageTitle size="1.5em">Edit Admin Profil</PageTitle>
		<div className={style.contains}>
			<div className={style.top}> Edit Profil </div>
			<div className={style.formWrapper}>
				<h1 style={{display:status===reqStatus.success?'block':'none'}} className={style.success}>Account changed successfully!</h1>
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
				  <div className={style.row}>
					<label htmlFor="confirm_password"><strong>Ulangi Password</strong></label>
					<InputBorder type="password" width={widthInput} err={err.confirm_password} id="confirm_password" value={form.confirm_password} onChange={input('confirm_password')} />
				  </div>
				  <div className={style.btn}>
					<button className={style.add} disabled={status===reqStatus.process} type="submit">
					{status===reqStatus.process?"Updating..":"Update"}
					</button>
				  </div>		  
				</form>
			</div>
			
		</div>
	  </div>
	)
}