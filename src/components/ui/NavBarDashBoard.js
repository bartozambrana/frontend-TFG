import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './navbar.css';
import { startLogout } from '../../actions/auth';

export const NavBarDashBoard = () => {
    
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        
        <nav className="navbar navbar-expand-lg  navbar-light border-bottom-line">
            <div className="container-fluid ">
                <div className="navbar-brand">
                    <img 
                        src='https://res.cloudinary.com/tfgbartozambrana/image/upload/v1651521955/Logo_navbar_h2nuep.png'
                        width="200"
                        alt="Logo"
                    />
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className='nav-item nav-link text-color-grey' to='' >Servicios</NavLink>
                        <NavLink className='nav-item nav-link text-color-grey' to='' >Tus Citas</NavLink>
                        <NavLink className='nav-item nav-link text-color-grey' to='' >Notificaciones</NavLink>
                        <NavLink className='nav-item nav-link text-color-grey' to='' >Comentarios</NavLink>
                        {
                            (user.type || true) 
                                &&
                                (
                                    <div className="nav-item dropdown  text-color-grey" >
                                        <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontWeight: "400"}}>
                                            Tus servicios
                                        </div>
                                        <div className='dropdown-menu dropdown-style ' aria-labelledby="navbarDropdown">
                                            <li>fadsfdsafaf</li>
                                            <li>fdasfasfasf</li>
                                        </div>
                                    </div>
                                )
                        }
                    </div> 
                    <div className="navbar-nav  ms-auto ">
                        
                        <div className="d-flex justify-content-center">
                            <button className="nav-item btn nav-btn-secondary d-flex justify-content-center mt-1"><i className="fa fa-plus-circle mt-1" aria-hidden="true"></i>&nbsp;Servicio</button>
                            <button className='nav-item btn logout-btn-primary mt-1' onClick={handleLogout}>
                                LogOut
                            </button>
                        </div>
                    </div> 
                    
                </div>  
            </div>
        </nav>
    )
}
