import {
  LOAD_GAMES,
  LOAD_GAMES_SUCCESS,
  LOAD_GAMES_FAILURE,
} from '../constants/games';

const initialState = {
  games: [],
  isFetching: false,
  error: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAMES:
      return {
        ...state,
        games: false,
        isFetching: true,
      }
    case LOAD_GAMES_SUCCESS:
      return {
        ...state,
        games: action.games,
        isFetching: false,
      }
    case LOAD_GAMES_FAILURE:
      return {
        ...state,
          games: ['falle'],
        isFetching: false,
        error: true,
      }
    default:
      return state
  }
}
