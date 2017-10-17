import {
  CLEAR_MATCH_STATE,
  LOAD_CURRENT_MATCH,
  REMOVE_CURRENT_MATCH,
  LOAD_MATCH_DATA,
  LOAD_MATCH_DATA_SUCCESS,
  LOAD_MATCH_DATA_FAILURE,
  MATCH_NAME_ERROR,
  ANSWER_QUESTION,
  NEXT_QUESTION,
  SET_CURRENT_MATCH,
  CREATING_MATCH,
  CREATE_MATCH_SUCCESS,
  CREATE_MATCH_FAILURE,
  UPDATE_MATCH,
  TIMEOUT
} from '../constants/match';

const initialState = {
  currentMatch: '',
  match: false,
  isFetching: false,
  error: false,
  state: {
    question: 0,
    player: 'Sergio Puglia',
    score: 0,
    answer: false
  }
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
    case ANSWER_QUESTION:
      const question = state.match.game.questions[state.state.question];
      let score = state.state.score;
      if (action.correct) {
        switch (question.difficulty) {
          case 'Easy':
            score += 300;
            break;
          case 'Medium':
            score += 500;
            break;
          case 'Hard':
            score += 800;
            break;
        }
        return {
          ...state,
          state: {
            ...state.state,
            score,
            answer: action.answer
          }
        }
      }
    case TIMEOUT:
      return {
        ...state,
        state: {
          ...state.state,
          answer: state.state.answer !== false ? state.state.answer : true
        }
      };
    case NEXT_QUESTION:
      return {
        ...state,
        state: {
          ...state.state,
          question: state.state.question + 1,
          answer:false
        }
      };
    case SET_CURRENT_MATCH:
      return {
        ...state,
        match: action.match
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
    case CREATE_MATCH_SUCCESS:
      return {
        ...state,
        error: false
      }
    case CLEAR_MATCH_STATE:
      return {
        ...state,
        state: {
          ...state.state,
          question: 0,
          score: 0,
          answer: false
        }
      }
    case UPDATE_MATCH:
      return {
        ...state,
        match: action.match
      }
    default:
      return state
  }
}
