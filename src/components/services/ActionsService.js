import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ModalGestionDatos } from './ModalGestionDatos'
import { ModalNewWork } from '../works/ModalNewWork'
import { ModalNewPost } from '../posts/ModalNewPost'

export const ActionsService = ({ idUserService, uidService }) => {
    const { user } = useSelector((state) => state.auth)
    return (
        <>
            {user.uid === idUserService ? (
                <>
                    <button className="btn btn-success mt-1 ">
                        {' '}
                        Gestión de Citas
                    </button>
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
        </>
    )
}
