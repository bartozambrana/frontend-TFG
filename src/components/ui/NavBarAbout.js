import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

export const NavBarAbout = () => {
    return (
        <nav className="navbar navbar-expand-lg  navbar-light border-bottom-line">
            <div className="container-fluid ">
                <div className="navbar-brand">
                    <img
                        src="https://res.cloudinary.com/tfgbartozambrana/image/upload/v1651521955/Logo_navbar_h2nuep.png"
                        width="200"
                        alt="Logo"
                    />
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav ms-auto ">
                        <div className="d-flex justify-content-center">
                            <button className="nav-item btn login-btn-primary mt-1">
                                <Link
                                    to="/auth/login"
                                    className="link-decoration-dark"
                                >
                                    LogIn
                                </Link>
                            </button>
                            <button className="nav-item btn logout-btn-primary mt-1">
                                <Link
                                    to="/auth/register"
                                    className="link-decoration-white"
                                >
                                    SignUp
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
