import { types } from "../types/types";


const initialState = {
    uidServicePosts:'',
    postsLastService:[]
}

export const postReducer = (state=initialState,action) => {
    switch(action.type) {
        case types.getPosts:
            
            return {
                ...state,
                uidServicePosts: action.payload.uid,
                postsLastService: action.payload.posts
            }

        case types.putPost:
            return {
                ...state,
                postsLastService: state.postsLastService.map(
                    post => (post.uid === action.payload.uid) ? action.payload : post
                )
            }
        case types.postPost:
            
            return {
                ...state,
                postsLastService: [action.payload, ...state.postsLastService]
            }
        case types.delPost:
            return {
                ...state,
                postsLastService: state.postsLastService.filter(post => post.uid !== action.payload)
            }
        case types.logout:
            return initialState;

        default:
            return state;
    }
}