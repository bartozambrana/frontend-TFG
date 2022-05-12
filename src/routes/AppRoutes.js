import {useEffect} from "react";

import { useDispatch,useSelector } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { startChecking } from "../actions/auth";

import { AboutScreen } from "../components/about/AboutScreen";
import { AuthRouter } from "./AuthRouter";
import { DashBoardRouter } from "./DashBoardRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import './preloader.css'
import { getServicesUser } from "../actions/services";



export const AppRoutes = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth)

    useEffect(()=>{
        if(state.checking)
            dispatch(startChecking());
        if(!state.checking && state.user){
            if(state.user.type)
                dispatch(getServicesUser());
        }
            
    },[dispatch,state.checking,state.user]);

    

    if(state.checking)
        return (<div className='preloader'></div>)

    
    return (
        <BrowserRouter>
            <Routes>
                {/*Public Routes*/}
                <Route end path="/auth/*" element={
                    <PublicRoute>
                        <AuthRouter/>
                    </PublicRoute>
                    }/>
                <Route end path="/about" element={
                    <PublicRoute>
                        <AboutScreen/>
                    </PublicRoute>
                    }/>

                {/*Private Routes*/}
                <Route end path="/*" element={
                    <PrivateRoute>
                        <DashBoardRouter/>
                    </PrivateRoute>
                    
                }/>
            </Routes>
        </BrowserRouter>
    )
}
