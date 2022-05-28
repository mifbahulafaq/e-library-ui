import React from 'react';
import { } from 'react-router-dom';
import style from './Book.module.css';
import { config } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reqStatus from '../../utils/req-status';
import * as validation from '../../validation';

//components
import Image from '../../components/Image';
import Pagination from '../../components/Pagination';
import Select from '../../components/Select';
import InputBorder from '../../components/InputBorder';
import SearchInput from '../../components/SearchInput';

//pages
import CategoryPage from '../Category';
import RackPage from '../Rack';

//APIs
import { getBooks, storeBook, getSingleBook, updateBook, deleteBook } from '../../api/book';
import { getRacks } from '../../api/rack';
import { getCategories } from '../../api/category';

import { book as bookReducer } from './reducer'; 



export default function Book(){
	
	let initialState = {
	data:[],
	params:{
		skip: 0,
		limit: 5,
		q: ""
	},
	page:1,
	count:0
	};
	
	const obj = {
		title:"",
		author:"",
		publisher:"",
		stock:"",
		image:"",
		category:"",
		rack:""
	}
	
	//STATE
	const [formInput, setFormInput] = React.useState("book")
	const [status, setStatus] = React.useState(reqStatus.idle);
	const [form, setForm] = React.useState(obj);
	const [err, setErr] = React.useState(obj);
	const [books, dispatch] = React.useReducer(bookReducer,initialState);
	const [categRack, setCategRack] = React.useState({categ: [], rack: []});
	const [edit, setEdit] = React.useState(false);
	
	
	const fetchBooks = React.useCallback(async function(){
		const {data: db} = await getBooks(books.params);
		
		dispatch({type: 'INITIAL_FETCHING', data:db})
	},[books.params])
	
	React.useEffect(()=>{
		fetchBooks();
	},[fetchBooks])
	
	const fetchCatRack = React.useCallback(async ()=>{
		const [{data: dc},{data: dr}] = await Promise.all([
		  getCategories(),
		  getRacks()
		]);
		
		setCategRack({categ: dc, rack: dr});
	},[])
	
	React.useEffect(()=>{
		fetchCatRack()
	},[fetchCatRack])
	
	const handleSubmit = async event=>{
		
		event.preventDefault();
		setStatus(reqStatus.process);
		
		let boolErr = false;
		
		for(let prop in obj){
			
		  if(prop !== "image"){
			 
			const data = String(form[prop]);
			 
		    if(!data.length || form[prop] == null){
				
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
		  
		  for(let key in obj){
			  
			if(typeof(form[key])==='object' && key !== 'image' && form[key] !== null ){
			  formData.append(key,form[key]._id);
			  
			}else{
				
			  formData.append(key,form[key]);
			
			}
		  }
		  
		  let result;
		  
		  if(edit){
			  
		    const { data } = await updateBook(form._id,formData);
			result = data;
			
		  }else{
			  
		    const { data } = await storeBook(formData);
			result = data;
			
		  }
		  
		  if(result.error){
			  
			  setStatus(reqStatus.error)
			  const fields = Object.keys(result.fields)
			  fields.forEach(field=>{
				  setErr({...err, [field]:result.fields[field]?.message})
			  })
			  
			  return;
			  
		  }
		  
		  setEdit(false);
		  fetchBooks();
		  setStatus(reqStatus.idle);
		  setForm(obj);
			event.target.reset();
		}
	}
	
	const input = name=>{
		
		return function(e){
			
		  setErr({...err, [name]:validation[name](e.target.value)});
		  
		  if(name==="image" && e.target.files.length){
			  return setForm({...form,[name]:e.target.files[0]})
		  } 
		  setForm({...form,[name]:e.target.value})
		}
	}
	
	async function clickEdit(id){
		setEdit(true)
		setFormInput('book')
		const { data } = await getSingleBook(id);
		setForm({...obj,...data});
		setErr(obj);
	}
	
	function cancelSubmit(){
		if(edit) setEdit(false);
		setForm(obj)
	}
	async function clickDelete(id){
		await deleteBook(id);
		fetchBooks();
	}
	
	const elementFormInput = {
		book : <form className={style.formBook} onSubmit={handleSubmit}>
			  <div className={style.row}>
				<label htmlFor="title"><strong>Title</strong></label>
				<InputBorder width="70%" id="title" err={err.title} value={form.title} onChange={input('title')} />
			  </div>
			  <div className={style.row}>
				<label htmlFor="author"><strong>Author</strong></label>
				<InputBorder width="70%" id="author" err={err.author} value={form.author} onChange={input('author')} />
			  </div>
			  <div className={style.row}>
				<label htmlFor="publisher"><strong>Publisher</strong></label>
				<InputBorder width="70%" id="publisher" err={err.publisher} value={form.publisher} onChange={input('publisher')} />
			  </div>
			  <div className={style.row}>
				<label htmlFor="stock"><strong>Stock</strong></label>
				<InputBorder width="70%" id="stock" type="Number" err={err.stock} value={form.stock} onChange={input('stock')} />
			  </div>
			  <div className={style.row}>
				<label htmlFor="image"><strong>Image</strong></label>
				<div style={{width:'70%'}}>
				<InputBorder id="image" type="file" err={err.image} onChange={input('image')} />
				<label className={style.dataImage} style={{display:form.image&&edit?'block':'none'}} ><strong>{form.image.length?form.image:''}</strong></label>
				</div>
			  </div>
			  <div className={style.row}>
				<div className={style.column}>
				  <label><strong>Category</strong></label>
				  <label><strong>Rack</strong></label>
				</div>
				<div className={style.column}>
				  <h1 className={style.error}>{err.category}</h1>
				  <select value={form.category?form.category._id||form.category:""} onChange={input('category')}>
					<option value="" >--Choose--</option>
					{
						categRack.categ.map((e,i)=>{
							return <option  value={e._id} key={i}>{e.name}</option>
						})
					}
				  </select>
				  <h1 className={style.error}>{err.rack}</h1>
				  <select value={form.rack?form.rack._id||form.rack:""} onChange={input('rack')}>
					<option value="">--Choose--</option>
					{
						categRack.rack.map((e,i)=>{
						  return <option value={e._id} key={i}>{e.name}</option>
						})
					}
				  </select>
				</div>
			  </div>
			  <div className={style.btn}>
				<button 
					className={style.add} 
					disabled={status===reqStatus.process} 
					type="submit">
				{status===reqStatus.process?"Adding..":edit?"Edit":"Add"}
				</button>
				<button className={style.remove} onClick={cancelSubmit} type="reset" >{edit?"Cancel":"Remove"}</button>
			  </div>		  
			</form>,
			
		category : <CategoryPage fetchCatRack={fetchCatRack} />,
		rack: <RackPage fetchCatRack={fetchCatRack} />
		
	}
	
	return (
	  <div className={style.container}>
	    <div className={style.book}>
		  <div className={style.top}>
		    <SearchInput 
				value={books.params.q} 
				onChange={e=>dispatch({type:'SEARCH',q:e.target.value})} 
				reset={()=>dispatch({type:'SEARCH',q:''})} 
			/>
		    <div className={style.filter}>
				<Select name="Category" onChange={e=>dispatch({type:'CATEGORY',category:e.target.value})} items={categRack.categ} />
				<Select name="Rack" onChange={e=>dispatch({type:'RACK',rack:e.target.value})} items={categRack.rack} />
		    </div>
		  </div>
		  <div className={style.tableWrapper}>
	        <table>
		      <thead>
		        <tr>
		          <th>Title</th>
		          <th>Author</th>
		          <th>Publisher</th>
		          <th>Stock</th>
		          <th>Image</th>
		          <th>Category</th>
		          <th>Rack</th>
		          <th></th>
		        </tr>
		      </thead>
		      <tbody>
		      {
			    books.data.map((b,i)=><tr key={i}>
		          <td>{b.title}</td>
		          <td>{b.author}</td>
		          <td>{b.publisher}</td>
		          <td>{b.stock}</td>
		          <td className={style.bookImage}><div><Image src={`${config.api_host}/upload/${b.image}`} /></div></td>
		          <td>{b.category?.name}</td>
		          <td>{b.rack?.name}</td>
		          <td>
				    <FontAwesomeIcon icon="trash-alt" onClick={()=>clickDelete(b._id)} title="delete"/>
					<FontAwesomeIcon icon="edit" onClick={()=>clickEdit(b._id)} title="edit" />
				  </td>
		        </tr>)
		      }
		    
		      </tbody>
		    </table>
		  </div>
		  <div className={style.pagin}>
			<Pagination 
				changeSkip={page=>dispatch({type:'SKIP',page})}
				displayedData={books.params.limit} 
				totalData={books.count}
				currentPage={books.page}
			/>
		  </div>
		</div>
		
		<div className={style.formWrapper}>
			<ul className={style.formNav}>
			  <li className={formInput==="book"?style.active:""} onClick={()=>setFormInput("book")}>Book</li>
			  <li className={formInput==="category"?style.active:""} onClick={()=>setFormInput("category")}>Category</li>
			  <li className={formInput==="rack"?style.active:""} onClick={()=>setFormInput("rack")}>Rack</li>
			</ul>
			<div className={style.formContent}>
			  {elementFormInput[formInput]}
			</div>
		</div>	 
	  </div>
	)
}