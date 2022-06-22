import {
    loadingClose,
    loadingOpen,
    swallError,
    swallSuccess,
} from '../helpers/SwalNotifications'

import { types } from '../types/types'
import { startLogout } from './auth'

const url = process.env.REACT_APP_API_URL + '/services/'

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
        const response = await fetch(url + 'userServices/?status=true', {
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
            if (body.status) {
                dispatch(setServiceById(body.service))
                dispatch({ type: types.setServiceError, payload: false })
            } else dispatch({ type: types.setServiceError, payload: true }) //El servicio que ha solicitado ha sido borrado.
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            swallError('Su sesión ha caducado.')
        } else {
            //Informamos del error que ha ocurrido al usuario el cual es que el identificador
            // o no es válido o el servicio no existe.
            dispatch({ type: types.setServiceError, payload: true })
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
    uid,
    serviceName
) => {
    return async (dispatch) => {
        let bodyJSON = null
        if (serviceName !== '')
            bodyJSON = JSON.stringify({
                serviceCategory,
                serviceInfo,
                cityName,
                street,
                postalCode,
                serviceName,
            })
        else
            bodyJSON = JSON.stringify({
                serviceCategory,
                serviceInfo,
                cityName,
                street,
                postalCode,
            })
        const response = await fetch(url + uid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token'),
            },
            body: bodyJSON,
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

export const confirmDelService = (idService) => {
    return async (dispatch) => {
        loadingOpen('Eliminando servicio ...')
        const response = await fetch(url + idService, {
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token'),
            },
        })
        loadingClose()
        const body = await response.json()
        console.log(body)
        if (body.success) {
            //Eliminamos el servicio
            dispatch(deleteService(idService))
            swallSuccess('Servicio eliminado correctamente.')
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout)
            swallError('Su sesión ha caducado.')
        } else {
            swallError('Contacte con el administrador.')
        }
    }
}

const deleteService = (idService) => {
    return {
        type: types.delService,
        payload: idService,
    }
}
