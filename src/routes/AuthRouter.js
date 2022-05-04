import {Routes, Route, Navigate} from 'react-router-dom'


import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { PublicRouteComponent } from './PublicRouteComponent';
import '../components/auth/style.css';


export const AuthRouter = () => {
    
    return (
        <div className="main">
            <div className="main-container bg-light">
                <Routes>
                    <Route path="login" element={<PublicRouteComponent > <LoginScreen/> </PublicRouteComponent>} />
                    <Route path="register" element={<PublicRouteComponent > <RegisterScreen/> </PublicRouteComponent>}/>
                    <Route path="*" element={
                        <Navigate to='login' replace={true} />
                    }/>
                </Routes>
            </div>
        </div>
        
    )
}
