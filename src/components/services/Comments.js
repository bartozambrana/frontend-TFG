import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

export const Comments = () => {
    const { idService } = useParams()
    //Lanzador de acciones.
    const dispatch = useDispatch()
    //Cargamos los comentario de la empresa una única vez que es cuando entramos a la página.
    useEffect(() => {
        dispatch()
    }, [idService])

    return <div>Comments</div>
}
