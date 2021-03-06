import {
    loadingClose,
    loadingOpen,
    swalInfoTimer,
    swallError,
} from '../helpers/SwalNotifications'
import { types } from '../types/types'

import { startLogout } from './auth'

const url = process.env.REACT_APP_API_URL_DEV + '/dates/'

/*****************************************************************************************
 ******************* ACCIONES DEL PUNTO DEL VISTA DEL EMPRESARIO *************************
 *****************************************************************************************
 */
export const postNewDate = (dateDay, initHour, endHour, uidService) => {
    //Realizamos un return async ya que es una acción asíncrona al servidor,
    //esperando la respuesta del mismo.
    return async (dispatch) => {
        // Notificación de que se está cargando la cita en el sistema.
        loadingOpen('Subiendo el contenido ...')

        const response = await fetch(url + uidService, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token'),
            },
            body: JSON.stringify({ dateDay, initHour, endHour }),
        })

        //Cerramos la notificación puesto ya hemos recibido la respuesta.
        loadingClose()

        const body = await response.json()

        if (body.success) {
            //Mostramos que la cita ha sido añadida.
            swalInfoTimer('Se ha añadido la cita.')
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

export const getDatesDay = (dateDay, uidService, setNewDateList) => {
    return async (dispatch) => {
        // Notificación de que se está cargando la cita en el sistema.
        loadingOpen('Subiendo el contenido ...')

        const response = await fetch(
            url + uidService + '?dateInput=' + dateDay,
            {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token'),
                },
            }
        )

        //Cerramos la notificación puesto ya hemos recibido la respuesta.
        loadingClose()
        const body = await response.json()

        if (body.success) {
            //Establecemos la lista de citas.
            if (body.dates.length === 0)
                swalInfoTimer('No hay citas para el día solicitado')

            setNewDateList(body.dates)
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

export const getAsignedDates = (dateDay, uidService, setNewDateList) => {
    return async (dispatch) => {
        loadingOpen('Obteniendo el listado de citas')

        const response = await fetch(
            url + 'asignated/' + uidService + '?dateInput=' + dateDay,
            {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token'),
                },
            }
        )

        loadingClose()

        const body = await response.json()

        if (body.success) {
            //Establecemos la lista de citas.
            if (body.dates.length === 0)
                swalInfoTimer(
                    'No se han encontrado citas para la fecha introducida'
                )

            setNewDateList(body.dates)
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

export const putDateService = (uidDate, initHour, endHour) => {
    return async (dispatch) => {
        // Notificación de que se está cargando la cita en el sistema.
        loadingOpen('Subiendo el contenido ...')

        const response = await fetch(url + uidDate, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token'),
            },
            body: JSON.stringify({ initHour, endHour }),
        })

        //Cerramos la notificación puesto ya hemos recibido la respuesta.
        loadingClose()

        const body = await response.json()

        if (body.success) {
            swalInfoTimer('Cita actualizada.')
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

export const putCancelDate = (uidDate, user = false) => {
    return async (dispatch) => {
        loadingOpen('Actualizando ...')
        const response = await fetch(url + 'cancel/' + uidDate, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                token: localStorage.getItem('token'),
            },
        })

        loadingClose()

        const body = await response.json()
        if (body.success) {
            swalInfoTimer('Cita cancelada.')
            if (user) {
                //Usuario cliente
                dispatch(userCancelAppointment(uidDate))
            }
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

export const delDate = (uidDate) => {
    return async (dispatch) => {
        loadingOpen('Eliminando la cita ...')

        const response = await fetch(url + uidDate, {
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        loadingClose()

        const body = await response.json()
        if (body.success) {
            swalInfoTimer('Cita Eliminada.')
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

/*****************************************************************************************
 ************************** ACCIONES DEL PUNTO DEL USUARIO ********************************
 ******************************************************************************************
 */

// Obtenemer todas las citas de un usuario.
export const getUserAppointments = () => {
    return async (dispatch) => {
        //Notificación de carga
        loadingOpen('Obteniendo tus citas')

        //Petición
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        //Cerramos la notificación de carga.
        loadingClose()

        //Obtenemos la información de la response.
        const body = await response.json()

        if (body.success) {
            //Añadimos la información al reducer
            dispatch(userAppointments(body.userDates))
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

export const putSelectDate = (uidDate) => {
    return async (dispatch) => {
        //Mostramos que se está registrando la cita.
        loadingOpen('cargando la cita.')

        //Petición al servidor.
        const response = await fetch(url + '/select/' + uidDate, {
            method: 'PUT',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        //Cerramos la notificación
        loadingClose()

        //Obtenemos el cuerpo de la respuesta.
        const body = await response.json()

        //Respuestas dependiendo de la respuonse del servidor,
        if (body.success) {
            swalInfoTimer('Cita seleccionada con éxito.')
            dispatch(userSelectAppointment(body.date)) //Cargamos la citas localmente
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

export const putModifyDate = (uidNewDate, uidOldDate) => {
    return async (dispatch) => {
        //Notificación de que se está modificando la cita.
        loadingOpen('Actualizando la cita ...')

        //Petición al servidor.
        const response = await fetch(url + 'modify/' + uidNewDate, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                token: localStorage.getItem('token'),
            },
            body: JSON.stringify({ idOldDate: uidOldDate }),
        })

        //Cerramos la notificación al usuario.
        loadingClose()

        //Obtenemos el cuerpo de la respuesta.
        const body = await response.json()

        //Respuestas dependiendo de la respuonse del servidor,
        if (body.success) {
            swalInfoTimer('Cita Modificada con éxito.')
            dispatch(userModifyAppointment(body.date, uidOldDate)) //Cargamos la citas localmente
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

export const sendValoration = (valoration, uidDate) => {
    return async (dispatch) => {
        loadingOpen('Enviando valoración ...')
        const response = await fetch(url + 'valoration/' + uidDate, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                token: localStorage.getItem('token'),
            },
            body: JSON.stringify({ valoration }),
        })

        loadingClose()

        const body = await response.json()

        if (body.success) {
            swalInfoTimer('Valoración establecido..')
            dispatch(putValoration(body.date)) //Cargamos la citas localmente
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            swallError('Sesión caducada, inicie sesión')
        } else if (body.msg) {
            swallError(body.msg)
        } else if (body.errors) {
            //Podemos encontrar estos dos tipos de errores en las citas. body.errors o body.msg
            swallError(body.errors[0].msg)
        }
    }
}

export const getRating = (uidDate, handleRating) => {
    return async (dispatch) => {
        const response = await fetch(url + 'rating/' + uidDate, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        const body = await response.json()

        if (body.success) {
            handleRating(body.rating)
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            swallError('Sesión caducada, inicie sesión')
        } else {
            dispatch({ type: types.setServiceError, payload: false })
        }
    }
}

export const getPDF = (idService, initDate, endDate) => {
    return async (dispatch) => {
        loadingOpen('Generando PDF ...')
        const response = await fetch(
            url +
                'pdf/' +
                idService +
                '?initDate=' +
                initDate +
                '&endDate=' +
                endDate,
            {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token'),
                },
            }
        )

        const body = await response.json()

        loadingClose()
        if (body.success) {
            if (body.msg === 'No dates found')
                swallError('No hay citas para ese rango de fechas.')
            else
                swalInfoTimer(
                    'PDF generado con éxito. Enviado a su correo electrónico.'
                )
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout())
            swallError('Sesión caducada, inicie sesión')
        } else {
            swallError('Comuniquese con el administrador del sistema.')
        }
    }
}

const putValoration = (date) => {
    return {
        type: types.putValoration,
        payload: date,
    }
}
const userAppointments = (appointments) => {
    return {
        type: types.getUserAppointments,
        payload: appointments,
    }
}

const userCancelAppointment = (uid) => {
    return { type: types.putUserCancelAppointment, payload: uid }
}

const userSelectAppointment = (date) => {
    return { type: types.putSelectAppointmentUser, payload: date }
}

const userModifyAppointment = (date, oldUid) => {
    return { type: types.putModifyAppointment, payload: { date, oldUid } }
}
