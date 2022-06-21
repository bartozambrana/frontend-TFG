import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import validator from 'validator'

import { startRegister } from '../../actions/auth'
import { swallError } from '../../helpers/SwalNotifications'
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {
    const dispatch = useDispatch()

    const [formValues, handleInputChange] = useForm({
        userName: '',
        password: '',
        confirmPassword: '',
        type: false,
        email: '',
        postNotification: true,
    })

    const {
        userName,
        password,
        confirmPassword,
        email,
        type,
        postNotification,
    } = formValues

    const handleRegister = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(
                startRegister(email, password, userName, type, postNotification)
            )
        }
    }

    const isFormValid = () => {
        if (userName.trim().length === 0) {
            swallError('Nombre vacío')
            return false
        } else if (!validator.isEmail(email)) {
            swallError('Email vacío')
            return false
        } else if (password !== confirmPassword || password.length < 5) {
            swallError('Las contraseñas no coinciden')
            return false
        }
        return true
    }

    return (
        <>
            <h3 className="auth-title">Registo de usuario</h3>

            <form className="form-group" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    name="userName"
                    autoComplete="off"
                    className="form-control w-100 mt-3 "
                    value={userName}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    className="form-control w-100 mt-3 "
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    className="form-control w-100 mt-3"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    autoComplete="off"
                    className="form-control w-100 mt-3"
                    value={confirmPassword}
                    onChange={handleInputChange}
                />

                <div className="form-check form-switch mt-3">
                    <label htmlFor="flexSwitchCheckDefault1">
                        <input
                            className="form-check-input"
                            id="flexSwitchCheckDefault1"
                            type="checkbox"
                            name="type"
                            checked={type}
                            onChange={handleInputChange}
                        />
                        Cliente / Empresario
                    </label>
                </div>

                <div className="form-check form-switch mt-3">
                    <label htmlFor="flexSwitchCheckDefault2">
                        <input
                            className="form-check-input"
                            id="flexSwitchCheckDefault2"
                            type="checkbox"
                            name="postNotification"
                            checked={postNotification}
                            onChange={handleInputChange}
                        />
                        Deseo recibir notificaciones de posts de los servicio
                        que sigo.
                    </label>
                </div>

                <button type="submit" className="btn btn-outline-dark mt-3">
                    Enviar
                </button>
            </form>

            <Link className="text-end link-dark" to="/auth/login">
                Iniciar Sesión
            </Link>
        </>
    )
}
