import Swal from "sweetalert2";
import { types } from "../types/types";


const url = process.env.REACT_APP_API_URL_DEV + '/comments/';

export const getCommentsUser = () =>{

    return async(dispatch) => {
        const token = localStorage.getItem('token') || '';
        const response = await fetch(url + '?userComments=true',{
            method: 'GET',
            headers: {
                'token': token
            }
        })
        console.log('peticion fetch comments realizada')
        const body = await response.json();

        if(body.success){
            dispatch(getttingCommentsUser(body.comments));
        }else{
            Swal.fire('Error', 'Ha ocurrido un error','error');
        }
    }
}

const getttingCommentsUser = (comments) => {
    return {
        type: types.getCommentsUser,
        payload: comments
    } 
};


export const updateCommentUser = (text,uid) => {
    
    return async(dispatch) => {
        const token = localStorage.getItem('token') || '';
        const response = await fetch(url + uid, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token':token
            },
            body:JSON.stringify(text)
        })

        const body = await response.json();
        if(body.success || true) {
            console.log(body.comment);
            dispatch(updatingComentUser(body.comment));
        }else{
            Swal.fire('Error', 'Intente la operación de nuevo','error');
        }     

    }
}

const updatingComentUser = (comment) => {
    return {
        type: types.putComment,
        payload: comment
    }
}

export const deleteComment = (uid) => {

    return async(dispatch) => {
        const token = localStorage.getItem('token');
        const response = await fetch(url + uid,{
            method:'DELETE',
            headers: {
                'token': token
            }
        });

        const body = await response.json();
        if(body.success){
            dispatch(deletingComment(uid));
            Swal.fire('Exito', 'Comentario eliminado','success')
        }else{
            Swal.fire('Error','Reintente la operación si lo desea','error');
        }
    }
}

const deletingComment = (uid) => {
    return {
        type: types.delComment,
        payload: uid
    }
}