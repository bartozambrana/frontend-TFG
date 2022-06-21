import { useDispatch, useSelector } from 'react-redux'
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
import { followUnfollow } from '../../actions/services'
import { ModalPDF } from '../dates/ModalPDF'

export const ActionsService = ({ service }) => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    return (
        <>
            {user.uid === service.idUser ? (
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
                                    href={'#NewDate' + service.uid}
                                    data-bs-toggle="modal"
                                    data-bs-target={'#NewDate' + service.uid}
                                    className="link-no-decoration-black"
                                >
                                    Añadir Cita
                                </a>
                            </li>
                            <li className="dropdown-item border-bottom">
                                <a
                                    href={'#EditDate' + service.uid}
                                    data-bs-toggle="modal"
                                    data-bs-target={'#EditDate' + service.uid}
                                    className="link-no-decoration-black"
                                >
                                    Modificar Cita
                                </a>
                            </li>
                            <li className="dropdown-item border-bottom">
                                <a
                                    href={'#CancelDate' + service.uid}
                                    data-bs-toggle="modal"
                                    data-bs-target={'#CancelDate' + service.uid}
                                    className="link-no-decoration-black"
                                >
                                    Cancelar Cita a Usuario.
                                </a>
                            </li>
                            <li className="dropdown-item border-bottom">
                                <a
                                    href={'#DelDate' + service.uid}
                                    data-bs-toggle="modal"
                                    data-bs-target={'#DelDate' + service.uid}
                                    className="link-no-decoration-black"
                                >
                                    Eliminar una cita
                                </a>
                            </li>
                            <li className="dropdown-item border-bottom">
                                <a
                                    href={'#getPDF' + service.uid}
                                    data-bs-toggle="modal"
                                    data-bs-target={'#getPDF' + service.uid}
                                    className="link-no-decoration-black"
                                >
                                    Citas Asignadas.
                                </a>
                            </li>
                        </ul>
                    </div>

                    <button
                        className="btn btn-outline-primary mt-1"
                        data-bs-toggle="modal"
                        data-bs-target={'#NewPost' + service.uid}
                    >
                        Añadir Post
                    </button>
                    <ModalNewPost
                        idModal={'NewPost' + service.uid}
                        idService={service.uid}
                    />

                    <button
                        className="btn btn-outline-secondary mt-1"
                        data-bs-toggle="modal"
                        data-bs-target={'#NewWork' + service.uid}
                    >
                        Añadir Trabajo{' '}
                    </button>
                    <ModalNewWork
                        idService={service.uid}
                        idModal={'NewWork' + service.uid}
                    />

                    <button
                        className="btn btn-outline-danger mt-1"
                        data-bs-toggle="modal"
                        data-bs-target={'#EditService' + service.uid}
                    >
                        Gestión de datos
                    </button>
                    <ModalGestionDatos
                        idService={service.uid}
                        idModal={'EditService' + service.uid}
                    />
                </>
            ) : (
                <>
                    <button
                        className="btn btn-success mt-1 "
                        data-bs-toggle="modal"
                        data-bs-target={
                            '#selectDate' + user.uid + 'service' + service.uid
                        }
                    >
                        {' '}
                        Pide Cita{' '}
                    </button>
                    <ModalSelectDate
                        idModal={
                            'selectDate' + user.uid + 'service' + service.uid
                        }
                        uidService={service.uid}
                    />
                </>
            )}

            {
                /* Si existe entre los servicio que sigue el usuario */
                user.followServices.length !== 0 &&
                user.followServices.find(
                    (follow) => follow._id === service.uid
                ) ? (
                    <button
                        className="btn btn-outline-danger mt-1"
                        onClick={() => dispatch(followUnfollow(service))}
                    >
                        unfollow
                    </button>
                ) : (
                    <button
                        className="btn btn-primary mt-1"
                        onClick={() => dispatch(followUnfollow(service))}
                    >
                        follow
                    </button>
                )
            }

            <button className="btn btn-secondary mt-1">
                <Link
                    className="link-light"
                    style={{ textDecoration: 'none' }}
                    to={'/service/gallery/' + service.uid}
                >
                    Galería
                </Link>
            </button>
            <ModalNewDates
                uidService={service.uid}
                idModal={'NewDate' + service.uid}
            />
            <ModalEditDateOwner
                uidService={service.uid}
                idModal={'EditDate' + service.uid}
            />

            <ModalCancelDateOwner
                uidService={service.uid}
                idModal={'CancelDate' + service.uid}
            />

            <ModalDelDateOwner
                uidService={service.uid}
                idModal={'DelDate' + service.uid}
            />

            <ModalPDF
                idService={service.uid}
                idModal={'getPDF' + service.uid}
            />
        </>
    )
}
