import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCommentsService } from '../../actions/comment'
import { CommentItem } from './CommentItemService'

import '../../style.css'

export const Comments = () => {
    //Obtenemos el identificador del servicio de la url en la que nos encontramos.
    const { idService } = useParams()
    //Lanzador de acciones.
    const dispatch = useDispatch()
    //Obtenemos los comentarios del sevicio anteriores.
    const { commentsService } = useSelector((state) => state.comments)

    //Cargamos los comentario de la empresa una única vez que es cuando entramos a la página si el idService ha cambiado o
    // todavía no se han obtenido ninguno.

    //El idService en el fetch se establece por seguridad, pero no tiene sentido ya que a lo largo de la instacia en esta vista.
    //no cambia su estado, es equivalente a que no tuviera dependencias.
    useEffect(() => {
        if (
            (commentsService.length !== 0 &&
                commentsService[0].idService !== idService) ||
            commentsService.length === 0
        )
            dispatch(getCommentsService(idService))
    }, [idService])

    return (
        <div
            className="shadow overflow-auto scrollbar-hidden"
            style={{ maxHeight: '500px' }}
        >
            <h1 className="h1__home text-center">Comentarios</h1>
            {commentsService.length !== 0 &&
                commentsService.map((comment, idx) => (
                    <CommentItem
                        key={'CommentService' + idx}
                        comment={comment}
                    />
                ))}
        </div>
    )
}
