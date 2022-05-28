import React from 'react';
import style from './Title.module.css';
import { config } from '../../config';

export default function SiteTitle({size}){
	return <h1 style={{fontSize:size}} className={style.title}>{config.site_title}</h1>
}