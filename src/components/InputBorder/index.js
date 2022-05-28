import React from 'react';
import style from './InputBorder.module.css';
import PropTypes from 'prop-types';

export default function InputBorder({ width, height, err,...prop}){
	
	return (
		<div style={{width:width}} className={style.inputWrapper}>
			<h1>{err}</h1>
			<input style={{height:height}} {...prop}  />
		</div>
	)
}

InputBorder.defaultProps = {
	width: "100%",
	height: "initial"
}
InputBorder.propTypes = {
	onChange: PropTypes.func,
	width: PropTypes.string,
	placeholder: PropTypes.string,
	err: PropTypes.string
}
