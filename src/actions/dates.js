import Swal from 'sweetalert2'

import { startLogout } from './auth'

const url = process.env.REACT_APP_API_URL_DEV + '/dates/'

export const postNewDate = (dateDay, initHour, endHour, uidService) => {
    //Realizamos un return async ya que es una acción asíncrona al servidor,
    //esperando la respuesta del mismo.
    return async (dispatch) => {
        // Notificación de que se está cargando la cita en el sistema.
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

        const response = await fetch(url + uidService, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token'),
            },
            body: JSON.stringify({ dateDay, initHour, endHour }),
        })

        //Cerramos la notificación puesto ya hemos recibido la respuesta.
        Swal.close()

        const body = await response.json()

        if (body.success) {
            //Mostramos que la cita ha sido añadida.
            Swal.fire({
                title: 'Éxito',
                text: 'Se ha añadido al sistema la cita',
                timer: 2000,
                showConfirmButton: true,
                confirmButtonColor: '#414e52',
                icon: 'success',
            })
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
        } else if (body.msg) Swal.fire('Error', body.msg, 'error')
        else if (body.errors)
            //Podemos encontrar estos dos tipos de errores en las citas. body.errors o body.msg
            Swal.fire('Error', body.errors[0].msg, 'error')
    }
}

export const getDatesDay = (dateDay, uidService, setNewDateList) => {
    return async (dispatch) => {
        // Notificación de que se está cargando la cita en el sistema.
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
        Swal.close()

        const body = await response.json()

        if (body.success) {
            //Establecemos la lista de citas.
            if (body.dates.length === 0)
                Swal.fire({
                    title: 'Éxito',
                    text: 'No se disponen citas para la fecha introducida.',
                    timer: 4000,
                    showConfirmButton: true,
                    confirmButtonColor: '#414e52',
                    icon: 'info',
                })

            setNewDateList(body.dates)
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
        } else if (body.msg) {
            Swal.fire('Error', body.msg, 'error')
        } else if (body.errors) {
            //Podemos encontrar estos dos tipos de errores en las citas. body.errors o body.msg
            Swal.fire('Error', body.errors[0].msg, 'error')
        }
    }
}

export const putDateService = (uidDate, initHour, endHour) => {
    return async (dispatch) => {
        // Notificación de que se está cargando la cita en el sistema.
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

        const response = await fetch(url + uidDate, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token'),
            },
            body: JSON.stringify({ initHour, endHour }),
        })

        //Cerramos la notificación puesto ya hemos recibido la respuesta.
        Swal.close()

        const body = await response.json()

        if (body.success) {
            //Establecemos la lista de citas.
            Swal.fire({
                title: 'Éxito',
                text: 'Cita actualizada',
                timer: 4000,
                showConfirmButton: true,
                confirmButtonColor: '#414e52',
                icon: 'success',
            })
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout()) //Cerramos sesión y limpiamos los datos de contexto almacenados.
            Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
        } else if (body.msg) {
            Swal.fire('Error', body.msg, 'error')
        } else if (body.errors) {
            //Podemos encontrar estos dos tipos de errores en las citas. body.errors o body.msg
            Swal.fire('Error', body.errors[0].msg, 'error')
        }
    }
}
