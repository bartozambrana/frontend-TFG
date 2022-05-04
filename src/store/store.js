
//import {createStore, combineReducers,applyMiddleware,compose} from 'redux';
import {configureStore, combineReducers} from '@reduxjs/toolkit';


import { authReducer } from '../reducers/authReducer';

const reducer = combineReducers({
    auth: authReducer
})


//const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = configureStore({
        reducer,
        devTools:true
    }
)