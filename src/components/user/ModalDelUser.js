import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import Swal from 'sweetalert2'

export const ModalDelUser = ({ idModal }) => {
    const [formValues, handleInputChange, reset] = useForm({
        email: '',
        password: '',
    })

    const { email, password } = formValues
    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            Swal.fire('Error', 'No se corresponde con un email', 'error')
            return false
        } else if (password.length === 0) {
            Swal.fire('Error', 'No se ha introducido la contraseña', 'error')
            return false
        }

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        isFormValid()
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
                            <input
                                className="form-control mt-1"
                                autoComplete="off"
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                            />
                            <input
                                className="form-control mt-1"
                                autoComplete="off"
                                type="Password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                            <button
                                type="submit"
                                className="btn btn-danger mt-1"
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
