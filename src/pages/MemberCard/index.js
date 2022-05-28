import React, { useEffect, useState } from 'react';
import style from './MemberCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '../../config';
import { useRouteMatch} from 'react-router-dom';

//apis
import { getSingleMember } from '../../api/member';

//utils
import idFormatDate from '../../utils/id-format-date';

//components
import BtnBlue from '../../components/BtnBlue';
import Image from '../../components/Image';

export default function MemberCard(){
	
	let [member, setMember] = useState({});
	let { params } = useRouteMatch();
	const img= {backgroundImage:'url("/image/book.png")'};
	//date format
	let opt2 = { day:"numeric", month:"numeric", year: "numeric"};
	let locale = 'es-CL';
	
	useEffect(()=>{
		getSingleMember(params.member_id)
		.then(({data})=>{
			setMember(data);
		})
	},[params.member_id])
	
	console.log(member)
	return (
		<div className={style.wrapper}>
			<div className={style.front}>
				<div className={`${style.top} ${style.title}`}>
					<h1>Kartu Anggota perpustakaan</h1>
					<h2>{config.site_title}</h2>
					<h4>JL.Yosudarso Sambogunung Dukun Gresik</h4>
				</div>
				<div className={`${style.bottom} ${style.detail}`}>
					<div style={img} className={style.bookImage}></div>
					<div className={style.left}>
						<div className={style.photo}>
							<Image src={member?.photo?`${config.api_host}/upload/${member.photo}`:'/image/user-image.png'}/>
						</div>
						<h4>Masa Berlaku :</h4>
						<h4>Seumur Hidup</h4>
					</div>
					<table>
						<tbody>
							<tr>
								<td width="80px">ID Anggota</td>
								<td width="10px">:</td>
								<td>{member.member_id}</td>
							</tr>
							<tr>
								<td>Nama</td>
								<td>:</td>
								<td>{member.name}</td>
							</tr>
							<tr>
								<td>Jenis Kelamin</td>
								<td>:</td>
								<td>{member.gender}</td>
							</tr>
							<tr>
								<td>TTL</td>
								<td>:</td>
								<td>{member.place}, {idFormatDate(member.date_of_birth,locale,opt2)}</td>
							</tr>
							<tr>
								<td>Alamat</td>
								<td>:</td>
								<td>{member.address}</td>
							</tr>
						</tbody>
					</table>
					
				</div>
			</div>
			<div className={style.back}>
				<div className={`${style.top}`}>
					<h1>PERATURAN PERPUSTAKAAN</h1>
				</div>
				<div className={`${style.bottom}`}>
					<div style={img} className={style.bookImage}></div>
					<ol>
					  <li>Buku harus dikembalikan tepat waktu</li>
					  <li>Kartu anggota harus dibawa setiap kali meminjam buku</li>
					  <li>Pengembalian lewat batas waktunya akan dikenakan denda</li>
					</ol>
				</div>
			</div>
				
			<br />
			<div className={style.btn}>
				<BtnBlue onClick={()=>window.print()} color="#05F2C7" tColor="#fff" >
					<FontAwesomeIcon icon='print' /> Print
				</BtnBlue>
			</div>
		</div>
	)
}
