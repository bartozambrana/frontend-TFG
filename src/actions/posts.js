import {
    loadingClose,
    loadingOpen,
    swallError,
    swallSuccess,
} from '../helpers/SwalNotifications'

import { types } from '../types/types'
import { startLogout } from './auth'

const url = process.env.REACT_APP_API_URL + '/posts/'

export const getPosts = (idService) => {
    return async (dispatch) => {
        //Mensaje mostrado mientras el contenido se está subiendo al servidor.
        loadingOpen('Cargando contenido ...')

        // Request al servidor.
        const response = await fetch(url + idService, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        loadingClose()

        const body = await response.json()
        // Exito en la respuesta
        if (body.success) {
            // acción de guardar el post añadido
            dispatch(gettingPosts(body.posts, idService))
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

export const postPost = (fileUpload, caption, description, idService) => {
    return async (dispatch) => {
        //Establecemos el FormData a enviar en petición
        const formData = new FormData()
        formData.append('caption', caption)
        formData.append('description', description)
        formData.append('archivo', fileUpload[0], fileUpload[0].name)

        //Mensaje mostrado mientras el contenido se está subiendo al servidor.
        loadingOpen('Subiendo contenido ...')

        //Obtenemos la respuesta
        const response = await fetch(url + idService, {
            method: 'POST',
            headers: {
                token: localStorage.getItem('token'),
            },
            body: formData,
        })

        //Cerramos notificación de carga de pantalla
        loadingClose()

        // Cuerpo de la respuesta
        const body = await response.json()

        // Exito en la respuesta
        if (body.success) {
            // acción de guardar el post añadido
            dispatch(postingPost(body.post))
            // Notificación
            swallSuccess('Contenido actualizado')
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

export const putPost = (fileUpload, caption, description, uidPost) => {
    return async (dispatch) => {
        //Establecemos el FormData a enviar en petición
        const formData = new FormData()

        if (caption.trim().length !== 0) formData.append('caption', caption)
        if (description.trim().length !== 0)
            formData.append('description', description)
        if (fileUpload.length !== 0)
            formData.append('archivo', fileUpload[0], fileUpload[0].name)

        //Mensaje mostrado mientras el contenido se está subiendo al servidor.
        loadingOpen('Actualizando contenido ...')

        //Obtenemos la respuesta
        const response = await fetch(url + uidPost, {
            method: 'PUT',
            headers: {
                token: localStorage.getItem('token'),
            },
            body: formData,
        })

        //Cerramos notificación de carga de pantalla
        loadingClose()

        // Cuerpo de la respuesta
        const body = await response.json()

        // Exito en la respuesta
        if (body.success) {
            // acción de guardar el post añadido
            dispatch(puttingPost(body.post))
            // Notificación
            swallSuccess('Contenido actualizado')
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

export const deletePost = (uidPost) => {
    return async (dispatch) => {
        //Mensaje mostrado mientras el contenido se está subiendo al servidor.
        loadingOpen('Eliminando contenido ...')

        //Obtenemos la respuesta
        const response = await fetch(url + uidPost, {
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        //Cerramos notificación de carga de pantalla
        loadingClose()

        // Cuerpo de la respuesta
        const body = await response.json()

        // Exito en la respuesta
        if (body.success) {
            // acción de guardar el post añadido
            dispatch(deletingPost(uidPost))
            // Notificación
            swallSuccess('Contenido eliminado')
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

const gettingPosts = (posts, idService) => {
    return {
        type: types.getPosts,
        payload: {
            uid: idService,
            posts: posts,
        },
    }
}
const postingPost = (post) => {
    return {
        type: types.postPost,
        payload: post,
    }
}

const puttingPost = (post) => {
    return {
        type: types.putPost,
        payload: post,
    }
}

const deletingPost = (uidPost) => {
    return {
        type: types.delPost,
        payload: uidPost,
    }
}
