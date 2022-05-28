import React from 'react';
import style from './SearchInput.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';


export default function SearchInput({value, onChange, reset}){
	
	return (
		<div className={style.wrapper}>
			<form>
				<input value={value} onChange={onChange} type="text" placeholder="Search..." className={style.bookSearch} />
				<button onClick={reset} type='button'>
					<FontAwesomeIcon icon={["far","times-circle"]}/>
				</button>
			</form>
		</div>
	)
}


SearchInput.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	reset: PropTypes.func
}