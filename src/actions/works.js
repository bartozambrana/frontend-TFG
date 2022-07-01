import {
    loadingClose,
    loadingOpen,
    swallError,
    swallSuccess,
} from '../helpers/SwalNotifications'

import { types } from '../types/types'
import { startLogout } from './auth'

const url = process.env.REACT_APP_API_URL_DEV + '/works/'

export const getWorks = (uid) => {
    return async (dispatch) => {
        const response = await fetch(url + uid, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        const body = await response.json()

        if (body.success) {
            dispatch(gettingWorks({ uid: uid, works: body.works }))
            dispatch(setError(false))
        } else {
            swallError('No existe el servicio introducido')
            dispatch(setError(true))
        }
    }
}

export const putWork = (uid, photosDeleted, filesUpload, description) => {
    return async (dispatch) => {
        const formData = new FormData()

        if (photosDeleted !== '') formData.append('deletedFiles', photosDeleted)

        formData.append('description', description)

        for (let i = 0; i < filesUpload.length; i++) {
            formData.append('archivo' + i, filesUpload[i], filesUpload[i].name)
        }

        loadingOpen('Subiendo el contenido ...')

        const response = await fetch(url + uid, {
            method: 'PUT',
            headers: {
                token: localStorage.getItem('token'),
            },
            body: formData,
        })

        loadingClose()

        const body = await response.json()

        if (body.success) {
            dispatch(updatingWorks(body.work))
            dispatch(setError(false))
            swallSuccess('Contenido actualizado correctamente')
        } else {
            dispatch(setError(true))
            if (body.msg === 'token empty' || body.msg === 'token invalid') {
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
}

export const postWork = (filesUpload, description, uid) => {
    return async (dispatch) => {
        const formData = new FormData()

        formData.append('description', description)
        for (let i = 0; i < filesUpload.length; i++) {
            formData.append('archivo' + i, filesUpload[i], filesUpload[i].name)
        }

        loadingOpen('Subiendo el contenido ...')

        const response = await fetch(url + uid, {
            method: 'POST',
            headers: {
                token: localStorage.getItem('token'),
            },
            body: formData,
        })

        loadingClose()

        const body = await response.json()

        if (body.success) {
            dispatch(postingWork(body.work))
            swallSuccess('Contenido añadido correctamente')
            dispatch(setError(false))
        } else {
            dispatch(setError(true))
            if (body.msg === 'token empty' || body.msg === 'token invalid') {
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
}

export const deleteWork = (uidWork) => {
    return async (dispatch) => {
        loadingOpen('Eliminando el contenido ...')

        const response = await fetch(url + uidWork, {
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        loadingClose()
        const body = await response.json()

        if (body.success) {
            dispatch(deletingWork(uidWork))
            swallSuccess('Contenido eliminado correctamente')
            dispatch(setError(false))
        } else {
            dispatch(setError(true))
            if (body.msg === 'token empty' || body.msg === 'token invalid') {
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
}

const setError = (error) => {
    return {
        type: types.setError,
        payload: error,
    }
}

const gettingWorks = (response) => {
    return {
        type: types.getWorks,
        payload: response,
    }
}

const updatingWorks = (response) => {
    return {
        type: types.putWork,
        payload: response,
    }
}

const postingWork = (response) => {
    return {
        type: types.postWork,
        payload: response,
    }
}

const deletingWork = (uidWork) => {
    return {
        type: types.delWork,
        payload: uidWork,
    }
}
