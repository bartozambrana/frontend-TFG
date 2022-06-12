import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
        cityName = service.localization.cityName
        street = service.localization.street
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
                    <div
                        className="col-lg-6 col-md-8 col-12 mt-1 "
                        style={{ height: '250px' }}
                    >
                        {loaded && (
                            <MyMap
                                address={
                                    street +
                                    ' ' +
                                    cityName +
                                    ' ' +
                                    postalCode.toString()
                                }
                            />
                        )}
                        {
                            <p className="text-center">
                                {street +
                                    ' ' +
                                    cityName +
                                    ' ' +
                                    postalCode.toString()}
                            </p>
                        }
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
