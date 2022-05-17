import React from 'react'
import { useDispatch } from 'react-redux'

import { updateCommentUser } from '../../actions/comment'

import { useForm } from '../../hooks/useForm'
export const ModalEditComment = ({ uid, description, bussiness, id }) => {
    const dispatch = useDispatch()
    const [formValues, handleInputChange] = useForm({ text: '' })

    const { text } = formValues

    const handleEditComment = () => {
        dispatch(updateCommentUser({ text }, uid))
    }
    return (
        <div
            className="modal fade"
            id={id}
            role="dialog"
            tabIndex="-1"
            aria-labelledby={id}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalEdit">
                            Modificación de comentario.
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <h6 className="text-center"> Comentario anterior:</h6>
                        <p className="mb-1">Servicio: {bussiness}</p>
                        <p>{description}</p>
                        <div className="form-group">
                            <textarea
                                className="form-control w-100"
                                placeholder="Escribe tu nuevo comentario"
                                name="text"
                                value={text}
                                onChange={handleInputChange}
                                autoComplete="off"
                            >
                                /
                            </textarea>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleEditComment}
                            data-bs-dismiss="modal"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
