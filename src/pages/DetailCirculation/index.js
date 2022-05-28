import React from 'react';
import { useParams } from "react-router-dom";
import style from './DetailCirculation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//cpmponents
import TableRow from '../../components/TableRow';
import NamePage from '../../components/NamePage';
import Pagination from '../../components/Pagination';
import SearchInput from '../../components/SearchInput';

import groupingData from '../../utils/grouping-data';
import idFormatDate from '../../utils/id-format-date';
import circulationReducer from './reducer';

//APIs
import { getSingleCirculation } from '../../api/circulation';


export default function (){
	
	const { circulation_id } = useParams();
	let dataCirculation;
	
	const fetchSingleCirculation = React.useCallback(async ()=>{
		
		const { data } = await getSingleCirculation(circulation_id);
		
		dataCirculation = data;
		
	},[])
	
	React.useEffect(()=>{
		fetchSingleCirculation();
	},[fetchSingleCirculation])
	
	console.log(dataCirculation);
	return (
	  <div className="wrapper">
		<div className={style.namePage}>
			<NamePage title="Detail Peminjaman" />
		</div>
		<div className={style.detailCirculation}>
			<table>
				<tbody>
					<tr>
						<th>Buku</th>
						<td>Narutid</td>
					</tr>
					<tr>
						<th>Anggota</th>
						<td>sdds</td>
					</tr>
					<tr>
						<th>Tanggal pinjam</th>
						<td>dsdssdsd</td>
					</tr>
					<tr>
						<th>Harus dikembalikan</th>
						<td>dssd</td>
					</tr>
					<tr>
						<th>Denda</th>
						<td>sddsds</td>
					</tr>
					<tr>
						<th>Deskripsi</th>
						<td>dsds</td>
					</tr>
				</tbody>
				<div className={style.btnFirst}>
					<FontAwesomeIcon icon='undo' />
					<span>Kembalikan</span>
				</div>
				<div className={style.btnSecond}>
					<FontAwesomeIcon icon='undo' />
					<span>Kembalikan</span>
				</div>
			</table>
		</div>
	  </div>
	)
}