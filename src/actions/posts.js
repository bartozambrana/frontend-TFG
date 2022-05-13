

import Swal from "sweetalert2"

import { types } from "../types/types"
import { startLogout } from "./auth"

const url = process.env.REACT_APP_API_URL_DEV + '/posts/'

export const getPosts = (idService) => {
    return async(dispatch) => {
        //Mensaje mostrado mientras el contenido se está subiendo al servidor.
        Swal.fire({
            title:'Obteniendo posts',
            didOpen(){
                Swal.showLoading()
            },
            didClose(){
                Swal.hideLoading()
            },
            allowEnterKey:false,
            allowEscapeKey:false,
            allowOutsideClick:false,
            showConfirmButton:false
        });

        // Request al servidor.
        const response = await fetch(url + idService,{
            method:'GET',
            headers: {
                'token':localStorage.getItem('token')
            }
        });

        Swal.close();

        const body = await response.json();
        // Exito en la respuesta
        if(body.success){
            // acción de guardar el post añadido
            dispatch(gettingPosts(body.posts));
            // Establecemos que no ha habido errores en cuanto al post
            dispatch(setError(false));
        }else{
            // Establecemos que ha ocurrido un error en la petición
            dispatch(setError(true));
            // Notificación del error establecido
            if(body.errors)
                Swal.fire('Error',body.errors[0].msg,'error');
            else if(body.msg === 'token empty' || body.msg === 'token invalid'){
                    dispatch(startLogout());
                    Swal.fire('Error','Sesión caducada, inicie sesión','error');    
            }else
                Swal.fire('Error',body.msg,'error');
        }
    }
}

const postPost = (fileUpload,caption,description,idService) =>{
    return async(dispatch) => {

        //Establecemos el FormData a enviar en petición
        const formData = new FormData();
        formData.append('caption',caption)
        formData.append('description', description);    
        formData.append('archivo', fileUpload[0],fileUpload[0].name);
        

        //Mensaje mostrado mientras el contenido se está subiendo al servidor.
        Swal.fire({
            title:'Subiendo el contenido ...',
            didOpen(){
                Swal.showLoading()
            },
            didClose(){
                Swal.hideLoading()
            },
            allowEnterKey:false,
            allowEscapeKey:false,
            allowOutsideClick:false,
            showConfirmButton:false
        });

        //Obtenemos la respuesta
        const response = await fetch(url+idService,{
            method: 'POST',
            headers:{
                'token': localStorage.getItem('token')
            },
            body: formData
        });

        //Cerramos notificación de carga de pantalla
        Swal.close()

        // Cuerpo de la respuesta
        const body = await response.json();

        // Exito en la respuesta
        if(body.success){
            // acción de guardar el post añadido
            dispatch(postingPost(body.post));
            // Notificación
            Swal.fire('Exito','Contenido actulizado','success');
            // Establecemos que no ha habido errores en cuanto al post
            dispatch(setError(false));
        }else{
            // Establecemos que ha ocurrido un error en la petición
            dispatch(setError(true));
            // Notificación del error establecido
            if(body.errors)
                Swal.fire('Error',body.errors[0].msg,'error');
            else if(body.msg === 'token empty' || body.msg === 'token invalid'){
                    dispatch(startLogout());
                    Swal.fire('Error','Sesión caducada, inicie sesión','error');    
            }else
                Swal.fire('Error',body.msg,'error');
        }
    }
}

const putPost = (fileUpload,caption,description,uidPost) =>{
    return async(dispatch) => {

        //Establecemos el FormData a enviar en petición
        const formData = new FormData();
        formData.append('caption',caption)
        formData.append('description', description);    
        
        if(formData.length !== 0)
            formData.append('archivo', fileUpload[0],fileUpload[0].name);
        

        //Mensaje mostrado mientras el contenido se está subiendo al servidor.
        Swal.fire({
            title:'Subiendo el contenido ...',
            didOpen(){
                Swal.showLoading()
            },
            didClose(){
                Swal.hideLoading()
            },
            allowEnterKey:false,
            allowEscapeKey:false,
            allowOutsideClick:false,
            showConfirmButton:false
        });

        //Obtenemos la respuesta
        const response = await fetch(url+uidPost,{
            method: 'PUT',
            headers:{
                'token': localStorage.getItem('token')
            },
            body: formData
        });

        //Cerramos notificación de carga de pantalla
        Swal.close()

        // Cuerpo de la respuesta
        const body = await response.json();

        // Exito en la respuesta
        if(body.success){
            // acción de guardar el post añadido
            dispatch(puttingPost(body.post));
            // Notificación
            Swal.fire('Exito','Contenido actulizado','success');
            // Establecemos que no ha habido errores en cuanto al post
            dispatch(setError(false));
        }else{
            // Establecemos que ha ocurrido un error en la petición
            dispatch(setError(true));
            // Notificación del error establecido
            if(body.errors)
                Swal.fire('Error',body.errors[0].msg,'error');
            else if(body.msg === 'token empty' || body.msg === 'token invalid'){
                    dispatch(startLogout());
                    Swal.fire('Error','Sesión caducada, inicie sesión','error');    
            }else
                Swal.fire('Error',body.msg,'error');
        }
    }
}

const deletePost = (uidPost) =>{
    return async(dispatch) => {
        
        

        //Mensaje mostrado mientras el contenido se está subiendo al servidor.
        Swal.fire({
            title:'Eliminando el contenido ...',
            didOpen(){
                Swal.showLoading()
            },
            didClose(){
                Swal.hideLoading()
            },
            allowEnterKey:false,
            allowEscapeKey:false,
            allowOutsideClick:false,
            showConfirmButton:false
        });

        //Obtenemos la respuesta
        const response = await fetch(url+uidPost,{
            method: 'DELETE',
            headers:{
                'token': localStorage.getItem('token')
            }
        });

        //Cerramos notificación de carga de pantalla
        Swal.close()

        // Cuerpo de la respuesta
        const body = await response.json();

        // Exito en la respuesta
        if(body.success){
            // acción de guardar el post añadido
            dispatch(deletingPost(body.post));
            // Notificación
            Swal.fire('Exito','Contenido eliminado','success');
            // Establecemos que no ha habido errores en cuanto al post
            dispatch(setError(false));
        }else{
            // Establecemos que ha ocurrido un error en la petición
            dispatch(setError(true));
            // Notificación del error establecido
            if(body.errors)
                Swal.fire('Error',body.errors[0].msg,'error');
            else if(body.msg === 'token empty' || body.msg === 'token invalid'){
                    dispatch(startLogout());
                    Swal.fire('Error','Sesión caducada, inicie sesión','error');    
            }else
                Swal.fire('Error',body.msg,'error');
        }
    }
}

const gettingPosts = (posts,idService) => {
    return {
        type: types.getPosts,
        payload:{
            uid: idService,
            posts: posts
        }
    }
}
const postingPost = (post) => {
    return {
        type: types.postPost,
        payload: post
    }
}

const puttingPost = (post) => {
    return {
        type:types.putPost,
        payload: post
    }
}

const deletingPost = (uidPost) => {
    return {
        type: types.delPost,
        payload: uidPost
    }
}

const setError = (bool) =>{
    return {
        type: types.setErrorPosts,
        payload: bool
    }
}