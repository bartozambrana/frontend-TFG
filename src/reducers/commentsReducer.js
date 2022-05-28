import { types } from '../types/types'

const initialState = {
    userComments: [],
    loaded: false, //Para saber si hemos obtenido los comentarios
    commentsErrorServer: false,
    commentsService: [],
    commentsErrorMsg: '',
}

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getCommentsUser:
            return {
                ...state,
                userComments: action.payload,
                loaded: true,
                commentsErrorServer: false,
                commentsErrorMsg: '',
            }
        case types.getCommentsService:
            return {
                ...state,
                commentsService: [...action.payload],
            }
        case types.putComment:
            return {
                ...state,
                //Si está en la pantalla de los comentarios del usuario.
                userComments: state.userComments.map((c) => {
                    if (c.uid === action.payload.uid) return action.payload

                    return c
                }),
                //Si está en la pantalla de un servicio.
                commentsService: state.commentsService.map((c) => {
                    if (c.uid === action.payload.uid) return action.payload
                    return c
                }),

                loaded: true,
                commentsErrorServer: false,
                commentsErrorMsg: '',
            }
        case types.delComment:
            return {
                ...state,
                //Si está en la pantalla de los comentarios del usuario.
                userComments: state.userComments.filter(
                    (c) => c.uid !== action.payload
                ),
                //Si está en la pantalla de un servicio.
                commentsService: state.commentsService.filter(
                    (c) => c.uid !== action.payload
                ),
                commentsErrorServer: false,
                commentsErrorMsg: '',
            }

        case types.setErrorComments:
            return {
                ...state,
                commentsErrorMsg: action.payload.error,
                commentsErrorServer: action.payload.bool,
            }

        case types.postReply:
            return {
                ...state,
                commentsService: state.commentsService.map((c) => {
                    if (c.uid === action.payload.idComment) {
                        action.payload.reply._id = action.payload.reply.uid
                        delete action.payload.reply.uid

                        return {
                            ...c,
                            replyTo: [...c.replyTo, action.payload.reply],
                        }
                    }

                    return c
                }),
            }
        case types.putReply:
            return {
                commentsService: state.commentsService.map((c) => {
                    return {
                        ...c,
                        replyTo: c.replyTo.map((r) => {
                            if (r._id === action.payload.uid) {
                                action.payload._id = action.payload.uid
                                delete action.payload.uid
                                return action.payload
                            }
                            return r
                        }),
                    }
                }),
            }

        case types.delReply:
            return {
                ...state,
                commentsService: state.commentsService.map((c) => {
                    return {
                        ...c,
                        replyTo: c.replyTo.filter(
                            (r) => r._id !== action.payload
                        ),
                    }
                }),
            }
        case types.postComment:
            return {
                ...state,
                //Si está en la pantalla de las comentarios del usuario.
                userComments: [...state.userComments, action.payload],
                //Si está en la pantalla de un servicio.
                commentsService: [...state.commentsService, action.payload],
            }
        case types.logout:
            return initialState
        default:
            return state
    }
}
