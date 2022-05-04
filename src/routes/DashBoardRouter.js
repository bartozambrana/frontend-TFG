import React from 'react'

import { HomeScreen } from '../components/home/HomeScreen'
import { Routes, Route } from 'react-router-dom'
export const DashBoardRouter = () => {

	return (
		<div >
			<div>
				<Routes>
					<Route path="*" element={ <HomeScreen/>}/>
				</Routes>
			</div>
		</div>

	)
}
