import Swal from 'sweetalert2'
import { loadingClose, loadingOpen } from '../helpers/SwalNotifications'
import { types } from '../types/types'

import { startLogout } from './auth'

const url = process.env.REACT_APP_API_URL_DEV + '/services/'

export const searchQuery = (categories, population, name) => {
    return async (dispatch) => {
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
            url +
                'search/?categories=' +
                categories +
                '&population=' +
                population +
                '&name=' +
                name,

            {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token'),
                },
            }
        )

        Swal.close()

        const body = await response.json()

        if (body.success) {
            dispatch(setSearch(body.services))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout())
            Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
        } else Swal.fire('Error', body.msg, 'error')
    }
}

export const getRandomServices = ({
    amount,
    servicesServed,
    initial = false,
}) => {
    return async (dispatch) => {
        loadingOpen('Obteniendo contenido')

        let baseUrl = url + 'random/?amount=' + amount
        if (servicesServed) baseUrl += '&servicesSended=' + servicesServed

        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        loadingClose()

        const body = await response.json()

        if (body.success) {
            dispatch(setServices(body.services, initial))
            if (body.services.length === 0) {
                Swal.fire({
                    title: 'Notificación',
                    text: 'No se existen más servicios',
                    timer: 2000,
                    showConfirmButton: true,
                    confirmButtonColor: '#414e52',
                })
            }
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout())
            Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
        } else Swal.fire('Error', body.msg, 'error')
    }
}

export const getServicesByName = (name) => {
    return async (dispatch) => {
        Swal.fire({
            title: 'Obteniendo contenido ...',
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

        const response = await fetch(url + '/called/' + name, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        Swal.close()

        const body = await response.json()

        if (body.success) {
            dispatch(setSearch(body.services))
        } else if (body.msg === 'token empty' || body.msg === 'token invalid') {
            dispatch(startLogout())
            Swal.fire('Error', 'Sesión caducada, inicie sesión', 'error')
        } else Swal.fire('Error', body.errors[0].msg, 'error')
    }
}

const setServices = (services, initial) => {
    if (initial) return { type: types.setInitialServices, payload: services }

    return {
        type: types.setServices,
        payload: services,
    }
}
const setSearch = (services) => {
    return {
        type: types.getServicesSearch,
        payload: services,
    }
}
