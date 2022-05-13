
import Swal from 'sweetalert2';
import {types} from '../types/types';
//const baseUrl = process.env.REACT_APP_API_URL;
const baseUrl = process.env.REACT_APP_API_URL_DEV;

export const startLogin = (email,password) => {
    
    return async(dispatch) => {

        
        const url = baseUrl + '/auth/login';
        const resp = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,password})
        });

        const body = await resp.json();

        if(body.success) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({user: {
                uid: body.user.uid,
                type: body.user.type,
                followServices: body.user.followServices,
                userName: body.user.userName,
            }}));
        }else{
            Swal.fire('Error', body.msg,'error');
        }
    }
}


export const startRegister = (email,password,userName,type) => {
    return async(dispatch) =>{
        //Aclaración, si es empresario hay que dar de alta también el servicio añadido.
        const url = baseUrl + '/users'

        const resp = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({userName,email,password,type})
        });

        const body = await resp.json();
        if(body.success){
            Swal.fire('Exísto','Inicia Sesión, cuando inicie sesión podrá crear su servicio','success');
        }else{
            Swal.fire('Error',body.errors[0].msg,'error');
        }

    }
}

export const startChecking = () => {

    return async(dispatch) => {
        const url = baseUrl + '/users'

        
        
        //Obtengo el token del localStrorage
        const token = localStorage.getItem('token') || '';

        

        const resp = await fetch(url,{
            method:'GET',
            headers: {'token': token}
        })

        
        const body = await resp.json();
        
        if(body.success){
            dispatch(login({
                user : body.user
            }))
        }else 
            dispatch(checkingFinish())
        
        
    }
}

const checkingFinish = () => ({type: types.checkingFinish})


export const login = (user) => {
    return{
        type: types.login,
        payload: user
    }
}


export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.logout })


