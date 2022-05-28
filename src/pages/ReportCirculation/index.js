import React, { useReducer, useEffect, Fragment, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './ReportCirculation.module.css';
import { useSelector, useDispatch } from 'react-redux';
import useGroup from '../../hooks/useGroup';

import idFormatDate from '../../utils/id-format-date';
import reqStatus from '../../utils/req-status';

//APIs
import { getCirculations, reportCirculation} from '../../api/circulation';

//components
import PageTitle from '../../components/PageTitle';


export default function ReportCirculation(){
	
	let objFilter = { start_date:'', end_date: ''}
	let [detailCirculations, setDetailCirculations] = useGroup([],'circulation');
	let [status, setStatus] = useState(reqStatus.idle);
	let [textDate, setTextDate] = useState('');
	let [filterDate, setFilterDate] = useState(objFilter);
	let [filterPdf, setFilterPdf] = useState({})
	let filterDisabled = Boolean(filterDate.start_date && filterDate.end_date);
	let opt1 = { dateStyle:'short', timeStyle:'medium'};
	let opt2 = { day:"numeric", month:"numeric", year: "numeric"};
	let opt3 = { dateStyle:'short'};
	let locale = 'en-GB';
	
	function fetchCirculation (params){
		
		let currentParams = {
			skip: 0,
			limit: 100,
			...params
		}
		
		getCirculations(currentParams)
		.then(({data : {data} })=>{
			const {skip, limit, ...rest} = currentParams;
			setFilterPdf(rest)
			setDetailCirculations(data);
			setTextDate(`${idFormatDate(rest.start_date,locale,opt3)} - ${idFormatDate(rest.end_date,locale,opt3)}`)
		})
		
	}
	const filterSubmit = async event=>{
		fetchCirculation(filterDate);
		event.preventDefault();
	}
	const generatePdf = async ()=>{
		if(!detailCirculations.length) return setStatus(reqStatus.error);
		
		setStatus(reqStatus.processing)
		reportCirculation(filterPdf)
		.then(result=>{ 
		
			if(!result.data) return
			
			const blob = new Blob([result.data], {type: result.data.type});
			const url = window.URL.createObjectURL(blob);
			window.open(url, '_blank');
			/*const link = document.createElement("a");
			link.href = url
			link.setAttribute('target', '_blank');
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);*/
			
			setStatus(reqStatus.idle)
		})
		.catch(err=>setStatus(reqStatus.error))
	}
	
	return (
	  <div className={style.wrapper}>
		<PageTitle size="1.5em">Laporan Peminjaman</PageTitle>
		<div className={style.filter}>
			<div className={style.date} >
				<FontAwesomeIcon icon={["far","calendar-alt"]} />
				{textDate||'Created Date'} 
				<div 
					className={style.arrow} 
					onClick={e=>{
						e.currentTarget
						.parentElement.querySelector(`.${style.dateSelect}`).style.display = 'block';
					}}
				/> 
				<div className={style.dateSelect}>
					<form onSubmit={filterSubmit} >
						<h3>Start Date</h3>
						<input type='date' value={filterDate.start_date} onChange={e=>setFilterDate({...filterDate, start_date: e.currentTarget.value})} />
						<h3>End Date</h3>
						<input type='date' value={filterDate.end_date} onChange={e=>setFilterDate({...filterDate, end_date: e.currentTarget.value})} />
						<div className={style.btn}>
							<button 
								type='button' 
								onClick={e=>{
									e.currentTarget
									.parentElement.parentElement.parentElement
									.style.display = 'none';
								}}
							>
								Cancel
							</button>
							<button type='submit' disabled={!filterDisabled} className={!filterDisabled?style.disabled:''} >Apply</button>
						</div>
					</form>
				</div>
			</div>
			<div 
				className={`${style.generate} ${!detailCirculations.length || status === reqStatus.processing ?style.disabled:''}`} 
				onClick={!detailCirculations.length || status === reqStatus.processing?()=>{}:generatePdf}
			>
				{status == reqStatus.idle?'Generate':'waiting...'}
				<FontAwesomeIcon icon={["far","file-pdf"]} />
			</div>
		</div>
		<div className={style.tableWrapper}>
			<table>
				<thead>
					<tr>
						<th>No.</th>
						<th>Tanggal Pinjam</th>
						<th>Anggota</th>
						<th>Harus dikembalikan</th>
						<th>Buku</th>
						<th>Dikembalikan</th>
					</tr>
				</thead>
				<tbody>
				{
					!detailCirculations.length
					?<tr><td colSpan='6' style={{textAlign:'center'}}>No data available in table</td></tr>
					:
					detailCirculations.map((dataArr, iArr)=>{
						return (
							<Fragment key={iArr}>
								{
									dataArr.map((data, iData)=>{
										if(!iData){
											return (
												<tr key={iData}>
													<td rowSpan={dataArr.length} >{iArr+=1}</td>
													<td rowSpan={dataArr.length} >{idFormatDate(data.circulation.date_of_loan,locale)}</td>
													<td rowSpan={dataArr.length}>{data.circulation.member?.name} ({data.circulation.member?.member_id})</td>
													<td rowSpan={dataArr.length}>{idFormatDate(data.circulation?.date_of_return,locale,opt2)}</td>
													<td>{data.book?.title}</td>
													<td>{data.returned?idFormatDate(data.returned,locale,opt1):""}</td>
												</tr>
											)
										}
										
										return (
											<tr key={iData}>
												<td>{data.book?.title}</td>
												<td>{data.returned?idFormatDate(data.returned,locale,opt1):""}</td>
											</tr>
										)
									})
								}
							</Fragment>
						)
					})
				}
				</tbody>
			</table>
		</div>
		
	  </div>
	)
}
