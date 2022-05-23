import { types } from '../types/types'

const initialState = {
    checking: true,
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                checking: false,
                ...action.payload,
            }
        case types.checkingFinish:
            return {
                ...state,
                checking: false,
            }
        case types.logout:
            return {
                checking: false,
            }

        case types.putUser:
            return {
                ...state,
                user: action.payload,
            }
        case types.followService:
            let userCopy = { ...state.user }

            userCopy.followServices = [
                {
                    _id: action.payload.uid,
                    serviceName: action.payload.serviceName,
                },
                ...state.user.followServices,
            ]
            return {
                ...state,
                user: {
                    ...state.user,
                    followServices: [
                        {
                            _id: action.payload.uid,
                            serviceName: action.payload.serviceName,
                        },
                        ...state.user.followServices,
                    ],
                },
            }
        case types.unfollowService:
            return {
                ...state,
                user: {
                    ...state.user,
                    followServices: state.user.followServices.filter(
                        (s) => s._id !== action.payload
                    ),
                },
            }

        default:
            return state
    }
}
