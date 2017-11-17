import {
  SET_PLAYERS,
  CLEAR_MATCH_STATE,
  LOAD_CURRENT_MATCH,
  REMOVE_CURRENT_MATCH,
  REMOVE_MATCH,
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
  SET_PLAYER,
  TIMEOUT,
  REDIRECT_ON,
  REDIRECT_OFF,
  OWNER_ON,
  OWNER_OFF,
  SET_STATUS,
  SET_WINNER,
  END_MATCH, SENT_ANSWER
} from '../constants/match';
import { ANSWERED_STATE, ANSWERING_STATE, FINISHED_STATE, WAITING_STATE } from '../../constants/match';

const initialState = {
  owner: false,
  redirect: false,
  currentMatch: '',
  match: false,
  isFetching: false,
  error: false,
  state: {
    question: 0,
    player: '',
    score: 0,
    answer: false,
    players: [],
    status: WAITING_STATE,
    winner: null
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
    case REMOVE_MATCH:
    return {
      ...state,
      match: false,
      error: false
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

      }
      return {
        ...state,
        state: {
          ...state.state,
          score,
          answer: action.answer
        }
      };
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
          answer: false,
          winner: null,
          status: ANSWERING_STATE
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
          answer: false,
          status: WAITING_STATE
        }
      }
    case UPDATE_MATCH:
      return {
        ...state,
        match: action.match
      }
    case SET_PLAYER:
      return {
        ...state,
        state: {
          ...state.state,
          player: action.player
        }
      }
    case SET_PLAYERS:
      return {
        ...state,
        state: {
          ...state.state,
          players: action.players
        }
      }
    case REDIRECT_ON:
      return {
        ...state,
        redirect: true
      }
    case REDIRECT_OFF:
      return {
        ...state,
        redirect: false
      }
    case OWNER_ON:
      return {
        ...state,
        owner: true
      }
    case OWNER_OFF:
      return {
        ...state,
        owner: false
      }
    case SET_STATUS:
      return {
        ...state,
        state: {
          ...state.state,
          status: action.status
        }
      }
    case SET_WINNER:
      return {
        ...state,
        state: {
          ...state.state,
          status: ANSWERED_STATE,
          winner: action.winner
        }
      }
    case END_MATCH:
      return {
        ...state,
        state: {
          ...state.state,
          status: FINISHED_STATE,
        }
      }
    case SENT_ANSWER:
      return {
        ...state,
        state: {
          ...state.state,
          answer: action.answer
        }
      }
    default:
      return state
  }
}
