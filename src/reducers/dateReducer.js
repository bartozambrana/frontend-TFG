import { types } from '../types/types'

const initialState = {
    userAppointments: [],
    loaded: false,
}

export const dateReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getUserAppointments:
            return {
                userAppointments: action.payload,
                loaded: true,
            }
        case types.putUserCancelAppointment:
            return {
                ...state,
                userAppointments: state.userAppointments.filter(
                    (dates) => dates.uid !== action.payload
                ),
            }
        case types.putSelectAppointmentUser:
            return {
                ...state,
                userAppointments: [action.payload, ...state.userAppointments],
            }
        case types.putModifyAppointment:
            return {
                ...state,
                userAppointments: [
                    ...state.userAppointments.map((date) => {
                        if (date.uid === action.payload.oldUid)
                            return action.payload.date
                        return date
                    }),
                ],
            }
        case types.putValoration:
            return {
                ...state,
                userAppointments: state.userAppointments.map((date) => {
                    if (date.uid === action.payload.uid) return action.payload
                    return date
                }),
            }
        case types.logout:
            return initialState

        default:
            return state
    }
}
