import React from 'react';
import style from './TableRow.module.css';

const GroupChild = ({children})=><>{children}</>

export default function TableRow({ column, dataGroup }){
	
	return (
	  <div className={style.tableWrapper}>
	        <table>
		      <thead>
		        <tr>
					{
						column.map((e,i)=><th key={i}>{e.header}</th>)
					}
		        </tr>
		      </thead>
		      <tbody>
			  {
				
				dataGroup.map((dataArr,iDataArr)=>{
					
					return <GroupChild key={iDataArr}>
						{
							dataArr.map((data,iData)=><tr key={iData}>
								{
									column.map(({Content, rowSpan},i)=>{
										if(rowSpan){
											
											if(iData===0) return <td key={i} rowSpan={dataArr.length}><Content indexRow={iDataArr} data={data} key={i} /></td>
											
											return <GroupChild key={i}></GroupChild>
											
										}
										
										return <td key={i}><Content indexRow={iDataArr} data={data} /></td>
									
									})
								}
							</tr>)
						}
					</GroupChild>;
					
				})

		      }
				
		      </tbody>
		    </table>
	</div>
	)
}

/*TableRow.propTypes = {
	column: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired
}*/