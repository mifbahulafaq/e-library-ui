import React from 'react';
import style from './Input.module.css';

export default function TextInput({label, value, height, width, ...props}){
	
	if(props.type === "radio") return(
	  <div style={{height, width}} className={style.radioWrapper}>
	    <label htmlFor={value}>{label}</label>
		<input id={value} value={value} {...props} />
	  </div>
	)
	return <input style={{width}} className={style.input} value={value} {...props} />
}

TextInput.defaultProps = {
	height: "initial"
}