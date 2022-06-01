import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { postReplyComment } from '../../actions/comment'
import { swallError } from '../../helpers/SwalNotifications'
import { useForm } from '../../hooks/useForm'

import '../../style.css'
import { Reply } from '../reply/Reply'
import { ModalDelComment } from './ModalDelComment'
import { ModalEditComment } from './ModalEditComment'

const style = {
    user: {
        backgroundColor: 'rgb(39, 162, 178)',
        color: 'white',
        fontSize: '1.05rem',
    },
    userReply: {
        backgroundColor: 'rgb(39, 162, 178)',
        color: 'white',
        fontSize: '0.85rem',
    },
    comment: {
        padding: '0px 5px 0px 5px',
    },
    btn: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
    },
}

export const CommentItem = ({ comment }) => {
    //Lanzador de acciones
    const dispatch = useDispatch()
    //Mostrar las respuestas.
    const [showReplies, setShowReplies] = useState(false)
    //Mostrar formulario de respuesta.
    const [reply, setReply] = useState(false)
    //Campos dle formulario de respuesta.
    const [formValues, handleInputChange, reset] = useForm({
        text: '',
    })
    const { text } = formValues

    //Variables para mostrar o no el botón para responder.
    const { userServices, visitedServices } = useSelector(
        (state) => state.services
    )
    const { user } = useSelector((state) => state.auth)
    const { idService } = useParams()

    let ownerService = false
    if (
        userServices &&
        userServices.filter((s) => s.uid === idService).length !== 0
    )
        ownerService = true

    //Valdiación del formulario.
    const isFormValid = () => {
        if (text.trim().length === 0) {
            swallError('No ha introducido una respuesta al comentario ...')
            return false
        }
        return true
    }

    //Establecer la respuesta en el sistea.
    const handleDoReply = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(postReplyComment(comment.uid, text))
            reset()
            setReply(!reply)
        }
    }

    return (
        <div style={style.comment}>
            {/* Cabecera autor del comentario e icono. */}
            <div
                className=" d-flex justify-content-center rounded"
                style={style.user}
            >
                <p className="mb-0">
                    {' '}
                    <i className="fa fa-user-o" aria-hidden="true"></i>{' '}
                    {comment.author.userName}
                </p>
            </div>
            {/* Texto del comentario e icono del desplegable de las respuestas al msimo. */}
            <div>
                <div className="d-flex justify-content-between rounded border border-bottom mb-1">
                    <p className="mb-0 ms-2">{comment.text}</p>
                    {/* Botones uno para responder al comentario y otro para el desplegable de las respuestas. */}
                    <div className="d-flex justify-content-around">
                        {comment.replyTo.length !== 0 && (
                            <button
                                className="btn me-2"
                                style={{
                                    backgroundColor: 'transparent',
                                    padding: '0px 0px 0px 0px',
                                }}
                                onClick={() => setShowReplies(!showReplies)}
                            >
                                <i
                                    className="fa fa-sort-desc"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        )}
                        {/*
                            Se mostrará el botón de respuesta solo cuando.
                            es el dueño del servicio.
                            en el caso de un usuario normal si el comentario es suyo y el dueño le contestó a dicho usuario.
                        */}
                        {(ownerService ||
                            (comment.author.userName === user.userName &&
                                comment.replyTo.length !== 0 &&
                                comment.replyTo[comment.replyTo.length - 1]
                                    .author.serviceName &&
                                comment.replyTo[comment.replyTo.length - 1]
                                    .author.serviceName ===
                                    visitedServices.find(
                                        (s) => s.uid === idService
                                    ).serviceName)) && (
                            <button
                                className="btn me-2"
                                style={{
                                    backgroundColor: 'transparent',
                                    padding: '0px 0px 0px 0px',
                                }}
                                onClick={() => setReply(!reply)}
                            >
                                <i
                                    className="fa fa-reply"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        )}
                    </div>
                    {
                        /* Botones para modificar el comentario en el caso de que si sea posible
                        Será posible modificar el comentario si no posee una contestación.
                        Solo será posible modificarlo por su author.
                    */
                        comment.author.userName === user.userName &&
                            comment.replyTo.length === 0 && (
                                <div className="d-flex justify-content-end">
                                    <button
                                        className="btn"
                                        style={style.btn}
                                        data-bs-toggle="modal"
                                        data-bs-target={
                                            '#modalCommentEditService' +
                                            comment.uid
                                        }
                                    >
                                        <i
                                            className="fa fa-pencil-square-o ms-3"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                    <ModalEditComment
                                        uid={comment.uid}
                                        description={comment.text}
                                        id={
                                            'modalCommentEditService' +
                                            comment.uid
                                        }
                                    />
                                    <button
                                        className="btn"
                                        style={style.btn}
                                        data-bs-toggle="modal"
                                        data-bs-target={
                                            '#modalCommentDelService' +
                                            comment.uid
                                        }
                                    >
                                        <i
                                            className="fa fa-trash ms-3"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                    <ModalDelComment
                                        uid={comment.uid}
                                        description={comment.text}
                                        id={
                                            'modalCommentDelService' +
                                            comment.uid
                                        }
                                    />
                                </div>
                            )
                    }
                </div>
                {
                    /* Formulario de respuesta al comentario que se mostrará si se ha solicitado una respuesta.*/
                    reply && (
                        <div className="mb-2">
                            <form
                                className="form-group"
                                onSubmit={handleDoReply}
                            >
                                <textarea
                                    className="form-control"
                                    value={text}
                                    name="text"
                                    onChange={handleInputChange}
                                    placeholder="Respuesta al comentario"
                                />
                                <button className="btn btn-secondary mt-1">
                                    Responder
                                </button>
                            </form>
                        </div>
                    )
                }
            </div>

            {/* Respuestas del comentario */}

            {showReplies && (
                <div className=" container overflow-auto scrollbar-hidden">
                    {comment.replyTo.map((reply, idx) => (
                        <Reply
                            key={'reply' + comment.uid + idx}
                            reply={reply}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
