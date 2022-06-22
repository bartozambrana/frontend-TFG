import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import './service.css'
import { useDispatch, useSelector } from 'react-redux'
import { getServiceById } from '../../actions/services'
import { ActionsService } from './ActionsService'
import { PostsList } from '../posts/PostsList'
import { isMobile } from 'react-device-detect'
import { Comments } from './../comments/CommentsService'
import { ShowRating } from './ShowRating'
import { MyMap } from './MyMap'

export const ServiceScreen = () => {
    //Variables a utilizar.
    const { visitedServices, userServices, loaded, serviceErrorServer } =
        useSelector((state) => state.services)

    //Descripción del servicio.
    //Identificador del servicio de la url
    const { idService } = useParams()

    //Lanzador de acciones.
    const dispatch = useDispatch()

    useEffect(() => {
        if (
            !(userServices.filter((s) => s.uid === idService).length === 1) &&
            visitedServices.filter((s) => s.uid === idService).length === 0
        )
            dispatch(getServiceById(idService))
    }, [idService])

    const handleSetService = () => {
        if (
            loaded &&
            (visitedServices.filter((s) => s.uid === idService).length !== 0 ||
                userServices.filter((s) => s.uid === idService).length === 1)
        ) {
            service = userServices.find((s) => s.uid === idService)
            if (service === undefined)
                service = visitedServices.find((s) => s.uid === idService)
        }
    }

    //Establecemos el servicio que se está viendo.
    let service = ''
    handleSetService()

    //Actualizamos la información del servicio si el usuario cambia algo sobre él.
    useEffect(() => {
        handleSetService()
    }, [userServices])

    let classVar = 'ms-2 me-2 mt-3'
    if (!isMobile) classVar = 'container mt-3'

    //Comprobamos si el servicio existe.
    if (
        serviceErrorServer &&
        visitedServices.filter((s) => s.uid === idService).length === 0 &&
        userServices.filter((s) => s.uid === idService).length === 0
    ) {
        return (
            <main>
                <div className="container">
                    <h1 className="error alert alert-danger text-center container mt-5">
                        El servicio buscado no existe.
                    </h1>
                    <div className="d-flex justify-content-center">
                        <p
                            style={{ fontSize: '1.5rem' }}
                            className="mt-3 text-center"
                        >
                            Vuelva al inicio si lo desea.
                        </p>

                        <button
                            className="btn btn-success ms-5 mt-3"
                            style={{ height: '50%' }}
                        >
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                                to="/"
                            >
                                Inicio
                            </Link>
                        </button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main>
            {/*Cabecera*/}
            <div className="container-front-image">
                <img
                    src="https://res.cloudinary.com/tfgbartozambrana/image/upload/v1652179082/hair-gadc3cfa92_1280_vdd7ik.jpg"
                    alt="Peluquería"
                />
                <h1
                    className="caption"
                    style={{
                        color: 'white',
                        fontSize: '3rem',
                        textShadow: '2px 2px black',
                    }}
                >
                    {service.serviceName}
                </h1>
            </div>

            <div className="container">
                {/* 
                    Primera sección de la página.
                    Descripción del servicio acciones que el usuario puede realizar y mapa de su localización 
                */}
                <div className="row shadow p-3 mt-3 mb-5 bg-body rounded pb-4">
                    {/*Descripción del servicio*/}
                    <div className="col-lg-4 col-md-12 col-12">
                        {
                            <p style={{ whiteSpace: 'pre-wrap' }}>
                                {service.serviceInfo}
                            </p>
                        }
                    </div>

                    <div className="col-lg-2 col-md-4 col-12 justify-content-around d-flex flex-column pb-3">
                        <ActionsService service={service} />
                    </div>
                    <div
                        className="col-lg-6 col-md-8 col-12 mt-1 "
                        style={{ height: '250px' }}
                    >
                        {loaded && service !== '' && (
                            <>
                                <MyMap
                                    address={
                                        service.localization.street +
                                        ' ' +
                                        service.localization.postalCode.toString() +
                                        ' ' +
                                        service.localization.cityName
                                    }
                                />
                                <p className="text-center">
                                    {service.localization.street +
                                        ' ' +
                                        service.localization.postalCode.toString() +
                                        ' ' +
                                        service.localization.cityName}
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* 
                    Segunda sección de la página:
                    Se compone de los posts del servicio y comentarios recibidos del msimo. 
                */}
            </div>

            <div className={classVar}>
                <div className="row">
                    {/* Sección de listado de posts */}
                    <div className="col-lg-8 col-12">
                        <PostsList />
                    </div>
                    <aside className="col-lg-4 col-12">
                        <Comments />
                        <ShowRating idService={idService} />
                    </aside>
                </div>
            </div>
        </main>
    )
}
