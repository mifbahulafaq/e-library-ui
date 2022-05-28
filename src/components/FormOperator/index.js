import React from 'react';
import style from './FormOperator.module.css';
import reqStatus from '../../utils/req-status';
import * as validation from '../../validation';

//apis
import { store } from '../../api/operator';

//components
import InputBorder from '../../components/InputBorder';
import Input from '../../components/Input';

export default function FormMember({ fetchOperators }){
	const obj = {
		name:"",
		gender:"",
		address:"",
		email:"",
		password:"",
		phone_number:"",
		photo: ""
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
			
		  if(prop !== "photo" && prop !== "phone_number"){
			  
			const data = String(form[prop]);
			 
		    if(!data.length || form[prop] == null){
				
			  boolErr = true;
			  setStatus(reqStatus.error)
			  
			  setErr(err=>({...err, [prop]: "Please fill out this field"}))
			}
			
		    if(err[prop].length){
				
			  boolErr = true;
			  setStatus(reqStatus.error)
			
			}
			
		  }
		}
		
		if(!boolErr){
			
			const formData = new FormData();
		  
			for(let key in obj){
			  
				formData.append(key,form[key]);
			  
			}
			
		    const { data } = await store(formData);
			
			if(data.error){
			  
			  setStatus(reqStatus.error)
			  
			  const fields = Object.keys(data.fields)
			  fields.forEach(field=>{
				  setErr({...err, [field]:data.fields[field]?.message})
			  })
			  
			  return;
			  
			}
			
		  fetchOperators();
		  setStatus(reqStatus.idle);
		  setForm(obj);
		  
		}
	}
	
	const input = name=>{
		return function(e){
			
			if( name !== "phone_number" && name !== "photo"){
				if(e.target.value.length){
					setErr({...err, [name]:validation[name](e.target.value)});
				}else{
					setErr({...err, [name]:""});
				}
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
				<label><strong>Jenis Kelamin</strong></label>
				<div style={{width:widthInput}} className={style.column}>
					<h1 className={style.error}>{err.gender}</h1>
					<div className={style.radio}>
						<Input type="radio" name="gender" label="Male" value="male" onChange={input('gender')} />
						<Input type="radio" name="gender" label="Female" value="female" onChange={input('gender')}/>
					</div>
				</div>
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
				<label htmlFor="address"><strong>Address</strong></label>
				<InputBorder width={widthInput} id="address" err={err.address} value={form.address} onChange={input('address')} />
			  </div>
			  <div className={style.row}>
				<label htmlFor="phone_number"><strong>Nomor telepon</strong></label>
				<InputBorder width={widthInput} id="phone_number" err={err.phone_number} value={form.phone_number} onChange={input('phone_number')} />
			  </div>
			  <div className={style.row}>
				<label htmlFor="photo"><strong>Foto</strong></label>
				<div style={{width:widthInput}}>
					<InputBorder id="photo" type="file" err={err.photo} onChange={input('photo')} />
				</div>
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