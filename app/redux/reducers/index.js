import { combineReducers, applyMiddleware } from "redux";
import { routerReducer } from 'react-router-redux';
import game from './game';
import games from './games';

export default combineReducers({
        routing: routerReducer,
        game,
        games,
    });
