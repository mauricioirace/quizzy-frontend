import { combineReducers, applyMiddleware } from "redux";
import { routerReducer } from 'react-router-redux';
import matchData from './match';
import gamesData from './games';

export default combineReducers({
        routing: routerReducer,
        matchData,
        gamesData,
    });
