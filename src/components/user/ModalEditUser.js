import { useSelector, useDispatch } from 'react-redux'

import { putUser } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { ModalDelUser } from './ModalDelUser'
import { swallError } from '../../helpers/SwalNotifications'

export const ModalEditUser = ({ idModal }) => {
    // Dispatch para lanzar las acciones.
    const dispatch = useDispatch()

    // Usuario del que se van a modificar los datos.
    const { user } = useSelector((state) => state.auth)

    // Campos del formulario
    const [formValues, handleInputChange] = useForm({
        email: user.email,
        email2: '',
        password: '',
        password2: '',
        type: user.type,
        userName: user.userName,
        postNotifications: user.postNotifications,
    })

    // Desestructuración de campos.
    const {
        email,
        email2,
        password,
        password2,
        type,
        userName,
        postNotifications,
    } = formValues

    //Validación de campos.
    const isFormValid = () => {
        if (userName.trim().length === 0) {
            swallError('Nombre del usuario no introducido')
            return false
        } else if (
            (email !== '' && email !== email2) ||
            (email !== '' && !validator.isEmail(email))
        ) {
            swallError('Los emails introducidos no coincienden')
            return false
        } else if (password !== password2) {
            swallError('Las constraseñas no coinciden')
            return false
        }

        return true
    }
    //Submit de la petición.
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            if (user.userName === userName)
                dispatch(putUser({ email, password, type, postNotifications }))
            else
                dispatch(
                    putUser({
                        email,
                        password,
                        type,
                        userName,
                        postNotifications,
                    })
                )
        }
    }

    return (
        <>
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
                                Modificación de datos.
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form
                                className="form-group"
                                onSubmit={handleSubmit}
                            >
                                <label
                                    className="text-center w-100 mt-2"
                                    style={{ color: '#6c757d' }}
                                >
                                    Nombre de usuario:
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="userName"
                                        value={userName}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </label>

                                <div className="alert alert-info mt-3">
                                    <p>
                                        Si no estableces el email, no se te
                                        moficará el email.
                                    </p>
                                </div>

                                <label
                                    className="text-center w-100 mt-2"
                                    style={{ color: '#6c757d' }}
                                >
                                    Email:
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="email"
                                        value={email}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </label>

                                <label
                                    className="text-center w-100 mt-2"
                                    style={{ color: '#6c757d' }}
                                >
                                    Confirmación de email:
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="email2"
                                        value={email2}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </label>

                                <div className="alert alert-info mt-3">
                                    <p>
                                        Si no estableces contraseña, no se te
                                        moficará la contraseña.
                                    </p>
                                </div>
                                <label
                                    className="text-center w-100 mt-1"
                                    style={{ color: '#6c757d' }}
                                >
                                    Contraseña:
                                    <input
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        value={password}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </label>

                                <label
                                    className="text-center w-100 mt-2"
                                    style={{ color: '#6c757d' }}
                                >
                                    Confirmación de contraseña:
                                    <input
                                        type="password"
                                        autoComplete="off"
                                        name="password2"
                                        value={password2}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </label>
                                {!user.type && (
                                    <div className="form-check form-switch mt-3">
                                        <label htmlFor="flexSwitchCheckDefault">
                                            <input
                                                className="form-check-input"
                                                id="flexSwitchCheckDefault"
                                                type="checkbox"
                                                name="type"
                                                checked={type}
                                                onChange={handleInputChange}
                                            />
                                            Cliente / Empresario
                                        </label>
                                    </div>
                                )}

                                <div className="form-check form-switch mt-3">
                                    <label htmlFor="flexSwitchCheckDefault2">
                                        <input
                                            className="form-check-input"
                                            id="flexSwitchCheckDefault2"
                                            type="checkbox"
                                            name="postNotifications"
                                            checked={postNotifications}
                                            onChange={handleInputChange}
                                        />
                                        Deseo recibir notificaciones de posts de
                                        los servicio que sigo.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-outline-primary mt-3"
                                    data-bs-dismiss="modal"
                                >
                                    Modificación de usuario.
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary mt-3 ms-3"
                                    data-bs-dismiss="modal"
                                >
                                    Cancelar
                                </button>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target={'#DelUser' + user.uid}
                            >
                                <i className="fa fa-ban" aria-hidden="true"></i>
                                &nbsp;Baja de usuario
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalDelUser idModal={'DelUser' + user.uid} />
        </>
    )
}
