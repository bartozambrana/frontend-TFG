import Swal from 'sweetalert2'

import { types } from '../types/types'

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
            Swal.fire('Error', 'No existe el servicio introducido', 'error')
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

        const response = await fetch(url + uid, {
            method: 'PUT',
            headers: {
                token: localStorage.getItem('token'),
            },
            body: formData,
        })

        Swal.close()

        const body = await response.json()

        if (body.success) {
            dispatch(updatingWorks(body.work))
            Swal.fire('Exito', 'Contenido actulizado', 'success')
        } else {
            if (body.errors) Swal.fire('Error', body.errors[0].msg, 'error')
            else Swal.fire('Error', body.msg, 'error')
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

        const response = await fetch(url + uid, {
            method: 'POST',
            headers: {
                token: localStorage.getItem('token'),
            },
            body: formData,
        })

        Swal.close()

        const body = await response.json()

        if (body.success) {
            dispatch(postingWork(body.work))
            Swal.fire('Exito', 'Trabajo añadido', 'success')
            dispatch(setError(false))
        } else {
            dispatch(setError(true))
            if (body.errors) Swal.fire('Error', body.errors[0].msg, 'error')
            else Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const deleteWork = (uidWork) => {
    return async (dispatch) => {
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

        const response = await fetch(url + uidWork, {
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        Swal.close()

        const body = await response.json()

        if (body.success) {
            dispatch(deletingWork(uidWork))
            Swal.fire('Exito', 'Contenido actulizado', 'success')
            dispatch(setError(false))
        } else {
            dispatch(setError(true))
            if (body.errors) Swal.fire('Error', body.errors[0].msg, 'error')
            else Swal.fire('Error', body.msg, 'error')
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
