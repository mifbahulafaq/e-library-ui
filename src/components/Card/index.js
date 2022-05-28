import React from 'react';
import style from './Card.module.css';
import { config } from '../../config';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Image from '../Image';
import GuardComponent from '../../components/GuardComponent';

export default function Card({book, borrow, booking}){
	let [detail, setDetail] = React.useState(100);
	
	return (
	  <div className={style.card}>
		<div onClick={()=>setDetail(detail?0:100)} className={style.detailIcon}
		>
			<FontAwesomeIcon icon="ellipsis-v" />
		</div>
		<div style={{right:`${detail}%`}} className={style.detail}>
			<h4>{book.title}</h4>
			<h3>Author</h3>
			<h4>{book.author}</h4>
			<h3>Publisher</h3>
			<h4>{book.publisher}</h4>
			<h3>Stock</h3>
			<h4>{book.stock}</h4>
			<h3>Category</h3>
			<h4>{book.category.name}</h4>
			<h3>Rack</h3>
			<h4>{book.rack.name}</h4>
		</div>
	    <div className={style.bookImg}>
			<Image name="book" src={`${config.api_host}/upload/${book.image}`} />
		</div>
		<h1 className={style.title}>{book.title}</h1>
		<h4 className={style.auth}><span>auth</span> {book.author}</h4>
		<GuardComponent role={['admin','operator']}>
			<div onClick={()=>borrow(book)} className={style.btn}>Pinjam</div>
		</GuardComponent>
		<GuardComponent role={['member']}>
			<div onClick={()=>booking(book)} className={style.btn}>Booking</div>
		</GuardComponent>
		<div className={`${style.empty} ${book.stock?style.emptyHidden:''}`}>
			Kosong
		</div>
	  </div>
	)
}

Card.propTypes = {
	borrow: PropTypes.func.isRequired,
	booking: PropTypes.func.isRequired
}