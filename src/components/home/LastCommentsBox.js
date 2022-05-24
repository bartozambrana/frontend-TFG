// Incluye la lógica de solicitar los comentarios si no han sido soliciatados.

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCommentsUser } from '../../actions/comment'
import { CommentItem } from '../comments/CommentItem'

// así como de mostrar los últimos 10 comenatrios.
export const LastCommentsBox = () => {
    //Lanzador de acciones.
    const dispatch = useDispatch()
    //Se realiza una única vez.
    const { loaded, userComments } = useSelector((state) => state.comments)

    //Se realiza una única vez, cuando se carga la página.
    useEffect(() => {
        if (!loaded) dispatch(getCommentsUser())
    }, [])

    let comments = []
    if (loaded) comments = userComments.slice(0, 5)

    return (
        <div className="shadow-sm p-3 mb-5 bg-body rounded mt-3 text-center">
            <h1 className="h1__home">Últimos comentarios:</h1>
            <ul className="list-group list-group-flush">
                {loaded &&
                    comments.map((comment, idx) => {
                        return (
                            <li
                                key={'CommentHome' + idx}
                                className="list-group-item"
                            >
                                <CommentItem
                                    bussiness={comment.idService.serviceName}
                                    bussinessId={comment.idService._id}
                                    description={comment.text}
                                    uid={comment.uid}
                                />
                            </li>
                        )
                    })}
                {loaded && userComments.length === 0 && (
                    <li className="alert alert-info">
                        Aún no posee ningún comentario.
                    </li>
                )}
            </ul>
            {userComments.length > 0 && (
                <Link
                    className="btn mt-3 see-more link-no-decoration-black"
                    to="/comments"
                >
                    <i
                        className="fa fa-chevron-circle-down"
                        aria-hidden="true"
                    ></i>{' '}
                    Ver más
                </Link>
            )}
        </div>
    )
}
