import {types} from '../types/types';

const initialState = {
    userComments: [],
    loaded: false, //Para saber si hemos obtenido los comentarios
}

export const commentsReducer = (state=initialState,action) => {
    switch(action.type) {
        case types.getCommentsUser:
            return {
                ...state,
                userComments: action.payload,
                loaded:true,
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
                loaded:true
            }
        case types.delComment:

            return {
                ...state,
                userComments: state.userComments.filter( c => c.uid !== action.payload)
            }
        
        case types.logout:
            return initialState;
        default:
            return state;
    }
}