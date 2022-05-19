import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ModalGestionDatos } from './ModalGestionDatos'
import { ModalNewWork } from '../works/ModalNewWork'
import { ModalNewPost } from '../posts/ModalNewPost'
import { ModalNewDates } from '../dates/ModalNewDates'

import '../../style.css'
import { ModalEditDate } from '../dates/ModalEditDates'

export const ActionsService = ({ idUserService, uidService }) => {
    const { user } = useSelector((state) => state.auth)
    return (
        <>
            {user.uid === idUserService ? (
                <>
                    <div className="dropdown ">
                        <button
                            className="btn dropdown-toggle btn-success mt-1 w-100"
                            id="dropdown-dates-actions"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {' '}
                            Gestión de Citas
                        </button>
                        <ul
                            className="dropdown-menu w-100 text-center"
                            aria-labelledby="dropdown-dates-actions"
                        >
                            <li className="dropdown-item border-bottom">
                                <a
                                    href={'#NewDate' + uidService}
                                    data-bs-toggle="modal"
                                    data-bs-target={'#NewDate' + uidService}
                                    className="link-no-decoration-black"
                                >
                                    Añadir Cita
                                </a>
                            </li>
                            <li className="dropdown-item border-bottom">
                                <a
                                    href={'#EditDate' + uidService}
                                    data-bs-toggle="modal"
                                    data-bs-target={'#EditDate' + uidService}
                                    className="link-no-decoration-black"
                                >
                                    Modificar Cita
                                </a>
                            </li>
                            <li className="dropdown-item border-bottom">
                                Cancelar Cita
                            </li>
                            <li className="dropdown-item border-bottom">
                                Eliminar Cita
                            </li>
                        </ul>
                    </div>

                    <button
                        className="btn btn-outline-primary mt-1"
                        data-bs-toggle="modal"
                        data-bs-target={'#NewPost' + uidService}
                    >
                        Añadir Post
                    </button>
                    <ModalNewPost
                        idModal={'NewPost' + uidService}
                        idService={uidService}
                    />

                    <button
                        className="btn btn-outline-secondary mt-1"
                        data-bs-toggle="modal"
                        data-bs-target={'#NewWork' + uidService}
                    >
                        Añadir Trabajo{' '}
                    </button>
                    <ModalNewWork
                        idService={uidService}
                        idModal={'NewWork' + uidService}
                    />

                    <button
                        className="btn btn-outline-danger mt-1"
                        data-bs-toggle="modal"
                        data-bs-target={'#EditService' + uidService}
                    >
                        Gestión de datos
                    </button>
                    <ModalGestionDatos
                        idService={uidService}
                        idModal={'EditService' + uidService}
                    />
                </>
            ) : (
                <>
                    <button className="btn btn-success mt-1 ">
                        {' '}
                        Pide Cita{' '}
                    </button>
                    <button className="btn btn-primary mt-1"> Sigueme </button>
                </>
            )}
            <button className="btn btn-secondary mt-1">
                <Link
                    className="link-light"
                    style={{ textDecoration: 'none' }}
                    to={'/service/gallery/' + uidService}
                >
                    Galería
                </Link>
            </button>
            <ModalNewDates
                uidService={uidService}
                idModal={'NewDate' + uidService}
            />
            <ModalEditDate
                uidService={uidService}
                idModal={'EditDate' + uidService}
            />
        </>
    )
}
