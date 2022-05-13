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




export const AppRoutes = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth)
    const services = useSelector(state => state.services)
    const comments = useSelector(state => state.comments)

    useEffect(()=>{
        //if(state.checking)
            dispatch(startChecking());
        
            
    },[dispatch,state.checking]);

    

    
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
