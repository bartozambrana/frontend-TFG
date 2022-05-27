import React from 'react'

import { useDispatch } from 'react-redux'
import { deleteComment } from '../../actions/comment'

export const ModalDelComment = ({ uid, description, id, reply = false }) => {
    const dispatch = useDispatch()
    const handleDeleteComment = () => {
        dispatch(deleteComment(uid, reply))
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
                        <h5 className="modal-title" id="modalDelete">
                            Eliminación de comentario.
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <h6 className="text-center"> Comentario</h6>
                        <p>{description}</p>
                    </div>

                    <div className="modal-footer">
                        <p>
                            {' '}
                            Va a eliminar el comentario mostrado,{' '}
                            <strong>¿está seguro?</strong>
                        </p>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={handleDeleteComment}
                            data-bs-dismiss="modal"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
