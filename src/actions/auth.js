import {
    loadingClose,
    loadingOpen,
    swallError,
    swallSuccess,
} from '../helpers/SwalNotifications'
import { types } from '../types/types'
//const baseUrl = process.env.REACT_APP_API_URL__DEV;
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
            swallError(body.msg)
        }
    }
}

export const startRegister = (
    email,
    password,
    userName,
    type,
    postNotifications = true
) => {
    return async () => {
        //Aclaración, si es empresario hay que dar de alta también el servicio añadido.
        const url = baseUrl + '/users'

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName,
                email,
                password,
                type,
                postNotifications,
            }),
        })

        const body = await resp.json()
        if (body.success) {
            swallSuccess('Puede iniciar sesión cuando lo desee.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const url = baseUrl + '/users/'

        //Obtengo el token del localStrorage
        const token = localStorage.getItem('token') || ''

        const resp = await fetch(url, {
            method: 'GET',
            headers: { token },
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

export const putUser = (
    email,
    password,
    type,
    userName = '',
    postNotifications = true
) => {
    return async (dispatch) => {
        //Notificación de que se está enviando la información al servidor.
        loadingOpen('Actualizando ...')

        let objectToJson = { postNotifications }
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
        loadingClose()

        //Obtenemos el cuerpo de la peteción.
        const body = await response.json()

        //Veamos el resultado obtenido.
        if (body.success) {
            // Realizamos el resto de operaciones oportunas para que el frontend funcione
            // Como es almacenar los datos nuevos del usuario sin necesidad de tener que
            // realizar de nuevo una petición al servidor para obtener sus datos.

            dispatch(puttingUser(body.user))
            swallSuccess('Datos actualizados correctamente.')
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            // O el token introducido es inválido o es vacío => caducó la sesión.

            dispatch(startLogout()) //Limpiamos todos los reducers
            swallError('Su sesión ha caducado.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
    }
}

const puttingUser = (user) => {
    return {
        type: types.putUser,
        payload: user,
    }
}

export const confirmDel = (email, password, service = false) => {
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
            if (!service) dispatch(delUser())
        } else {
            swallError('Confirmación fallida')
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
            swallSuccess('Usuario eliminado correctamente.')
            //Cerramos sesión
            dispatch(startLogout())
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            // O el token introducido es inválido o es vacío => caducó la sesión.

            dispatch(startLogout()) //Limpiamos todos los reducers
            swallError('La sesión ha caducado')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
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
            swallError('Su sesión ha caducado')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
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

//Método encargado de obtener las recomendaciones para el usuario.
export const getRecommendations = (nRecommendations) => {
    return async (dispatch) => {
        const response = await fetch(
            baseUrl + '/users/recommendations/' + nRecommendations,
            {
                method: 'GET',
                headers: { token: localStorage.getItem('token') },
            }
        )

        const body = await response.json()
        if (body.success) {
            dispatch(setRecommendation(body.recommendation))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            // O el token introducido es inválido o es vacío => caducó la sesión.
            dispatch(startLogout()) //Limpiamos todos los reducers
            swallError('Su sesión ha caducado')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
    }
}

const setRecommendation = (recommendation) => {
    return {
        type: types.getRecommendation,
        payload: recommendation,
    }
}
