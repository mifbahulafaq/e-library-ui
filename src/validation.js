export function title(value){
	
	return value.length < 3 || value.length > 255
	? "your title is less than 3 char or more than 255"
	: ""
}
export function name(value){
	
	return value.length < 3 || value.length > 255
	? "your name is less than 3 char or more than 255"
	: ""
}
export function gender(value){
	
	return value.length?"":"Enter your gender"
}
export function date_of_birth(value){
	
	return value.length?"":"Enter your date of birth"
}
export function place(value){
	
	return value.length > 255 ? "what you entered is more than 255 char" : ""
}
export function password(value){
	
	return value.length > 255 || value.length < 5 ? "your password is less than 5 char or more than 255" : ""
}
export function address(value){
	
	return value.length > 1000 ? 'The maximum length of address is 1000 characters' : ""
}
export function email(value){
	
	const emailRx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
	
	return !emailRx.test(value) ? "email must be a valid email" : ""
}
export function author(value){
	
	return value.length < 3 || value.length > 255
	? "your author is less than 3 char or more than 255"
	: ""
}
export function publisher(value){
	
	return value.length < 3 || value.length > 255
	? "your publisher is less than 3 char or more than 255"
	: ""
}
export function stock(value){
	
	return  ""
}
export function category(value){
	
	return ""
}
export function rack(value){
	
	return ""
}
export function image(value){
	
	return ""
}
