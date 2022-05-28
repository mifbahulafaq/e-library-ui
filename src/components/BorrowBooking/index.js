import React from 'react';
import { config } from '../../config';
import style from './BorrowBooking.module.css';
import PropTypes from 'prop-types';

//components
import Image from '../Image';

export default function BorrowBooking({ clickSubmit, boolBor, books, changeTextarea }){
	return (
	  <div className={style.wrapper}>
	    <div className={style.top}>
			<h1>Tambah {boolBor?'Peminjaman':'Booking'}</h1>
		</div>
		<div className={style.content}>
		{
		  books.map((e,i)=>
		  <div key={i} className={style.book}>
		    <div className={style.image}>
			  <Image src={`${config.api_host}/upload/${e.image}`} />
			</div>
			<div className={style.detail}>
			  <div className={style.title}>
			    <h1>{e.name}</h1>
				<h3>{e.category?.name} (Rack {e.rack?.name})</h3>
			  </div>
			  <ul>
				<li><b>Author :</b> {e.author}</li>
				<li><b>Publisher :</b> {e.publisher}</li>
			  </ul>
			</div>
			{
				boolBor && <textarea
				value={e.description} 
				onChange={e=>changeTextarea(e.target.value,i)} 
				placeholder="Deskripsi..." >
				</textarea>
			}
		  </div>
		)}
		</div>
	    <div className={style.bottom}>
			<div className={style.info}>
			  <p>Maximal 2 buku yang bisa dipinjam/booking </p>
			</div>
			<div className={style.btn}>
			  <div onClick={clickSubmit} >{boolBor?'Pinjam':'Booking'}</div>
			</div>
		</div>
	  </div>
	)
}

BorrowBooking.propTypes = {
	books: PropTypes.array.isRequired
}