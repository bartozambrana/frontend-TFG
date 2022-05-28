import { useDispatch } from 'react-redux'
import { postComment } from '../../actions/comment'
import { swallError } from '../../helpers/SwalNotifications'

import { useForm } from '../../hooks/useForm'
export const ModalNewComment = ({ idModal, idService }) => {
    const dispatch = useDispatch()
    const [formValues, handleInputChange, reset] = useForm({ text: '' })

    const { text } = formValues

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length !== 0) dispatch(postComment(idService, text))
        else swallError('No ha introducido ningún comentario.')
        reset()
    }
    return (
        <div
            className="modal fade"
            id={idModal}
            role="dialog"
            tabIndex="-1"
            aria-labelledby={idModal}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={idModal}>
                            Nuevo comentario.
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => reset()}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form className="form-group" onSubmit={handleSubmit}>
                            <textarea
                                className="form-control w-100"
                                placeholder="Escribe tu nuevo comentario"
                                name="text"
                                value={text}
                                onChange={handleInputChange}
                                autoComplete="off"
                            ></textarea>
                            <button
                                type="submit"
                                className="btn btn-primary mt-2"
                                data-bs-dismiss="modal"
                            >
                                <i
                                    className="fa fa-paper-plane-o"
                                    aria-hidden="true"
                                ></i>{' '}
                                Enviar
                            </button>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => reset()}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
