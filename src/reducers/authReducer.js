import { types } from '../types/types'

const initialState = {
    checking: true,
    recommendations: [],
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

        case types.getHomeContent:
            return {
                ...state,
                user: {
                    ...state.user,
                    homeContent: action.payload,
                    mumElementsReceived: action.payload.length,
                },
            }

        case types.getMoreHomeContent:
            return {
                ...state,
                user: {
                    ...state.user,
                    homeContent: [...state.user.homeContent, ...action.payload],
                    mumElementsReceived: action.payload.length,
                },
            }

        case types.getRecommendation:
            return {
                ...state,
                recommendations: action.payload,
            }
        default:
            return state
    }
}
