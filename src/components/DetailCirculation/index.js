import React from 'react';
import style from './DetailCirculation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '../../config'
import { useDispatch } from 'react-redux';
import { add } from '../../features/Logs/actions';

//components
import BtnBlue from '../BtnBlue';
import Input from '../Input';
import Image from '../Image';
import Label from '../Label';
import GuardComponent from '../GuardComponent';

import rupiah from '../../utils/rupiah';
import idFormatDate from '../../utils/id-format-date';

//APIs
import { payCirculation, returnCirculation} from '../../api/circulation';

export default function DetailCirculation({closeDetail, setItem, item, input, setInput}){
	
	let opt1 = { dateStyle:'short', timeStyle:'medium'};
	let opt2 = { day:"numeric", month:"numeric", year: "numeric"};
	let locale = 'en-GB';
	let [boolPay, setBoolPay] = React.useState(false);
	const dispatch = useDispatch();
	const theDate = item.circulation?.date_of_return
	const dateNow = Date.now();
	const boolDate = Boolean(dateNow<=new Date(theDate).getTime() || item.status === 'returned')
	
	React.useEffect(()=>{
		
		setBoolPay(false)
		
		if(item._id){
			
			setInput(item.fine_payment);
			
		}
	},[setInput, item._id, item.fine_payment])
	
	async function payment(){
		
		if(boolPay){
			
			const { data } = await payCirculation(item._id, Number(input));
			setItem(data._id)
			return ;
			
		}
		
		setBoolPay(true);
		return ;
		
	}
	
	function returning(payOff){
		if(payOff){
			
			payCirculation(item._id, item.fine).then(()=>{
				
				return returnCirculation(item._id).then(({data})=>{
					
					dispatch(add([data]));
					return setItem(item._id);
				})
				
			})
		}
		
		returnCirculation(item._id)
		.then(({data})=>{
			
			dispatch(add([data]));
			setItem(item._id)
		});
	}
	
	return (
		<div className={style.wrapper}>
			<div onClick={closeDetail} className={style.cancelDetail}>x</div>
			<div className={style.detail}>
				<table>
					<tbody>
						<tr>
							<th>Name <span>:</span></th><td>{item.circulation?.member?.name}</td><td><b>Member ID : </b> {item.circulation?.member?.member_id}</td>
						</tr>
						<tr>
							<th>Tanggal Pinjam <span>:</span></th>
							<td>
								{item.circulation?idFormatDate(item.circulation.date_of_loan,locale,opt1):""}
							</td>
						</tr>
						<tr>
							<th>Harus dikembalikan <span>:</span></th>
							<td>
								<Label type={boolDate?'warning':'danger'}>{item.circulation?idFormatDate(item.circulation.date_of_return,locale,opt2):""}</Label>
							</td>
						</tr>
						
						<tr>
							<th>Dikembalikan <span>:</span></th>
							<td>
								{item.returned?idFormatDate(item.returned,locale,opt1):""}
							</td>
						</tr>
						<tr>
							<th>Denda <span>:</span></th><td>{item.fine?'Rp.':''} {rupiah(item.fine)}</td>
							<td className={style.payment}>
								Dibayar
								<div className={style.inputPay}>
									<Input disabled={true && !boolPay } value={rupiah(input)} onChange={e=>setInput(e.target.value)}/>
								</div>
								{
									item.fine_payment >= item.fine
									?
									<span>(Lunas)</span>	
									:
									""
								}
								{
									item.status === "borrowed" && item.fine_payment < item.fine
									?
									<div className={style.btnPay}>
										<BtnBlue onClick={payment} color={boolPay?"#3daf07":"#03c2fc"} tColor="#fff" >{boolPay?"Submit":"Bayar"}</BtnBlue>
									</div>
									:
									""
								}
								{
									boolPay
									?
									<div className={style.btnPay}>
										<BtnBlue onClick={()=>setBoolPay(false)} color="#cd0b0b" tColor="#fff" >Batal</BtnBlue>
									</div>
									:
									""
								}
							</td>
						</tr>
						<tr>
							<th>Deskripsi <span>:</span></th><td>{item.description}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={style.book}>
				<div className={style.img}><Image src={item.book?.image?`${config.api_host}/upload/${item.book?.image}`:''}/></div>
				<p><b>Category :</b> {item.book?.category?.name} <b>| Rack :</b> {item.book?.rack?.name}</p>
				<table className={style.detailBook}>
					<tbody>
						<tr><th>Title <span>: </span></th><td>{item.book?.title}</td></tr>
						<tr><th>Author <span>: </span></th><td>{item.book?.author}</td></tr>
						<tr><th>Publisher <span>: </span></th><td>{item.book?.publisher}</td></tr>
					</tbody>
				</table>
			</div>
			<div className={style.action}>
				<GuardComponent role={['admin','operator']}>
					{
					item.status === "borrowed"?
						item.fine_payment >= item.fine
						?
						<BtnBlue onClick={()=>returning(false)} color="#03c2fc" tColor="#fff" >
							<FontAwesomeIcon icon="undo" /> Kembalikan
						</BtnBlue>
						:
						<BtnBlue onClick={()=>returning(true)} color="#03c2fc" tColor="#fff" >
							Lunasi dan Kembalikan
						</BtnBlue>
					:""
					}
				</GuardComponent>
			</div>
		</div>
	)
}