import {
  LOAD_GAME,
  REMOVE_GAME,
} from '../constants/game';

const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME:
      return action.game;
    case REMOVE_GAME:
      return '';
    default:
      return state
  }
}
