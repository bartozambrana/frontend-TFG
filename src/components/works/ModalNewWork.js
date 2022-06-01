import { useDispatch } from 'react-redux'

import { postWork } from '../../actions/works'
import { swallError } from '../../helpers/SwalNotifications'

import { useForm } from '../../hooks/useForm'

export const ModalNewWork = ({ idService, idModal }) => {
    const dispatch = useDispatch()

    //Establecemos los campos del formulario;
    const [formValues, handleInputChange] = useForm({
        fileUploads: [],
        description: '',
    })

    //Establecemos los campos del formulario
    const { fileUploads, description } = formValues

    //Verificacion de los campos del formulario.
    const isFormValid = () => {
        if (description.trim().length === 0) {
            swallError('Descripción no añadida')
            return false
        } else if (fileUploads.length === 0) {
            swallError('No se ha añadido ninguna imagen')
            return false
        }

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(postWork(fileUploads, description, idService))
        }
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
                            Formulario de nuevo trabajo.
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form className="form-group" onSubmit={handleSubmit}>
                            <label
                                className="text-center mt-1 w-100"
                                style={{ color: '#6c757d' }}
                            >
                                Descripción del trabajo:
                                <textarea
                                    type="text"
                                    placeholder="Añada una descripción del trabajo"
                                    name="description"
                                    autoComplete="off"
                                    className="form-control w-100 mt-2"
                                    value={description}
                                    onChange={handleInputChange}
                                />
                            </label>

                            <label
                                className="text-center mt-1 w-100"
                                style={{ color: '#6c757d' }}
                            >
                                Añada fotografías deseadas
                                <input
                                    className="form-control"
                                    type="file"
                                    name="fileUploads"
                                    placeholder=""
                                    files={fileUploads}
                                    onChange={handleInputChange}
                                    multiple
                                />
                            </label>

                            <button
                                type="submit"
                                className="btn btn-outline-primary mt-3"
                                data-bs-dismiss="modal"
                            >
                                Añadir el trabajo servicio
                            </button>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
