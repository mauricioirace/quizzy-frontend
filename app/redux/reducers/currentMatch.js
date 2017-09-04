import {
  LOAD_CURRENT_MATCH,
  REMOVE_CURRENT_MATCH,
} from '../constants/currentMatch';

const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENT_MATCH:
      return action.currentMatch;
    case REMOVE_CURRENT_MATCH:
      return '';
    default:
      return state
  }
}
