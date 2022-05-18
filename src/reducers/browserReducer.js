import { types } from '../types/types'

const initialState = {
    servicesList: [],
    loaded: false,
}

export const browserReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getServicesSearch:
            return {
                ...state,
                servicesList: [...action.payload],
            }
        case types.setServices:
            return {
                loaded: true,
                servicesList: state.servicesList.concat(action.payload),
            }
        case types.setInitialServices:
            return {
                loaded: true,
                servicesList: action.payload,
            }
        case types.logout:
            return initialState

        default:
            return state
    }
}
