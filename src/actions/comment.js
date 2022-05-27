import Swal from 'sweetalert2'
import { loadingClose, loadingOpen } from '../helpers/SwalNotifications'
import { types } from '../types/types'
import { startLogout } from './auth'

const url = process.env.REACT_APP_API_URL_DEV + '/comments/'

export const getCommentsUser = () => {
    return async (dispatch) => {
        loadingOpen('Cargando contenido ...')

        const token = localStorage.getItem('token') || ''
        const response = await fetch(url + '?userComments=true', {
            method: 'GET',
            headers: {
                token: token,
            },
        })

        loadingClose()

        const body = await response.json()

        if (body.success) {
            dispatch(getttingCommentsUser(body.comments))
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

const getttingCommentsUser = (comments) => {
    return {
        type: types.getCommentsUser,
        payload: comments,
    }
}

export const updateCommentUser = (text, uid, reply) => {
    return async (dispatch) => {
        const token = localStorage.getItem('token') || ''
        const response = await fetch(url + uid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: token,
            },
            body: JSON.stringify({ text }),
        })

        const body = await response.json()
        if (body.success) {
            if (!reply) dispatch(updatingComentUser(body.comment))
            else dispatch(updatingReply(body.comment))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout())
            Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
        } else Swal.fire('Error', body.msg, 'error')
    }
}

const updatingReply = (reply) => {
    return {
        type: types.putReply,
        payload: reply,
    }
}

const updatingComentUser = (comment) => {
    return {
        type: types.putComment,
        payload: comment,
    }
}

export const deleteComment = (uid, reply) => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        const response = await fetch(url + uid, {
            method: 'DELETE',
            headers: {
                token: token,
            },
        })

        const body = await response.json()
        if (body.success) {
            if (!reply) {
                dispatch(deletingComment(uid))
                Swal.fire('Exito', 'Comentario eliminado', 'success')
            } else dispatch(deletingReply(uid))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout())
            Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
        } else Swal.fire('Error', body.msg, 'error')
    }
}

const deletingComment = (uid) => {
    return {
        type: types.delComment,
        payload: uid,
    }
}

const deletingReply = (uid) => {
    return { type: types.delReply, payload: uid }
}

export const getCommentsService = (uidService) => {
    return async (dispatch) => {
        // Notificación.
        loadingOpen('Cargando contenido ...')

        // Petición.
        const response = await fetch(url + '?idService=' + uidService, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        //Cerramos notificación.
        loadingClose()

        //Cargamos el cuerpo de la respuesta.
        const body = await response.json()
        if (body.success) {
            dispatch(setServiceComments(body.comments))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout())
            Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
        } else Swal.fire('Error', body.msg, 'error')
    }
}

const setServiceComments = (comments) => {
    return {
        type: types.getCommentsService,
        payload: comments,
    }
}

export const postReplyComment = (idComment, text) => {
    return async (dispatch) => {
        //Petición
        const response = await fetch(url + 'reply/' + idComment, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                token: localStorage.getItem('token'),
            },
            body: JSON.stringify({ text }),
        })

        const body = await response.json()

        if (body.success) {
            dispatch(setReply(body.reply, idComment))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout())
            Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
        } else Swal.fire('Error', body.errors[0].msg, 'error')
    }
}

const setReply = (reply, idComment) => {
    return {
        type: types.postReply,
        payload: { reply, idComment },
    }
}
