import {
    loadingClose,
    loadingOpen,
    swalInfoTimer,
    swallError,
    swallSuccess,
} from '../helpers/SwalNotifications'
import { types } from '../types/types'
import { startLogout } from './auth'

const url = process.env.REACT_APP_API_URL + '/comments/'

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
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout())
            swallError('Su sesión ha caducado.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
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
            swallError('Su sesión ha caducado.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
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
                swallSuccess('Comentario eliminado.')
            } else dispatch(deletingReply(uid))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout())
            swallError('Su sesión ha caducado.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
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
            swallError('Su sesión ha caducado.')
        } else {
            dispatch({ type: types.setServiceError, payload: false })
        }
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
            swallError('Su sesión ha caducado.')
        } else if (body.msg) {
            swallError(body.msg)
        } else {
            //Informamos del error que ha ocurrido al usuario.
            swallError(body.errors[0].msg)
        }
    }
}

const setReply = (reply, idComment) => {
    return {
        type: types.postReply,
        payload: { reply, idComment },
    }
}

export const postComment = (idService, text) => {
    return async (dispatch) => {
        loadingOpen('Añadiendo comentario ...')

        const response = await fetch(url + idService, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                token: localStorage.getItem('token'),
            },
            body: JSON.stringify({ text }),
        })

        loadingClose()

        const body = await response.json()

        if (body.success) {
            dispatch(setComment(body.comment))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout())
            swalInfoTimer('Sesión caducada')
        } else if (body.msg) swallError(body.msg)
        else swalInfoTimer(body.errors[0].msg)
    }
}

const setComment = (comment) => {
    return {
        type: types.postComment,
        payload: comment,
    }
}
