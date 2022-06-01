import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import '../../style.css'

export const FollowServicesBox = () => {
    //Obtenemos el objeto del usuario, en el que se almacena los servicio que sigue.
    const { user } = useSelector((state) => state.auth)

    return (
        <div className="shadow-sm p-3 mb-5 bg-body rounded mt-3 text-center">
            <h1 className="h1__home">Servicios seguidos:</h1>
            <div className="overflow-auto scrollbar-hidden">
                <ul
                    className="list-group list-group-flush"
                    style={{ maxHeight: '200px' }}
                >
                    {user &&
                        user.followServices &&
                        user.followServices.map((service, idx) => (
                            <li
                                key={'followService' + idx}
                                className="list-group-item"
                            >
                                <Link
                                    to={'/service/' + service._id}
                                    className="link-no-decoration-black"
                                >
                                    <i
                                        className="fa fa-briefcase"
                                        aria-hidden="true"
                                    ></i>{' '}
                                    {service.serviceName}
                                </Link>
                            </li>
                        ))}
                    {user &&
                        user.followServices &&
                        user.followServices.length === 0 && (
                            <li className="alert alert-info">
                                Aún no sigue a ningún servicio.
                            </li>
                        )}
                </ul>
            </div>
        </div>
    )
}
