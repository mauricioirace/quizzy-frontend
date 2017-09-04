import { combineReducers, applyMiddleware } from "redux";
import { routerReducer } from 'react-router-redux';
import game from './game';
import gamesData from './games';

export default combineReducers({
        routing: routerReducer,
        game,
        gamesData,
    });
