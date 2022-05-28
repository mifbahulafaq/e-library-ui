import React from 'react';
import style from './EditMember.module.css';
import { config } from '../../config';
import {useHistory, useRouteMatch} from 'react-router-dom';
import * as validation from '../../validation';
import reqStatus from '../../utils/req-status';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../features/User/actions';

//apis
import { getSingleUser, updateEmail } from '../../api/user';
import { updateMember } from '../../api/member';

//components
import Image from '../../components/Image';
import PageTitle from '../../components/PageTitle';
import InputBorder from '../../components/InputBorder';
import Input from '../../components/Input';

import idFormatDate from '../../utils/id-format-date';

export default function EditMember(){
	const obj = {
		address:"",
		date_of_birth:"",
		email:"",
		gender:"",
		name:"",
		phone_number:"",
		photo: "",
		place: ""
	}
	const [status, setStatus] = React.useState(reqStatus.idle);
	const [form, setForm] = React.useState(obj);
	const [err, setErr] = React.useState(obj);
	const [singleMember, setSingleMember] = React.useState({});
	let { params } = useRouteMatch();
	const history = useHistory();
	const dispatch = useDispatch();
	const auth = useSelector(state=>state.auth)
	
	//date format
	let opt = {dateStyle:'short'};
	let locale = "en-CA";
	
	const styleInput = {
		width:"300px"
	}
	
	React.useEffect(()=>{
		getSingleUser(params.member_id)
		.then(({ data })=>{
			setSingleMember(data);
			
			let { member } = data;
			let temporar = member;
			
			temporar.email = data.email
			
			setForm(temporar);
		})
	},[params.member_id])
	
	const input = name=>{
		
		return function(e){
			
			const noValid = ['phone_number', 'date_of_birth', 'photo', 'address'];
			
			if(!noValid.includes(name)){
				setErr({...err, [name]:validation[name](e.target.value)});
			}

			if(name==="photo") return setForm({...form,[name]:e.target.files[0]})
			setForm({...form,[name]:e.target.value})
		}
	}
	const handleSubmit = async event=>{
		
		event.preventDefault();
		setStatus(reqStatus.process);
		
		let boolErr = false;
		
		//obj loop validation
		for(let prop in obj){
			
		  if(prop !== "photo" && prop !== "phone_number"){
			  
			const data = String(form[prop]);
			 
		    if(!data.length){
				
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
		
		//submit
		if(!boolErr){
			
		  const formData = new FormData();
		  
		  for(let key in obj){
			  
			formData.append(key,form[key]);
		  }
		  
		  updateMember(form._id,formData)
		  .then( async ({data:member})=>{
			  
			  if(member.error){
				  
				  setStatus(reqStatus.error)
				  
				  const fields = Object.keys(member.fields)
				  fields.forEach(field=>{
					  setErr({...err, [field]:member.fields[field]?.message})
				  })
				  
				  return;
				  
			  }
			if(member._id === auth.user._id) dispatch(fetchUser());
			  
				const { data : user } = await updateEmail(form._id,{email: form.email});
				
				  if(user.error){
					  
					  setStatus(reqStatus.error)
					  console.log(user)
					  const fields = Object.keys(user.fields)
					  fields.forEach(field=>{
						  setErr({...err, [field]:user.fields[field]?.message})
					  })
					  
					  return;
					  
				  }
			if(user._id === auth.user._id) dispatch(fetchUser());
				  
			  setStatus(reqStatus.idle);
			  history.push(`/member/${params.member_id}`)
		  })
		  
		}
	}
	
	return (
	  <div className={style.wrapper}>
		<PageTitle size="1.5em">Edit Member</PageTitle>
		<div className={style.contains}>
			<div className={style.detail}>
				<div className={style.img}>
					<Image src={singleMember.member?.photo?`${config.api_host}/upload/${singleMember.member.photo}`:'/image/user-image.png'}/>
				</div>
				<h3 className={style.name}>{singleMember.member?.name}</h3>
				<h3 className={style.email}>{singleMember.email}</h3>
				<h3 className={style.address}>{singleMember.member?.address}</h3>
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
						<InputBorder {...styleInput} err={err.place} value={form.place} onChange={input('place')} />
						<InputBorder 
							{...styleInput} 
							err={err.date_of_birth} 
							type="date" 
							value={idFormatDate(form.date_of_birth,locale,opt)} 
							onChange={input('date_of_birth')} 
						/>
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
						<InputBorder {...styleInput} err={err.address} value={form.address} placeholder='Phone Number' onChange={input('address')} />
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