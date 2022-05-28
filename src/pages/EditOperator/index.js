import React from 'react';
import style from './EditOperator.module.css';
import { config } from '../../config';
import {useHistory, useRouteMatch} from 'react-router-dom';
import * as validation from '../../validation';
import reqStatus from '../../utils/req-status';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../features/User/actions';

//apis
import { getSingleUser, updateEmail } from '../../api/user';
import { updateOperator } from '../../api/operator';

//components
import Image from '../../components/Image';
import PageTitle from '../../components/PageTitle';
import InputBorder from '../../components/InputBorder';
import Input from '../../components/Input';

export default function EditOperator(){
	const obj = {
		address:"",
		email:"",
		gender:"",
		name:"",
		phone_number:"",
		photo: ""
	}
	const [status, setStatus] = React.useState(reqStatus.idle);
	const [form, setForm] = React.useState(obj);
	const [err, setErr] = React.useState(obj);
	const [singleOperator, setSingleOperator] = React.useState({});
	let { params } = useRouteMatch();
	const history = useHistory();
	const dispatch = useDispatch();
	const auth = useSelector(state=>state.auth);
	
	const styleInput = {
		width:"300px"
	}
	
	React.useEffect(()=>{
		getSingleUser(params.operator_id)
		.then(({ data })=>{
			setSingleOperator(data);
			
			let { operator } = data;
			let temporar = operator;
			
			temporar.email = data.email
			
			setForm(temporar);
		})
	},[params.operator_id])
	
	const input = name=>{
		
		return function(e){
			
			const noValid = ['phone_number', 'photo'];
			
			if(!noValid.includes(name)){
				
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
	const handleSubmit = async event=>{
		
		event.preventDefault();
		setStatus(reqStatus.process);
		
		let boolErr = false;
		const noValid = ['phone_number', 'photo'];
		
		//obj loop validation
		for(let prop in obj){
			
			
		  if(!noValid.includes(prop)){
			  
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
		}
		
		//submit
		if(!boolErr){
			
		  const formData = new FormData();
		  
		  for(let key in obj){
			  
			formData.append(key,form[key]);
		  }
		  
		  updateOperator(form._id,formData)
		  .then( async ({data:operator})=>{
			  
			  if(operator.error){
				  
				  setStatus(reqStatus.error)
				  
				  const fields = Object.keys(operator.fields)
				  fields.forEach(field=>{
					  setErr({...err, [field]:operator.fields[field]?.message})
				  })
				  
				  return;
				  
			  }
			  
			
				if(operator._id === auth.user._id) dispatch(fetchUser());
			  
				const { data : user } = await updateEmail(form._id,{email: form.email});
				
				  if(user.error){
					  
					  setStatus(reqStatus.error)
					  
					  const fields = Object.keys(user.fields)
					  fields.forEach(field=>{
						  setErr({...err, [field]:user.fields[field]?.message})
					  })
					  
					  return;
					  
				  }
			
				if(user._id === auth.user._id) dispatch(fetchUser());
				  
			  setStatus(reqStatus.idle);
			  history.push(`/user/operator/${params.operator_id}`)
		  })
		  
		}
	}
	console.log('render')
	return (
	  <div className={style.wrapper}>
		<PageTitle size="1.5em">Edit Operator</PageTitle>
		<div className={style.contains}>
			<div className={style.detail}>
				<div className={style.img}>
					<Image src={singleOperator.operator?.photo?`${config.api_host}/upload/${singleOperator.operator.photo}`:'/image/user-image.png'}/>
				</div>
				<h3 className={style.name}>{singleOperator.operator?.name}</h3>
				<h3 className={style.email}>{singleOperator.email}</h3>
				<h3 className={style.address}>{singleOperator.operator?.address}</h3>
			</div>
			<div className={style.editForm}>
				<form onSubmit={handleSubmit}>
					<div className={style.row}>
						<InputBorder {...styleInput} err={err.name} value={form.name} onChange={input('name')} />
						<div style={{width:'300px'}} className={style.column}>
							<h1 className={style.error}>{err.gender}</h1>
							<div className={style.radio}>
								<Input checked={form.gender==="male"} height="35px" type="radio" name="gender" label="Male" value="male" onChange={input('gender')} />
								<Input checked={form.gender==="female"} height="35px" type="radio" name="gender" label="Female" value="female" onChange={input('gender')} />
							</div>
						</div>
					</div>
					<div className={style.row}>
						<InputBorder {...styleInput} value={form.phone_number} placeholder='Phone Number' onChange={input('phone_number')} />
						<InputBorder 
							{...styleInput}
							type="file"
							onChange={input('photo')} 
						/>
					</div>
					<div className={style.row}>
						<InputBorder {...styleInput} err={err.address} placeholder='Address' value={form.address} onChange={input('address')} />
						<InputBorder 
							{...styleInput} 
							err={err.email} 
							value={form.email} 
							onChange={input('email')} 
						/>
					</div>
					
					<div className={style.btn}>
						<button type="Submit">Save changes</button>
					</div>
				</form>
			</div>
		</div>
	  </div>
	)
}