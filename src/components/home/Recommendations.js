import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRecommendations } from '../../actions/auth'

import '../../style.css'
import './recommendation.css'
export const Recommendations = () => {
    //Lanzador de acciones.
    const dispatch = useDispatch()
    const { recommendations } = useSelector((state) => state.auth)
    //Se una única vez en la página donde se establece cada vez que se visite, de ahí
    //que establecemos que no se realice la petición y si antes nos ha aportado una recomendación.

    useEffect(() => {
        if (recommendations.length === 0) {
            dispatch(getRecommendations(3))
        }
    }, [])

    //Mientras se está obteniendo la respuesta del servidor mostramos una animación de spiner.
    return (
        <div className="recommendation-container container mt-2">
            <h1 className="recommendation-title text-center mt-3 p-3">
                Nuestras recomendaciones
            </h1>
            {recommendations.length === 0 ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner row align-items-center mb-4"></div>
                </div>
            ) : (
                <div className="row row-cols-md-3 row-cols-1">
                    {recommendations.map((recommendation, idx) => (
                        <div className="col mb-3" key={'Recommendation' + idx}>
                            <Link
                                to={'/service/' + recommendation.uid}
                                className="link-no-decoration-black"
                            >
                                <div className="card">
                                    <img
                                        src="https://res.cloudinary.com/tfgbartozambrana/image/upload/v1652179082/hair-gadc3cfa92_1280_vdd7ik.jpg"
                                        alt="Peluquería"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {recommendation.serviceName}
                                        </h5>
                                        <p className="card-text">
                                            {recommendation.serviceInfo}
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                {
                                                    recommendation.localization
                                                        .cityName
                                                }
                                                ,
                                                {
                                                    recommendation.localization
                                                        .postalCode
                                                }{' '}
                                                -{' '}
                                                {
                                                    recommendation.localization
                                                        .street
                                                }
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
