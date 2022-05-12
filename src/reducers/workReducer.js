import { types } from "../types/types";


const initialState = {
    uidWorkService:'',
    worksLastService:[],
    errorServer:false
}

export const workReducer = (state=initialState,action) => {
    switch(action.type) {
        case types.getWorks:
            return {
                ...state,
                uidWorkService: action.payload.uid,
                worksLastService: action.payload.works
            }
        case types.setError:
            return {
                ...state,
                errorServer: action.payload
            }
        case types.putWork:
            return {
                ...state,
                worksLastService: state.worksLastService.map(
                    work => (work.uid === action.payload.uid) ? action.payload : work
                )
            }
        case types.logout:
            return initialState;

        default:
            return state;
    }
}