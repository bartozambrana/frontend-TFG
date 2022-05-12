
//import {createStore, combineReducers,applyMiddleware,compose} from 'redux';
import {configureStore, combineReducers} from '@reduxjs/toolkit';


import { authReducer } from '../reducers/authReducer';
import { commentsReducer } from '../reducers/commentsReducer';
import { serviceReducer } from '../reducers/serviceReducer';
import { workReducer } from '../reducers/workReducer';

const reducer = combineReducers({
    auth: authReducer,
    comments: commentsReducer,
    services: serviceReducer,
    works: workReducer
})


//const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = configureStore({
        reducer,
        devTools:true
    }
)