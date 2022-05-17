import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./navbar.css";
import "./../../style.css";
import { startLogout } from "../../actions/auth";
import { ModalNewService } from "../services/ModalNewService";
import { ModalEditUser } from "../user/ModalEditUser";

export const NavBarDashBoard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userServices } = useSelector((state) => state.services);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-light border-bottom-line">
        <div className="container-fluid ">
          <div className="navbar-brand">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/tfgbartozambrana/image/upload/v1651521955/Logo_navbar_h2nuep.png"
                width="200"
                alt="Logo"
              />
            </Link>
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

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link text-color-grey" to="search">
                  Servicios
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-item nav-link text-color-grey"
                  to="dates"
                >
                  Tus Citas
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-item nav-link text-color-grey"
                  to="comments"
                >
                  Comentarios
                </NavLink>
              </li>

              {user.type && (
                <li className="nav-item dropdown text-color-grey">
                  <div
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownServicios"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tus Servicios
                  </div>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownServicios"
                  >
                    {userServices.map((s) => (
                      <li key={s.uid}>
                        <Link
                          className="dropdown-item"
                          to={"/service/" + s.uid}
                          key={s.uid}
                        >
                          {" "}
                          {s.serviceName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
            <div className=" ms-auto ">
              <div className="d-flex justify-content-center">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown text-color-grey mt-1">
                    <div
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownServicios"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i
                        className="fa fa-user-circle fa-lg"
                        aria-hidden="true"
                      ></i>
                    </div>

                    <ul
                      className="dropdown-menu dropdown-menu-lg-end p-3 text-center"
                      aria-labelledby="navbarDropdownServicios"
                    >
                      <li
                        className="dropdown-item btn"
                        style={{ cursor: "pointer" }}
                      >
                        <a
                          href={"#EditUser" + user.uid}
                          data-bs-toggle="modal"
                          style={{ textDecoration: "none", color: "black" }}
                          className="mb-1"
                          data-bs-target={"#EditUser" + user.uid}
                        >
                          <i className="fa fa-cog" aria-hidden="true"></i>
                          &nbsp;Datos
                        </a>
                      </li>
                      <li
                        className="dropdown-item border btn border-danger rounded"
                        style={{ cursor: "pointer" }}
                        onClick={handleLogout}
                      >
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        &nbsp;Cerrar Sesión
                      </li>
                    </ul>
                  </li>
                </ul>

                {user.type && (
                  <div>
                    <button
                      className="nav-item btn btn-outline-secondary d-flex justify-content-center mt-1"
                      data-bs-toggle="modal"
                      data-bs-target={"#NewService" + user.uid}
                      style={{ fontSize: "18px" }}
                    >
                      <i
                        className="fa fa-plus-circle mt-1"
                        aria-hidden="true"
                      ></i>
                      &nbsp;Servicio
                    </button>
                    <ModalNewService idModal={"NewService" + user.uid} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <ModalEditUser idModal={"EditUser" + user.uid} />
    </>
  );
};
