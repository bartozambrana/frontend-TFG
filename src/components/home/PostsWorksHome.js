import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomeContent } from '../../actions/auth'
import { GalleryItem } from '../galery/GalleryItem'
import { PostItem } from '../posts/PostItem'

export const PostsWorksHome = () => {
    //Lanazador de acciones.
    const dispatch = useDispatch()

    // Objeto del usuario.
    const { user } = useSelector((state) => state.auth)

    // Efecto secundario cuando entremos en la página por primera vez, cargamos el contenido de la página,
    // a no se que este ya se encuentre cargado.
    useEffect(() => {
        if (user && !user.homeContent)
            //Usuario definido pero no su contenido del home
            dispatch(getHomeContent('', '')) //Aún no se ha servido nada.
    }, [])

    //Obtener más contenido.
    const handleMoreContent = () => {
        //Realizamos un listado de los posts y servicios que ya han sido servidos.
        let servedPosts = ''
        let servedWorks = ''

        user.homeContent.map((element) => {
            if (element.caption)
                if (servedPosts === '')
                    //posts
                    servedPosts = element.uid
                else servedPosts = servedPosts + ';' + element.uid
            //Works
            else if (servedWorks === '') servedWorks = element.uid
            else servedWorks = servedWorks + ';' + element.uid
        })

        //Solicitamos más contenido.
        dispatch(getHomeContent(servedPosts, servedWorks))
    }
    return (
        <>
            {user.homeContent &&
                user.homeContent.map((element, idx) => {
                    if (element.caption)
                        //Solo los posts tiene título
                        return (
                            <PostItem
                                post={element}
                                key={'HomeElement' + idx}
                            />
                        )
                    //Es un trabajo

                    return (
                        <GalleryItem
                            key={'HomeElement' + idx}
                            images={element.photos}
                            description={element.description}
                            uid={element.uid}
                            idService={element.idService}
                        />
                    )
                })}

            {user.mumElementsReceived === 0 ? (
                <div
                    className="alert alert-info"
                    style={{ fontSize: '1.8rem' }}
                >
                    No disponemos de más contenido ahora mismo.
                    <br />
                    Gracias por visitarnos.
                </div>
            ) : (
                <div className="text-center">
                    <button
                        className="btn mt-3 see-more text"
                        onClick={handleMoreContent}
                    >
                        <i
                            className="fa fa-chevron-circle-down"
                            aria-hidden="true"
                        ></i>{' '}
                        Ver más
                    </button>
                </div>
            )}
        </>
    )
}
