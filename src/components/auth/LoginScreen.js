import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { startLogin } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {
    const dispatch = useDispatch()

    const [formValues, handleInputChange] = useForm({ email: '', password: '' })
    const { email, password } = formValues

    const handleLogin = (e) => {
        e.preventDefault()
        console.log('handleLogin')
        dispatch(startLogin(email, password))
    }

    return (
        <>
            <h3 className="auth-title">Inicio de Sesión</h3>
            <form className="form-group" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    className="form-control w-100 mt-3 "
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    autoComplete="off"
                    className="form-control w-100 mt-3"
                    value={password}
                    onChange={handleInputChange}
                />

                <button type="submit" className="btn btn-outline-dark mt-3">
                    LogIn
                </button>
            </form>

            <Link className="text-end link-dark" to="/auth/register">
                Crear nuevo usuario
            </Link>
        </>
    )
}
