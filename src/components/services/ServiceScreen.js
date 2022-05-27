import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import './service.css'
import { useDispatch, useSelector } from 'react-redux'
import { getServiceById } from '../../actions/services'
import { ActionsService } from './ActionsService'
import { PostsList } from '../posts/PostsList'
import { isMobile } from 'react-device-detect'
import { Comments } from './../comments/CommentsService'

export const ServiceScreen = () => {
    //Identificador del servicio de la url
    const { idService } = useParams()

    const dispatch = useDispatch()
    const { visitedServices, userServices, loaded, serviceErrorServer } =
        useSelector((state) => state.services)

    useEffect(() => {
        if (
            !(userServices.filter((s) => s.uid === idService).length === 1) &&
            visitedServices.filter((s) => s.uid === idService).length === 0
        )
            dispatch(getServiceById(idService))
    }, [idService])

    if (
        serviceErrorServer &&
        visitedServices.filter((s) => s.uid === idService).length === 0
    ) {
        return <h1 className="error">El servicio buscado no existe</h1>
    }

    let service = ''
    let cityName = ''
    let street = ''
    let postalCode = ''

    if (
        loaded &&
        (visitedServices.filter((s) => s.uid === idService).length !== 0 ||
            userServices.filter((s) => s.uid === idService).length === 1)
    ) {
        service = visitedServices.find((s) => s.uid === idService)
        if (service === undefined)
            service = userServices.find((s) => s.uid === idService)
        cityName = encodeURIComponent(service.localization.cityName)
        street = encodeURIComponent(service.localization.street)
        postalCode = service.localization.postalCode
    }

    let classVar = 'ms-2 me-2 mt-3'
    if (!isMobile) classVar = 'container mt-3'

    return (
        <main>
            {/*Cabecera*/}
            <div className="container-front-image">
                <img
                    src="https://res.cloudinary.com/tfgbartozambrana/image/upload/v1652179082/hair-gadc3cfa92_1280_vdd7ik.jpg"
                    alt="Peluquería"
                />
                <h1 className="caption">{service.serviceName}</h1>
            </div>

            <div className="container">
                {/* 
                    Primera sección de la página.
                    Descripción del servicio acciones que el usuario puede realizar y mapa de su localización 
                */}
                <div className="row shadow p-3 mt-3 mb-5 bg-body rounded">
                    {/*Descripción del servicio*/}
                    <div className="col-lg-4 col-md-12 col-12">
                        <p>{service.serviceInfo}</p>
                    </div>

                    <div className="col-lg-2 col-md-4 col-12 justify-content-around d-flex flex-column">
                        <ActionsService service={service} />
                    </div>
                    <div className="col-lg-6 col-md-8 col-12 mt-1 ">
                        {loaded && (
                            <iframe
                                className="w-100"
                                height="350"
                                src={
                                    'http://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3141.0566588180814!2d-3.3161796837420376!3d38.06906157970678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6ef1a351173d7f%3A0xb007cd0c804e83c7!2s' +
                                    postalCode +
                                    '%20' +
                                    cityName +
                                    '%20' +
                                    street +
                                    '!5e0!3m2!1ses!2ses!4v1652178258048!5m2!1ses!2ses'
                                }
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
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
                    </aside>
                </div>
            </div>
        </main>
    )
}
