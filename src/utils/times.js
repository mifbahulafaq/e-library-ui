const jamak = (value)=>value>1?'s':'';

export default function times(value){
	const minute = Math.floor(value / 60000);
	const hour = Math.floor(minute / 60)
	const day = Math.floor(hour / 24)
	return day?`${day} day${jamak(day)}`:hour?`${hour} hr${jamak(hour)}`:`${minute} min${jamak(minute)}`;
	
}
