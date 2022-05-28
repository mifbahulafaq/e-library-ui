import React from 'react';
import { } from 'react-router-dom';
import style from './Rack.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//APIs
import { getRacks, storeRack, getSingleRack, updateRack, deleteRack  } from '../../api/rack';

export default function Category({ fetchCatRack }){
	const [editRack, setEditRack] = React.useState(false);
	const [formRack, setFormRack] = React.useState({name:""});
	const [racks, setRacks] = React.useState([]);
	const [filterRack, setFilterRack] = React.useState({q:''});
	
	const fetchRacks = React.useCallback(async ()=>{
		
		const { data } = await getRacks(filterRack);
		setRacks(data);
		
	},[filterRack])
	
	React.useEffect(()=>{
		fetchRacks()
	},[fetchRacks])
	
	async function clickEditRack(id){
		setEditRack(true)
		const { data } = await getSingleRack(id);
		setFormRack(d=>({...d,...data}));
	}
	
	const clickAddRack = async ()=>{
		if(!formRack.name.length) return;
		if(editRack){
			await updateRack(formRack._id, {name: formRack.name});
		}else{
			await storeRack({name: formRack.name});
		}
		fetchRacks();
		fetchCatRack();
		setEditRack(false);
		setFormRack({name:''});
	}
	
	return (
			<div className={style.formRackCategory}>
			  <div className={style.searchRackCategory}>
					<input value={filterRack.q} onChange={e=>setFilterRack({q: e.target.value})}  type="text" placeholder="Search..." />
					<span onClick={()=>setFilterRack({})}>x</span>
			  </div>
			  <div className={style.tableRackCategory}>
			    <table>
				  <tbody>
				  
				  {
					racks.map((b,i)=><tr key={i}>
					<td>{i+1}</td>
						<td>{b.name}</td>
						<td>
						  <FontAwesomeIcon onClick={async ()=>{
							  await deleteRack(b._id);
							  fetchCatRack();
							  fetchRacks();
						  }} icon="trash-alt" title="delete"/>
						  <FontAwesomeIcon onClick={_=>clickEditRack(b._id)} icon="edit" title="edit" />
						</td>
					</tr>)
				  }
				  </tbody>
			    </table>
				<div className={style.addRackCategory}>
				  <input value={formRack.name} onChange={e=>{
					  if(e.target.value==="") setEditRack(false)
					  setFormRack(d=>({...d,name:e.target.value}))
				  }} />
				  <div onClick={clickAddRack}>{editRack?"Edit":"Add"}</div>
				</div>
			  </div>	
			</div>
	)
}