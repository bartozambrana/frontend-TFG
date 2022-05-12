import React from 'react'

import { HomeScreen } from '../components/home/HomeScreen'
import { Routes, Route } from 'react-router-dom'
import { NavBarDashBoard } from '../components/ui/NavBarDashBoard'
import { CommentsScreen } from '../components/comments/CommentsScreen'
import { Footer } from '../components/ui/Footer'
import { DatesScreen } from '../components/dates/DatesScreen'
import { ServiceScreen } from '../components/services/ServiceScreen'
import { GalleryScreen } from '../components/galery/GalleryScreen'

export const DashBoardRouter = () => {

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
