import { types } from '../types/types'

const initialState = {
    userServices: [],
    loaded: false,
    validCategories: [],
    avaliableCategories: [],
    visitedServices: [],
    serviceErrorServer: false,
}

export const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getServicesUser:
            return {
                ...state,
                userServices: action.payload,
                loaded: true,
            }
        case types.getValidCategories:
            return {
                ...state,
                validCategories: action.payload,
            }
        case types.getServiceById: {
            const oldServices = state.visitedServices.concat(action.payload)
            return {
                ...state,
                visitedServices: oldServices,
                loaded: true,
            }
        }
        case types.postService:
            // eslint-disable-next-line no-case-declarations
            const oldServices = state.userServices.concat(action.payload)

            return {
                ...state,
                loaded: false,
                userServices: oldServices,
            }
        case types.putService:
            return {
                ...state,
                userServices: state.userServices.map((s) =>
                    s.uid === action.payload.uid ? action.payload : s
                ),
            }
        case types.getAvaliableCategories:
            return {
                ...state,
                avaliableCategories: action.payload,
            }
        case types.setServiceError:
            return {
                ...state,
                serviceErrorServer: action.payload,
            }
        case types.logout:
            return initialState

        case types.delService:
            return {
                ...state,
                userServices: state.userServices.filter(
                    (s) => s.uid !== action.payload
                ),
                visitedServices: state.visitedServices.filter(
                    (s) => s.uid !== action.payload
                ),
            }

        default:
            return state
    }
}
