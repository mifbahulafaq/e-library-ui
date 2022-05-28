import React from 'react';
import style from './NamePage.module.css';

export default function NamePage({title}){
	
	return (
		<div className={style.wrapper}>
			<h3>{title}</h3>
		</div>
	)
}