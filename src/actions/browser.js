import {
    loadingClose,
    loadingOpen,
    swalInfoTimer,
    swallError,
} from '../helpers/SwalNotifications'
import { types } from '../types/types'

import { startLogout } from './auth'

const url = process.env.REACT_APP_API_URL_DEV + '/services/'

export const searchQuery = (categories, population, name) => {
    return async (dispatch) => {
        loadingOpen('Buscando servicios...')

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

        loadingClose()
        const body = await response.json()

        if (body.success) {
            dispatch(setSearch(body.services))
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
                swalInfoTimer('No hay más servicios disponibles')
            }
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

export const getServicesByName = (name) => {
    return async (dispatch) => {
        loadingOpen('Buscando servicios...')

        const response = await fetch(url + '/called/' + name, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token'),
            },
        })

        loadingClose()

        const body = await response.json()

        if (body.success) {
            dispatch(setSearch(body.services))
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
