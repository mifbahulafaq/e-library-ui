import React from 'react';
import { } from 'react-router-dom';
import style from './Category.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//APIs
import { getCategories, storeCategory, getSingleCategory, updateCategory, deleteCategory } from '../../api/category';

export default function Category({fetchCatRack}){
	
	const [editCateg, setEditCateg] = React.useState(false);
	const [formCategory, setFormCategory] = React.useState({name:""});
	const [categories, setCategories] = React.useState([]);
	const [filterCategory, setFilterCategory] = React.useState({q:''});
	
	const fetchCategories = React.useCallback(async ()=>{
		
		const { data } = await getCategories(filterCategory);
		setCategories(data);
		
	},[filterCategory])
	
	React.useEffect(()=>{
		fetchCategories()
	},[fetchCategories])
	
	const clickAddCateg = async ()=>{
		if(!formCategory.name.length) return;
		if(editCateg){
			await updateCategory(formCategory._id, {name: formCategory.name});
		}else{
			
			await storeCategory({name: formCategory.name});
		}
		fetchCategories();
		fetchCatRack();
		setEditCateg(false);
		setFormCategory({name:''});
	}
	
	async function clickEditCateg(id){
		setEditCateg(true)
		const { data } = await getSingleCategory(id);
		setFormCategory(d=>({...d,...data}));
	}
	
	return (
			<div className={style.formRackCategory}>
			  <div className={style.searchRackCategory}>
					<input value={filterCategory.q} onChange={e=>setFilterCategory({q: e.target.value})}  type="text" placeholder="Search..." />
					<span onClick={()=>setFilterCategory({})}>x</span>
			  </div>
			  <div className={style.tableRackCategory}>
			    <table>
				  <tbody>
				  {
					categories.map((b,i)=><tr key={i}>
					<td>{i+1}</td>
						<td>{b.name}</td>
						<td>
						  <FontAwesomeIcon onClick={async ()=>{
							  await deleteCategory(b._id);
							  fetchCatRack();
							  fetchCategories();
						  }} icon="trash-alt" title="delete"/>
						  <FontAwesomeIcon onClick={_=>clickEditCateg(b._id)} icon="edit" title="edit" />
						</td>
					</tr>)
				  }
				
				  </tbody>
			    </table>
				<div className={style.addRackCategory}>
				  <input value={formCategory.name} onChange={e=>{
					  if(e.target.value==="") setEditCateg(false)
					  setFormCategory(d=>({...d,name:e.target.value}))
				  }} />
				  <div onClick={clickAddCateg}>{editCateg?"Edit":"Add"}</div>
				</div>
			  </div>	
			</div>
	)
}