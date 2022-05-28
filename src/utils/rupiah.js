function rupiah(value = 0){
	const strFormat = value.toString();
	//take numbers
	const takeNumbers = strFormat.replace(/[^0-9]/g, "");
	
	let arrValue = [...takeNumbers];
	let sisaBagiLength = arrValue.length % 3;
	const dapatDibagi = arrValue.slice(sisaBagiLength,arrValue.length);
	let a = 3;
	
	let dibagiRupiah = dapatDibagi.reduce((total,cv,ci,arr)=>{
		
		if(ci+1 === a && a < dapatDibagi.length){
			a+=3
			return [...total, cv, '.']
		}
		return [...total, cv];
	},[])
	
	dibagiRupiah = dibagiRupiah.join('');
		
	let sisaBagi = arrValue.slice(0,sisaBagiLength);
	sisaBagi = sisaBagi.join('');
	
	return `${sisaBagi}${sisaBagi && dibagiRupiah ? `.` : ''}${dibagiRupiah}`;
	
	//return value;
}

export default rupiah