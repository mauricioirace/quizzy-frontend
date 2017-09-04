import { combineReducers, applyMiddleware } from "redux";
import { routerReducer } from 'react-router-redux';
import currentMatch from './currentMatch';
import gamesData from './games';

export default combineReducers({
        routing: routerReducer,
        currentMatch,
        gamesData,
    });
