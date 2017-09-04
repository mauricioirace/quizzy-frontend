import { combineReducers, applyMiddleware } from "redux";
import { routerReducer } from 'react-router-redux';
import game from './game';
import games from './games';
import matches from './matches';
export default combineReducers({
        routing: routerReducer,
        game,
        games,
        matches
    });
