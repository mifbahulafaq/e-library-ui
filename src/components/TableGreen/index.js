import React from 'react';
import style from './TableGreen.module.css';
import PropTypes from 'prop-types';


export default function TableGreen({ column, data, sameData, highlightData }){
	
	return (
	  <div className={style.tableWrapper}>
	        <table>
		      <thead>
		        <tr>
				{
					column.map(({header, width},i)=><th width={width?width:'initial'} key={i}>{header}</th>)
				}
		        </tr>
		      </thead>
		      <tbody>
		      {
				
				data.map((data,indexData)=>{
					
					let rowClass = "";
					sameData.forEach(e=>{
						
						if(data.detail_circulation._id===e._id && e.read && data.status===e.status ) rowClass = style.goldRow;
					})
					
					highlightData.forEach(e=>{
						
						if(data._id===e._id ) rowClass = style.redRow;
					})
					
					return <tr key={indexData} className={rowClass}>
						{
							column.map(({Content},i)=>{
								return <td key={i}><Content indexRow={indexData} data={data} /></td>
							})
						}
					</tr>
				})

		      }
		    
		      </tbody>
		    </table>
	</div>
	)
}

TableGreen.defaultProps = {
	sameData: [],
	highlightData: []
}
TableGreen.propTypes = {
	sameData: PropTypes.array,
	highlightData: PropTypes.array,
	column: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired
}