import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ModalGestionDatos } from './ModalGestionDatos'
import { ModalNewWork } from '../works/ModalNewWork'
import { ModalNewPost } from '../posts/ModalNewPost'
import { ModalNewDates } from '../dates/ModalNewDates'

import '../../style.css'
import { ModalEditDateOwner } from '../dates/ModalEditDateOwner'
import { ModalCancelDateOwner } from '../dates/ModalCancelDateOwner'
import { ModalDelDateOwner } from '../dates/ModalDelDateOwner'
import { ModalSelectDate } from '../dates/ModalSelectDate'

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
                                <a
                                    href={'#CancelDate' + uidService}
                                    data-bs-toggle="modal"
                                    data-bs-target={'#CancelDate' + uidService}
                                    className="link-no-decoration-black"
                                >
                                    Cancelar Cita a Usuario.
                                </a>
                            </li>
                            <li className="dropdown-item border-bottom">
                                <a
                                    href={'#DelDate' + uidService}
                                    data-bs-toggle="modal"
                                    data-bs-target={'#DelDate' + uidService}
                                    className="link-no-decoration-black"
                                >
                                    Eliminar una cita
                                </a>
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
                    <button
                        className="btn btn-success mt-1 "
                        data-bs-toggle="modal"
                        data-bs-target={
                            '#selectDate' + user.uid + 'service' + uidService
                        }
                    >
                        {' '}
                        Pide Cita{' '}
                    </button>
                    <ModalSelectDate
                        idModal={
                            'selectDate' + user.uid + 'service' + uidService
                        }
                        uidService={uidService}
                    />

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
            <ModalEditDateOwner
                uidService={uidService}
                idModal={'EditDate' + uidService}
            />

            <ModalCancelDateOwner
                uidService={uidService}
                idModal={'CancelDate' + uidService}
            />

            <ModalDelDateOwner
                uidService={uidService}
                idModal={'DelDate' + uidService}
            />
        </>
    )
}
