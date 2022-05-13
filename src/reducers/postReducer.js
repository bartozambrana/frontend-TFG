import { types } from "../types/types";


const initialState = {
    uidPostsService:'',
    postsLastService:[],
    postsErrorServer:false
}

export const postReducer = (state=initialState,action) => {
    switch(action.type) {
        case types.getPosts:
            return {
                ...state,
                uidPostsService: action.payload.uid,
                postsLastService: action.payload.posts
            }
        case types.setErrorPosts:
            return {
                ...state,
                postsErrorServer: action.payload
            }
        case types.putPost:
            return {
                ...state,
                postsLastService: state.postsLastService.map(
                    post => (post.uid === action.payload.uid) ? action.payload : post
                )
            }
        case types.postPost:
            const newPosts = state.postsLastService.concat(action.payload);
            return {
                ...state,
                postsLastService: newPosts
            }
        case types.delPost:
            return {
                ...state,
                worksLastService: state.postsLastService.filter(post => post.uid !== action.payload)
            }
        case types.logout:
            return initialState;

        default:
            return state;
    }
}