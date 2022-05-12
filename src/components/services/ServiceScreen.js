import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import './service.css';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceById } from '../../actions/services';
import { ModalGestionDatos } from './ModalGestionDatos';


export const ServiceScreen = () => {
    const { idService } = useParams();
    const dispatch = useDispatch();
    const { user} = useSelector(state => state.auth)
    const { visitedServices, userServices, loaded } = useSelector(state => state.services);

    
    useEffect(() => {

        if ( !(userServices.filter(s => s.uid === idService).length === 1) &&
            (visitedServices.filter(s => (s.uid === idService)).length === 0))
            dispatch(getServiceById(idService))

    }
    , [dispatch,visitedServices,idService,userServices,user.uid, loaded])

    let service = '';
    let cityName = '';
    let street = '';
    
    if (loaded){
        service = visitedServices.find(s => s.uid === idService);
        if(!service)
            service = userServices.find(s => s.uid === idService); 
        cityName = encodeURIComponent(service.localization.cityName);
        street = encodeURIComponent(service.localization.street);
    }
        

    return (
        <>
            <div className="container-front-image" >
                <img src="https://res.cloudinary.com/tfgbartozambrana/image/upload/v1652179082/hair-gadc3cfa92_1280_vdd7ik.jpg" alt="Peluquería" />
                <h1 className="caption">{service.serviceName}</h1>
            </div>

            <div className='container'>
                <div className='row shadow p-3 mt-3 mb-5 bg-body rounded'>
                    {/*Descripción del servicio*/}
                    <div className='col-md-4 col-12'>
                        <p>{service.serviceInfo}</p>
                    </div>

                    <div className='col-md-2 col-12 justify-content-around d-flex flex-column'>
                        
                        
                        
                        {
                            (user.uid === service.idUser ) ?
                            (
                                <>
                                    <button 
                                        className='btn btn-success mt-1 '
                                    > Gestión de Citas</button>
                                    
                                    <button className='btn btn-outline-primary mt-1'>Añadir Post</button>
                                    <button className='btn btn-outline-secondary mt-1'>Añadir Trabajo </button>
                                    <button 
                                    className='btn btn-outline-danger mt-1'
                                        data-bs-toggle="modal"
                                        data-bs-target={'#EditService'+user.uid}
                                    >Gestión de datos</button>
                                    <ModalGestionDatos idService={service.uid}/>
                                </>
                                
                            )
                            :
                            (
                                <>
                                    <button className='btn btn-success mt-1 '> Pide Cita </button>
                                    <button className='btn btn-primary mt-1'> Sigueme </button>
                                </>
                            )
                        }
                        <button className='btn btn-secondary mt-1'><Link className='link-light' style={{textDecoration:'none'}}to={'/service/gallery/'+idService}>Galería</Link></button>
                    </div>
                    <div className='col-md-6 col-12 mt-1 '>
                        {/*
                            (loaded) &&
                            <iframe className='w-100' height='350' src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3141.0566588180814!2d-3.3161796837420376!3d38.06906157970678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6ef1a351173d7f%3A0xb007cd0c804e83c7!2s"
                            +service.localization.postalCode+'%20'+cityName+'%20'+street+"!5e0!3m2!1ses!2ses!4v1652178258048!5m2!1ses!2ses"} loading="lazy" referrerPolicy="no-referrer-when-downgrade" ></iframe>
                    */}
                    MAPA
                    {cityName},{street}
                    </div>
                </div>
            </div>
        </>

    )
}
