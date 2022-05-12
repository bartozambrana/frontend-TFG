
import Swal from 'sweetalert2';

import {types} from '../types/types';

const url = process.env.REACT_APP_API_URL_DEV + '/services/';

export const getValidCategories = () => {
    return async(dispatch) => {
        const response = await fetch(url + 'validCategories',{
            method:'GET',
            headers:{
                'token' : localStorage.getItem('token')
            }
        });

        const body = await response.json();

        if(body.success) {
            dispatch(setValidCategories(body.categories));
        }else{
            Swal.fire('Error','Reintente la operación','error');
        }
    }
}

const setValidCategories = (categories) => {
    return {
        type: types.getValidCategories,
        payload: categories
    }
}

export const addNewService = (serviceName,serviceInfo,serviceCategory,street,postalCode,cityName) =>{
    return async(dispatch) => {
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            },
            body: JSON.stringify({serviceName,serviceInfo,serviceCategory,street,postalCode,cityName})
        });

        const body = await response.json();
        console.log(body.service);
        if(body.success){
            dispatch(setNewService(body.service));
            Swal.fire('Exito','Servicio añadido','success');
        }else{
            if(body.errors)
                Swal.fire('Error',body.errors[0].msg,'error');
            else
                Swal.fire('Error',body.msg,'error');
        }
    }
}

const setNewService = (service) =>{
    return {
        type: types.postService,
        payload: service
    }
}


export const getServicesUser = () => {
    return async(dispatch) => {
        const response = await fetch(url + 'userServices/',{
            method:'GET',
            headers:{
                'token' : localStorage.getItem('token')
            }
        });

        const body = await response.json();

        if(body.success){
            dispatch(setServicesUser(body.services));
        }
    }
}

const setServicesUser = (services) => {
    return {
        type: types.getServicesUser,
        payload: services
    }
}

export const getServiceById = (id) => {
    return async(dispatch) => {
        const response = await fetch(url+id,{
            method:'GET',
            headers:{
                token:localStorage.getItem('token')
            }
        });

        const body = await response.json();
        console.log(body.service);
        if(body.success){
            dispatch(setServiceById(body.service))
        }
    }
}
const setServiceById = (service) => {
    return {
        type : types.getServiceById,
        payload: service
    }
}

export const putService = (serviceCategory,serviceInfo,cityName,street,postalCode,uid) => {
    return async(dispatch) => {
        const response = await fetch(url+uid,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            },
            body: JSON.stringify({serviceCategory,serviceInfo,cityName,street,postalCode})
        })

        const body = await response.json();

        if(body.success){
            dispatch(setUpdateService(body.service));
            Swal.fire('Exito','Servicio actualizado','success');
        }else{
            if(body.errors)
                Swal.fire('Error',body.errors[0].msg,'error');
            else
                Swal.fire('Error',body.msg,'error');
        }
    }
}

const setUpdateService = (service) => {
    return {
        type: types.putService,
        payload: service
    }
}