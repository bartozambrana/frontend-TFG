import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GalleryItem } from './GalleryItem'

import './styles.css'
import '../services/service.css'
import { useDispatch, useSelector } from 'react-redux'
import { getWorks } from '../../actions/works'
export const GalleryScreen = () => {
    const { idService } = useParams()
    const dispatch = useDispatch()
    const works = useSelector((state) => state.works)
    useEffect(() => {
        if (works.uidWorkService === '' || works.uidWorkService !== idService)
            dispatch(getWorks(idService))
    }, [dispatch, works.uidWorkService, idService])

    return (
        <>
            <div className="container-front-image">
                <img
                    src="https://res.cloudinary.com/tfgbartozambrana/image/upload/v1652269852/Galeria-Trabajos_v24mk8.jpg"
                    alt="Galería"
                />
            </div>
            <div className="container">
                {works.errorServer && (
                    <h1 className="text-center mt-1">Ese servicio no existe</h1>
                )}

                <div className="row row-cols-1 row-cols-lg-2">
                    {works.uidWorkService === idService &&
                        works.worksLastService.map((work) => {
                            return (
                                <GalleryItem
                                    key={work.uid}
                                    description={work.description}
                                    images={work.photos}
                                    uid={work.uid}
                                    idService={idService}
                                />
                            )
                        })}
                </div>
            </div>
        </>
    )
}
