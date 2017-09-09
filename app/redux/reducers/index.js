import { combineReducers, applyMiddleware } from "redux";
import { routerReducer } from 'react-router-redux';
import matchReducer from './match';
import gamesReducer from './games';
import gameReducer from './game';

export default combineReducers({
        routing: routerReducer,
        matchData: matchReducer,
        gamesData: gamesReducer,
        gameData: gameReducer
    });
