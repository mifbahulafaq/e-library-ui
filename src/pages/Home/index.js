import React from 'react';
import { Switch } from 'react-router-dom';
import style from './Home.module.css';
import routes from './routes';

//cpmponents
import Header from '../../components/Header';
import SideNav from '../../components/SideNav';
import GuardRoute from '../../components/GuardRoute';
import GuardComponent from '../../components/GuardComponent';

export default function Home(){
	
	return (
	  <div className={style.home}>
	  
		<GuardComponent role={['admin','operator']}>
			<div className={style.left}>
			  <SideNav />
			</div>
		</GuardComponent>
		
		<div className={style.right}>
			<div className={style.top}>
			  <Header />
			</div>
			<div className={style.content}>
			  <Switch>
				{
					routes.map(({Component, ...rest}, i)=>{
						return 	<GuardRoute {...rest} key={i} >
							<Component />
						</GuardRoute>
					})
				}
				
			  </Switch>
			</div>
		</div>
		
	  </div>
	)
}