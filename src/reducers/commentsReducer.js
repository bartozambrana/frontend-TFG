import {types} from '../types/types';

const initialState = {
    userComments: [],
    loaded: false, //Para saber si hemos obtenido los comentarios
    commentsErrorServer:false,
    commentsErrorMsg:''
}

export const commentsReducer = (state=initialState,action) => {
    switch(action.type) {
        case types.getCommentsUser:
            return {
                ...state,
                userComments: action.payload,
                loaded:true,
                commentsErrorServer:false,
                commentsErrorMsg:''
            }
        // case types.getCommentsService:
        //     return {
        //         ...state,
        //         ...action.payload,
        //         loaded:true,
        //     }
        case types.putComment:
            
            return {
                ...state,
                userComments: state.userComments.map(c =>{
                    if(c.uid === action.payload.uid)
                        c = action.payload
                    else {
                        c.replyTo.map(r => {
                            if(r.uid === action.payload.uid)
                                r = action.payload
                            return r;
                        })
                    }
                    return c;
                }),
                loaded:true,
                commentsErrorServer:false,
                commentsErrorMsg:''
            }
        case types.delComment:

            return {
                ...state,
                userComments: state.userComments.filter( c => c.uid !== action.payload),
                commentsErrorServer:false,
                commentsErrorMsg:''
            }
        
        case types.setErrorComments:
            return{
                ...state,
                commentsErrorMsg: action.payload.error,
                commentsErrorServer: action.payload.bool
            }

        case types.logout:
            return initialState;
        default:
            return state;
    }
}