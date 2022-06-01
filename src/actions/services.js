import {
    loadingClose,
    loadingOpen,
    swallError,
    swallSuccess,
} from '../helpers/SwalNotifications'

import { types } from '../types/types'
import { startLogout } from './auth'

const url = process.env.REACT_APP_API_URL_DEV + '/services/'

export const getValidCategories = () => {
    return async (dispatch) => {
        const response = await fetch(url + 'validCategories', {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        const body = await response.json()

        if (body.success) {
            dispatch(setValidCategories(body.categories))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            swallError('Su sesión ha caducado.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
    }
}

const setValidCategories = (categories) => {
    return {
        type: types.getValidCategories,
        payload: categories,
    }
}

export const addNewService = (
    serviceName,
    serviceInfo,
    serviceCategory,
    street,
    postalCode,
    cityName
) => {
    return async (dispatch) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token'),
            },
            body: JSON.stringify({
                serviceName,
                serviceInfo,
                serviceCategory,
                street,
                postalCode,
                cityName,
            }),
        })

        const body = await response.json()

        if (body.success) {
            dispatch(setNewService(body.service))
            swallSuccess('Servicio creado correctamente.')
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            swallError('Su sesión ha caducado.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
    }
}

const setNewService = (service) => {
    return {
        type: types.postService,
        payload: service,
    }
}

export const getServicesUser = () => {
    return async (dispatch) => {
        const response = await fetch(url + 'userServices/', {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        const body = await response.json()

        if (body.success) {
            dispatch(setServicesUser(body.services))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            swallError('Su sesión ha caducado.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
    }
}

const setServicesUser = (services) => {
    return {
        type: types.getServicesUser,
        payload: services,
    }
}

export const getServiceById = (id) => {
    return async (dispatch) => {
        const response = await fetch(url + id, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        const body = await response.json()

        if (body.success) {
            dispatch(setServiceById(body.service))
            dispatch({ type: types.setServiceError, payload: false })
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            swallError('Su sesión ha caducado.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
    }
}

const setServiceById = (service) => {
    return {
        type: types.getServiceById,
        payload: service,
    }
}

export const putService = (
    serviceCategory,
    serviceInfo,
    cityName,
    street,
    postalCode,
    uid
) => {
    return async (dispatch) => {
        const response = await fetch(url + uid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token'),
            },
            body: JSON.stringify({
                serviceCategory,
                serviceInfo,
                cityName,
                street,
                postalCode,
            }),
        })

        const body = await response.json()

        if (body.success) {
            dispatch(setUpdateService(body.service))
            swallSuccess('Servicio actualizado correctamente.')
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            swallError('Su sesión ha caducado.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
    }
}

const setUpdateService = (service) => {
    return {
        type: types.putService,
        payload: service,
    }
}

export const getAvaliableCategories = () => {
    return async (dispatch) => {
        const response = await fetch(url + 'categories/', {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        const body = await response.json()

        if (body.success) {
            dispatch(setAvaliableCategories(body.categories))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            swallError('Su sesión ha caducado.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
    }
}

const setAvaliableCategories = (categories) => {
    return {
        type: types.getAvaliableCategories,
        payload: categories,
    }
}

export const followUnfollow = (service) => {
    return async (dispatch) => {
        // Mostramos la notificación.
        loadingOpen('Añadiendo servicio a seguidos')

        // Realizamos petición de seguimiento.
        const response = await fetch(url + '/follow-unfollow/' + service.uid, {
            method: 'POST',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        // Cerramos notificación
        loadingClose()

        //Obtenemos la respuesta
        const body = await response.json()

        if (body.success) {
            dispatch(setFollowUnfollow(body.followService, service))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            swallError('Su sesión ha caducado.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
    }
}

const setFollowUnfollow = (follow, service) => {
    if (follow) {
        return {
            type: types.followService,
            payload: service,
        }
    }

    return {
        type: types.unfollowService,
        payload: service.uid,
    }
}
