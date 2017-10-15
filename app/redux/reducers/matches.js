import {
  LOAD_MATCHES,
  LOAD_MATCHES_SUCCESS,
  LOAD_MATCHES_FAILURE,
} from '../constants/matches';

const initialState = {
  matches: false,
  isFetching: false,
  error: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MATCHES:
      return {
        ...state,
        matches: false,
        isFetching: true,
      }
    case LOAD_MATCHES_SUCCESS:
      return {
        ...state,
        matches: action.matches,
        isFetching: false,
      }
    case LOAD_MATCHES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    default:
      return state
  }
}
