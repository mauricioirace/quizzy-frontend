import { combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import matchReducer from './match';
import matchesReducer from './matches';
import gamesReducer from './games';
import gameReducer from './game';

export default combineReducers({
  routing: routerReducer,
  matchData: matchReducer,
  matchesData: matchesReducer,
  gamesData: gamesReducer,
  gameData: gameReducer
});
