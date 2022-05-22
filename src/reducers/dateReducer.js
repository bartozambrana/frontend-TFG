import { types } from '../types/types'

const initialState = {
    userAppointments: [],
}

export const dateReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getUserAppointments:
            return {
                userAppointments: action.payload,
            }
        case types.putUserCancelAppointment:
            return {
                userAppointments: state.userAppointments.filter(
                    (dates) => dates.uid !== action.payload
                ),
            }
        case types.logout:
            return initialState

        default:
            return state
    }
}
