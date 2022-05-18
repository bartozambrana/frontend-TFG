import React from 'react'
import { Link } from 'react-router-dom'

import '../../style.css'
export const ServiceItem = ({ service }) => {
    return (
        <div className="col">
            <Link
                to={'/service/' + service.uid}
                className="link-no-decoration-black"
            >
                <div className="card">
                    <img
                        src="https://res.cloudinary.com/tfgbartozambrana/image/upload/v1652179082/hair-gadc3cfa92_1280_vdd7ik.jpg"
                        alt="Peluquería"
                    />
                    <div className="card-body">
                        <h5 className="card-title">{service.serviceName}</h5>
                        <p className="card-text">
                            {service.serviceInfo} <br /> {service.uid}
                        </p>
                        <p className="card-text">
                            <small className="text-muted">
                                {service.localization.cityName},
                                {service.localization.postalCode} -{' '}
                                {service.localization.street}
                            </small>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
