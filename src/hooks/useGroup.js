import React, {useState, useMemo } from 'react';

export default function useGroup(initialState = [], field= ''){
	
	const [state, setState] = useState(initialState);
	
	return useMemo(()=>{
		
		let datas =  state.reduce((total,cv,ci,arr)=>{
			
			for(let i = 0; i<total.length; i++){
					
				if(total[i][0][field]._id === cv[field]._id){
					total[i].push(cv);
					return total;
				}
			}
			return [...total,[cv]]
		},[])
		
		return [datas, setState];
	}, [JSON.stringify(state), field])	
	
}
