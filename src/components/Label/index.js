import React from 'react';
import style from './Label.module.css';
import PropTypes from 'prop-types';

export default function Label({children, type, crossIcon}){
	
	return <div className={`${style.labelWrapper} ${style[type]}`}>
		{children}
	</div>
}

Label.defaultProps = {
	type: 'simple'
}

Label.propTypes = {
	type: PropTypes.string
}