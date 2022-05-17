import Swal from 'sweetalert2'

import { types } from '../types/types'
import { startLogout } from './auth'

const url = process.env.REACT_APP_API_URL_DEV + '/posts/'

export const getPosts = (idService) => {
    return async (dispatch) => {
        //Mensaje mostrado mientras el contenido se está subiendo al servidor.
        Swal.fire({
            title: 'Obteniendo posts',
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

        // Request al servidor.
        const response = await fetch(url + idService, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        Swal.close()

        const body = await response.json()
        // Exito en la respuesta
        if (body.success) {
            // acción de guardar el post añadido
            dispatch(gettingPosts(body.posts, idService))
        } else {
            // Notificación del error establecido
            if (body.errors) Swal.fire('Error', body.errors[0].msg, 'error')
            else if (
                body.msg === 'token empty' ||
                body.msg === 'token invalid'
            ) {
                dispatch(startLogout())
                Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
            } else Swal.fire('Error', body.msg, 'error')
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
        Swal.fire({
            title: 'Subiendo el contenido ...',
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

        //Obtenemos la respuesta
        const response = await fetch(url + idService, {
            method: 'POST',
            headers: {
                token: localStorage.getItem('token'),
            },
            body: formData,
        })

        //Cerramos notificación de carga de pantalla
        Swal.close()

        // Cuerpo de la respuesta
        const body = await response.json()

        // Exito en la respuesta
        if (body.success) {
            // acción de guardar el post añadido
            dispatch(postingPost(body.post))
            // Notificación
            Swal.fire('Exito', 'Contenido actulizado', 'success')
        } else {
            // Notificación del error establecido
            if (body.errors) Swal.fire('Error', body.errors[0].msg, 'error')
            else if (
                body.msg === 'token empty' ||
                body.msg === 'token invalid'
            ) {
                dispatch(startLogout())
                Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
            } else Swal.fire('Error', body.msg, 'error')
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
        Swal.fire({
            title: 'Subiendo el contenido ...',
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

        //Obtenemos la respuesta
        const response = await fetch(url + uidPost, {
            method: 'PUT',
            headers: {
                token: localStorage.getItem('token'),
            },
            body: formData,
        })

        //Cerramos notificación de carga de pantalla
        Swal.close()

        // Cuerpo de la respuesta
        const body = await response.json()

        // Exito en la respuesta
        if (body.success) {
            // acción de guardar el post añadido
            dispatch(puttingPost(body.post))
            // Notificación
            Swal.fire('Exito', 'Contenido actulizado', 'success')
        } else {
            // Notificación del error establecido
            if (body.errors) Swal.fire('Error', body.errors[0].msg, 'error')
            else if (
                body.msg === 'token empty' ||
                body.msg === 'token invalid'
            ) {
                dispatch(startLogout())
                Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
            } else Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const deletePost = (uidPost) => {
    return async (dispatch) => {
        //Mensaje mostrado mientras el contenido se está subiendo al servidor.
        Swal.fire({
            title: 'Eliminando el contenido ...',
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

        //Obtenemos la respuesta
        const response = await fetch(url + uidPost, {
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        //Cerramos notificación de carga de pantalla
        Swal.close()

        // Cuerpo de la respuesta
        const body = await response.json()

        // Exito en la respuesta
        if (body.success) {
            // acción de guardar el post añadido
            dispatch(deletingPost(uidPost))
            // Notificación
            Swal.fire('Exito', 'Contenido eliminado', 'success')
        } else {
            // Notificación del error establecido
            if (body.errors) Swal.fire('Error', body.errors[0].msg, 'error')
            else if (
                body.msg === 'token empty' ||
                body.msg === 'token invalid'
            ) {
                dispatch(startLogout())
                Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
            } else Swal.fire('Error', body.msg, 'error')
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
