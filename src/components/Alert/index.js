import React from 'react';
import style from './Alert.module.css';
import PropTypes from 'prop-types';

export default function Alert({message, type, crossIcon}){
	
	return <div className={`${style.alertWrapper} ${style[type]}`}>
		<h1>{message}</h1>
		<div onClick={crossIcon} className={style.circleCancle}>x</div>
	</div>
}

Alert.defaultProps = {
	type: 'simple'
}

Alert.propTypes = {
	crossIcon: PropTypes.func,
	type: PropTypes.string,
	message: PropTypes.string
}