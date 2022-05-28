import React from 'react';
import style from './Pagination.module.css';
import PropTypes from 'prop-types';

const Pagination = ({changeSkip, displayedData, totalData, currentPage})=>{
	const pages = Math.ceil(totalData / displayedData) 
	const templates = {
		pageNumber : {backgroundColor:'#05f2c7', color:"#fff"},
		nextPrevious : {color:'#cccccc'} 
	}
	
	return(
	  <div className={style.wrapper}>
		<ul>
			<li onClick={()=>changeSkip(1)} >First</li>
			<li 
				onClick={()=>{
					if(currentPage===1) return;
					changeSkip(currentPage-1)
				}}
				style={currentPage===1?templates.nextPrevious:{}}
			>
			Previous
			</li>
			{
				(function(p){
					
				  let i = 1;
				  let arr = [];
				  
				  const func = ()=>{
					  
					  if(i<=p){
						  
						  let page = i
						  
						  arr.push(<li onClick={()=>changeSkip(page)} style={currentPage===page?templates.pageNumber:{}} key={i}>{i}</li>)
						  i++
						  func(p)
					  }
				  }
				  
				  func(p)
				  return arr
				  
				})(pages)
			}
			<li 
			onClick={()=>{
				if(currentPage===pages) return;
				changeSkip(currentPage+1)
			}}
			style={currentPage===pages?templates.nextPrevious:{}}
			>
			Next
			</li>
			<li onClick={()=>changeSkip(pages)} >Last</li>
		</ul>
	  </div>
	)
}

Pagination.propTypes = {
	changeSkip: PropTypes.func.isRequired,
	displayedData: PropTypes.number.isRequired,
	totalData: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
}

export default Pagination;