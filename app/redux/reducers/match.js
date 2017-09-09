import {
  LOAD_CURRENT_MATCH,
  REMOVE_CURRENT_MATCH,
  LOAD_MATCH_DATA,
  LOAD_MATCH_DATA_SUCCESS,
  LOAD_MATCH_DATA_FAILURE,
} from '../constants/match';

const initialState = {
  currentMatch: '',
  match: false,
  isFetching: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENT_MATCH:
      return {
        ...state,
        currentMatch: action.currentMatch,
      };
    case REMOVE_CURRENT_MATCH:
    return {
      ...state,
      currentMatch: '',
    };
    case LOAD_MATCH_DATA:
      return {
        ...state,
        match: false,
        error: false,
        isFetching: true,
      };
    case LOAD_MATCH_DATA_SUCCESS:
      return {
        ...state,
        match: action.match,
        isFetching: false,
        error: false,
      };
    case LOAD_MATCH_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state
  }
}