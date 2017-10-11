import { combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import matchReducer from './match';
import matchesReducer from './matches';
import gamesReducer from './games';
import gameReducer from './game';
import matchesReducer from './matches';

export default combineReducers({
  routing: routerReducer,
  matchData: matchReducer,
  matchesData: matchesReducer,
  gamesData: gamesReducer,
  gameData: gameReducer,
  matchesData: matchesReducer
});
