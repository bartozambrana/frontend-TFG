import Swal from 'sweetalert2'
import { types } from '../types/types'
import { startLogout } from './auth'

const url = process.env.REACT_APP_API_URL_DEV + '/comments/'

export const getCommentsUser = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token') || ''
        const response = await fetch(url + '?userComments=true', {
            method: 'GET',
            headers: {
                token: token,
            },
        })
        console.log('peticion fetch comments realizada')
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

export const updateCommentUser = (text, uid) => {
    return async (dispatch) => {
        const token = localStorage.getItem('token') || ''
        const response = await fetch(url + uid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: token,
            },
            body: JSON.stringify(text),
        })

        const body = await response.json()
        if (body.success) {
            dispatch(updatingComentUser(body.comment))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout())
            Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
        } else Swal.fire('Error', body.msg, 'error')
    }
}

const updatingComentUser = (comment) => {
    return {
        type: types.putComment,
        payload: comment,
    }
}

export const deleteComment = (uid) => {
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
            dispatch(deletingComment(uid))
            Swal.fire('Exito', 'Comentario eliminado', 'success')
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

// const setError = (bool, error) => {
//   return {
//     type: types.setErrorComments,
//     payload: {
//       bool,
//       error,
//     },
//   };
// };
