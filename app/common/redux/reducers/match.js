import {
  LOAD_MATCH,
} from '../constants/match';

const initialState = {
  match: '',
}

export default matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MATCH:
      return {
        ...state,
        match: action.match,
      }
    default:
      return state
  }
}
