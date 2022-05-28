import React from 'react';
import style from './Image.module.css'

export default function Image({name, src}){
	return <img className={style.img} alt={name} src={src} />
}