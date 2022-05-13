import React, { useEffect } from 'react'

import { HomeScreen } from '../components/home/HomeScreen'
import { Routes, Route } from 'react-router-dom'
import { NavBarDashBoard } from '../components/ui/NavBarDashBoard'
import { CommentsScreen } from '../components/comments/CommentsScreen'
import { Footer } from '../components/ui/Footer'
import { DatesScreen } from '../components/dates/DatesScreen'
import { ServiceScreen } from '../components/services/ServiceScreen'
import { GalleryScreen } from '../components/galery/GalleryScreen'
import { useDispatch, useSelector } from 'react-redux'
import { getServicesUser } from "../actions/services";
export const DashBoardRouter = () => {
	
	const services = useSelector(state => state.services)
	const dispatch = useDispatch()
	const state = useSelector(state => state.auth)

	useEffect(()=>{

        if(!state.checking && !services.loaded)
            dispatch(getServicesUser());
    },[state.checking, services.loaded,dispatch]);

    if(state.checking)
        return (<div className='preloader'></div>)
	return (
		<>
			<div style={{minHeight:'100vh'}}>
			<header>
				<NavBarDashBoard/>
			</header>

			<Routes>
				<Route path="dates" element={<DatesScreen/>}/>
				<Route path="comments" element={<CommentsScreen/>} />
				<Route path="service/:idService" element={<ServiceScreen/>}/>
				<Route path="service/gallery/:idService" element={<GalleryScreen/>}/>
				<Route path="*" element={ <HomeScreen/>}/>
			</Routes>
			</div>
			
			<Footer/>
		</>

	)
}
