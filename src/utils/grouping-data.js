export default function groupingData(data, fieald){
	return data.reduce((total,cv,ci,arr)=>{

		for(let i = 0; i<total.length; i++){
				
			if(total[i][0][fieald]._id === cv[fieald]._id){
				total[i].push(cv);
				return total;
			}
		}
		return [...total,[cv]]
	},[])	
}
