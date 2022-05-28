export default function upperCase(value){
	
	let [firstLetter,...remains] = value;
	firstLetter = firstLetter.toUpperCase();
	
	return [firstLetter,...remains].join('');
	
}
