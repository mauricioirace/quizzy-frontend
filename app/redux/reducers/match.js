import {
  LOAD_CURRENT_MATCH,
  REMOVE_CURRENT_MATCH,
  LOAD_MATCH_DATA,
  LOAD_MATCH_DATA_SUCCESS,
  LOAD_MATCH_DATA_FAILURE,
  CREATING_MATCH,
  CREATE_MATCH_SUCCESS,
  CREATE_MATCH_FAILURE,
  MATCH_NAME_ERROR,
} from '../constants/match';

const initialState = {
  currentMatch: '',
  match: false,
  isFetching: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MATCH_NAME_ERROR:
      return {
        ...state,
        error: action.msg
      };
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
    case CREATING_MATCH:
      return {
        ...state,
        error: false
      };
    case CREATE_MATCH_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state
  }
}
