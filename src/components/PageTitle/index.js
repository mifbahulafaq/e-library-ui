import React from 'react';
import style from './PageTitle.module.css';
import PropTypes from 'prop-types';

export default function PageTitle({size, children}){
	return <h1 style={{fontSize:size}} className={style.title}>{children}</h1>
}

PageTitle.defaultProps = {
	size: "initial"
}
PageTitle.propTypes = {
	width: PropTypes.string
}