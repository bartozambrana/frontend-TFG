import Swal from 'sweetalert2'
import { loadingClose, loadingOpen } from '../helpers/SwalNotifications'
import { types } from '../types/types'
//const baseUrl = process.env.REACT_APP_API_URL;
const baseUrl = process.env.REACT_APP_API_URL_DEV

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const url = baseUrl + '/auth/login'
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const body = await resp.json()

        if (body.success) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(
                login({
                    user: {
                        uid: body.user.uid,
                        type: body.user.type,
                        email: body.user.email,
                        followServices: body.user.followServices,
                        userName: body.user.userName,
                    },
                })
            )
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startRegister = (email, password, userName, type) => {
    return async () => {
        //Aclaración, si es empresario hay que dar de alta también el servicio añadido.
        const url = baseUrl + '/users'

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, email, password, type }),
        })

        const body = await resp.json()
        if (body.success) {
            Swal.fire(
                'Exísto',
                'Puede iniciar sesión cuando lo desee',
                'success'
            )
        } else {
            Swal.fire('Error', body.errors[0].msg, 'error')
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const url = baseUrl + '/users'

        //Obtengo el token del localStrorage
        const token = localStorage.getItem('token') || ''

        const resp = await fetch(url, {
            method: 'GET',
            headers: { token: token },
        })

        const body = await resp.json()
        if (body.success) {
            dispatch(
                login({
                    user: body.user,
                })
            )
        } else dispatch(checkingFinish())
    }
}

const checkingFinish = () => ({ type: types.checkingFinish })

export const login = (user) => {
    return {
        type: types.login,
        payload: user,
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch(logout())
    }
}

const logout = () => ({ type: types.logout })

export const putUser = (email, password, type, userName = '') => {
    return async (dispatch) => {
        //Notificación de que se está enviando la información al servidor.
        Swal.fire({
            title: 'Actualizando...',
            didOpen() {
                Swal.showLoading()
            },
            didClose() {
                Swal.hideLoading()
            },
            allowEnterKey: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
        })
        let objectToJson = {}
        if (userName !== '') objectToJson = { userName }

        if (email !== '' && password !== '')
            objectToJson = { ...objectToJson, email, password, type }
        else if (email === '' && password !== '')
            objectToJson = { ...objectToJson, password, types }
        else if (password === '' && email !== '')
            objectToJson = { ...objectToJson, email, type }
        else objectToJson = { ...objectToJson, type }

        //Peteción al servidor de modificación de datos.
        const response = await fetch(baseUrl + '/users/', {
            method: 'PUT',
            headers: {
                token: localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectToJson),
        })

        // Cerramos la notificación.
        Swal.close()

        //Obtenemos el cuerpo de la peteción.
        const body = await response.json()

        //Veamos el resultado obtenido.
        if (body.success) {
            // Realizamos el resto de operaciones oportunas para que el frontend funcione
            // Como es almacenar los datos nuevos del usuario sin necesidad de tener que
            // realizar de nuevo una petición al servidor para obtener sus datos.

            dispatch(puttingUser(body.user))
            Swal.fire('Éxito', 'Datos actualizados', 'success')
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            // O el token introducido es inválido o es vacío => caducó la sesión.

            dispatch(startLogout()) //Limpiamos todos los reducers
            Swal.fire('Error', 'La sesión caducó', 'error')
        } else {
            //Informamos del error que ha ocurrido al usuario.
            Swal.fire('Error', body.errors[0].msg, 'error')
        }
    }
}

const puttingUser = (user) => {
    return {
        type: types.putUser,
        payload: user,
    }
}

export const confirmDelUser = (email, password, uidUser) => {
    return async (dispatch) => {
        const response = await fetch(baseUrl + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const body = await response.json()

        if (body.success) {
            //Renovamos tokens
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            //Eliminación del usuario
            dispatch(delUser(email, password, uidUser))
        } else {
            Swal.fire('Error', 'Confirmación fallida', 'error')
        }
    }
}

const delUser = () => {
    return async (dispatch) => {
        loadingOpen('Eliminando ...')

        const response = await fetch(baseUrl + '/users/', {
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        loadingClose()

        const body = await response.json()
        if (body.success) {
            Swal.fire('Éxito', 'Usuario eliminado', 'success')
            //Cerramos sesión
            dispatch(startLogout())
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            // O el token introducido es inválido o es vacío => caducó la sesión.

            dispatch(startLogout()) //Limpiamos todos los reducers
            Swal.fire('Error', 'La sesión caducó', 'error')
        } else {
            //Informamos del error que ha ocurrido al usuario.
            Swal.fire('Error', body.errors[0].msg, 'error')
        }
    }
}

export const getHomeContent = (servedPosts, servedWorks) => {
    return async (dispatch) => {
        //Notificación de que se está procesando la información.
        loadingOpen('Cargando contenido ...')
        //Peteción al servidor.
        let url = baseUrl + '/users/randomContent/?'
        if (servedPosts !== '') url += '&servedPosts=' + servedPosts
        if (servedWorks !== '') url += '&servedWorks=' + servedWorks

        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        //Cerramos notificación.
        loadingClose()

        //Cuerpo de la response.
        const body = await response.json()

        let moreContent = true
        if (servedPosts === '' && servedWorks === '') moreContent = false
        if (body.success) {
            dispatch(setHomeContent(body.homeContent, moreContent))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            // O el token introducido es inválido o es vacío => caducó la sesión.
            dispatch(startLogout()) //Limpiamos todos los reducers
            Swal.fire('Error', 'La sesión caducó', 'error')
        } else {
            //Informamos del error que ha ocurrido al usuario.
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

const setHomeContent = (homeContent, moreContent) => {
    if (moreContent)
        return {
            type: types.getMoreHomeContent,
            payload: homeContent,
        }

    return {
        type: types.getHomeContent,
        payload: homeContent,
    }
}
