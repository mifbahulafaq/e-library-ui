import React from 'react';
import style from './BtnBlue.module.css'


export default function BtnBlue({ children, color, tColor, ...otherProp }){
	
	return (
	<div style={{backgroundColor:color, color: tColor}} className={style.wrapper} {...otherProp} >
		{children}
	</div>
	)
}