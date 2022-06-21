import { useForm } from '../../hooks/useForm'

import { useDispatch } from 'react-redux'
import { confirmDelService } from '../../actions/services'
import { swallError } from '../../helpers/SwalNotifications'

export const ModalDelService = ({ idModal, service }) => {
    const dispatch = useDispatch()
    const [formValues, handleInputChange, reset] = useForm({
        name: '',
    })

    const { name } = formValues
    const isFormValid = () => {
        if (name !== service.serviceName) {
            swallError('El nombre no coincide')
            return false
        }

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(confirmDelService(service.uid))
        }
        reset()
    }

    const handleReset = () => {
        reset()
    }
    return (
        <div
            className="modal fadel"
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
                            Confirmación de borrado.
                        </h5>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form className="form-group" onSubmit={handleSubmit}>
                            <div className="alert alert-info">
                                <p>
                                    Está a punto de borrar el servicio:{' '}
                                    <strong>{service.serviceName}</strong>
                                </p>

                                <p>¿Está seguro de la eliminación del mismo?</p>

                                <p>
                                    En el caso de estarlo introduzca el nombre
                                    del servicio.
                                </p>
                            </div>
                            <input
                                className="form-control mt-1"
                                autoComplete="off"
                                type="text"
                                placeholder="Nombre del servicio"
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                            />

                            <button
                                type="submit"
                                className="btn btn-danger mt-2"
                                data-bs-dismiss="modal"
                            >
                                Confirmar
                            </button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleReset}
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
