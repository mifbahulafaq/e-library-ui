import React from 'react';
import style from './Select.module.css';
import PropTypes from 'prop-types';

function Select({ onChange, items, name }){
	return (
	  <div className={style.selectBox}>
	    <select onChange={onChange} >
		  <option value="" >{name}</option>
		  {items?.map((data,i)=><option value={data._id} key={i} >{data.name}</option>)}
		</select>
		<span className={style.arrow}></span>
	  </div>
	)
}

Select.propTypes = {
	items: PropTypes.array.isRequired
}

export default Select