import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux';
import match from './match';
import gamesData from './games';

const rootReducer = combineReducers({
    routing: routerReducer,
    match,
    gamesData,
});

export default rootReducer;
