import React from 'react';
import style from './DetailOperator.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '../../config';
import {useHistory, useRouteMatch} from 'react-router-dom';

//apis
import { getSingleUser } from '../../api/user';
//components
import Image from '../../components/Image';
import PageTitle from '../../components/PageTitle';
import BtnBlue from '../../components/BtnBlue';

export default function DetailOperator(){
	const [singleOperator, setSingleOperator] = React.useState({});
	let { params } = useRouteMatch();
	const history = useHistory();
	
	React.useEffect(()=>{
		getSingleUser(params.operator_id)
		.then(({ data })=>{
			if(!data.error) setSingleOperator(data);
		})
	},[params.operator_id])
	
	return (
	  <div className={style.wrapper}>
		<PageTitle size="1.5em">Detail Operator</PageTitle>
		<div className={style.contains}>
			<div className={style.photo}>
				<div className={style.radius}>
					<Image src={singleOperator.operator?.photo?`${config.api_host}/upload/${singleOperator.operator?.photo}`:''}/>
				</div>
			</div>
			<div className={style.detail}>
				<h1 className={style.name}>{singleOperator.name}</h1>
				<ul>
					<li><FontAwesomeIcon icon='venus-mars' />{singleOperator.operator?.gender}</li>
					<li><FontAwesomeIcon icon='home' />{singleOperator.operator?.address}</li>
					<li><FontAwesomeIcon icon='phone-alt' />{singleOperator.operator?.phone_number?singleOperator.operator?.phone_number:"-"}</li>
					<li><FontAwesomeIcon icon={["far","envelope"]} />{singleOperator.email}</li>
				</ul>
				<BtnBlue onClick={()=>history.push(`/user/operator/${singleOperator._id}/password`)} color="#0069D9" tColor="#fff" >
					<FontAwesomeIcon icon='unlock-alt' /> Ganti password
				</BtnBlue>
				
			</div>
			<div className={style.btn}>
				<BtnBlue onClick={()=>history.push(`/user/operator/${singleOperator._id}/edit`)} color="#0069D9" tColor="#fff" >
					<FontAwesomeIcon icon='edit' /> Edit
				</BtnBlue>
			</div>
		</div>
	  </div>
	)
}