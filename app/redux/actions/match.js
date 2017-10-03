import matchService from '../../services/match'
import {
  LOAD_CURRENT_MATCH,
  REMOVE_CURRENT_MATCH,
  LOAD_MATCH_DATA,
  LOAD_MATCH_DATA_SUCCESS,
  LOAD_MATCH_DATA_FAILURE,
  MATCH_NAME_ERROR,
  ANSWER_QUESTION,
  NEXT_QUESTION
} from '../constants/match';

export const loadCurrentMatch = (input) => {
  return {
    type: LOAD_CURRENT_MATCH,
    currentMatch: input,
  }
}

export const removeCurrentMatch = () => {
  return {
    type: REMOVE_CURRENT_MATCH,
  }
}

export const loadMatchData = () => ({
  type: LOAD_MATCH_DATA,
});

export const loadMatchDataSuccess = (match) => ({
  type: LOAD_MATCH_DATA_SUCCESS,
  match,
});

export const loadMatchDataFailure = () => ({
  type: LOAD_MATCH_DATA_FAILURE,
});

export const fetchMatch = (matchName) => {
  return (dispatch) => {
    dispatch(loadMatchData());
    matchService.retrieve(matchName)
      .then((res) => {
        dispatch(loadMatchDataSuccess(res.data.match))
      })
      .catch((err) => {
        console.log(err);
        dispatch(loadMatchDataFailure())
      });
  }
};

export const matchNameError = (msg) => ({
  type: MATCH_NAME_ERROR,
  msg
});

export const answerQuestion = (correct,answer) => ({
  type: ANSWER_QUESTION,
  correct,
  answer
});
export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});