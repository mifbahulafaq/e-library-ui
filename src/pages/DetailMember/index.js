import React from 'react';
import style from './DetailMember.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '../../config';
import {Link, useHistory, useRouteMatch} from 'react-router-dom';

//apis
import { getSingleUser } from '../../api/user';
//components
import Image from '../../components/Image';
import PageTitle from '../../components/PageTitle';
import BtnBlue from '../../components/BtnBlue';

import idFormatDate from '../../utils/id-format-date';

export default function DetailMember(){
	const [singleMember, setSingleMember] = React.useState({});
	let { params } = useRouteMatch();
	const history = useHistory();
	
	//date format
	let opt = { day:"numeric", month:"long", year: "numeric"};
	let locale = 'id-ID';
	
	React.useEffect(()=>{
		getSingleUser(params.member_id)
		.then(({ data })=>{
			
			if(!data.error) setSingleMember(data);
		
		})
	},[params.member_id])
	
	return (
	  <div className={style.wrapper}>
		<PageTitle size="1.5em">Detail Member</PageTitle>
		<div className={style.contains}>
			<div className={style.photo}>
				<div className={style.radius}>
					<Image src={singleMember.member?.photo?`${config.api_host}/upload/${singleMember.member?.photo}`:''}/>
				</div>
			</div>
			<div className={style.detail}>
				<h1 className={style.name}>{singleMember.name}</h1>
				<h1 className={style.id}><b>Member ID :</b> {singleMember.member?.member_id}</h1>
				<ul>
					<li><FontAwesomeIcon icon={['far','calendar-alt']} />{singleMember.member?.place}, {singleMember.member?idFormatDate(singleMember.member.date_of_birth,locale,opt):""}</li>
					<li><FontAwesomeIcon icon='venus-mars' />{singleMember.member?.gender}</li>
					<li><FontAwesomeIcon icon='home' />{singleMember.member?.address}</li>
					<li><FontAwesomeIcon icon='phone-alt' />{singleMember.member?.phone_number?singleMember.member?.phone_number:"-"}</li>
					<li><FontAwesomeIcon icon={["far","envelope"]} />{singleMember.email}</li>
				</ul>
				<BtnBlue onClick={()=>history.push(`/member/${singleMember._id}/password`)} color="#0069D9" tColor="#fff" >
					<FontAwesomeIcon icon='unlock-alt' /> Ganti password
				</BtnBlue>
				
			</div>
			<div className={style.btn}>
				<Link to={`/member/${singleMember._id}/member-card`}  target="_blank">
					<BtnBlue color="#05F2C7" tColor="#fff" >
						Kartu Anggota
					</BtnBlue>
				</Link>
				<BtnBlue onClick={()=>history.push(`/member/${singleMember._id}/edit`)} color="#0069D9" tColor="#fff" >
					<FontAwesomeIcon icon='edit' /> Edit
				</BtnBlue>
			</div>
		</div>
	  </div>
	)
}