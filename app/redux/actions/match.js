import matchService from '../../services/match'
import {
  LOAD_CURRENT_MATCH,
  REMOVE_CURRENT_MATCH,
  LOAD_MATCH_DATA,
  LOAD_MATCH_DATA_SUCCESS,
  LOAD_MATCH_DATA_FAILURE,
  MATCH_NAME_ERROR,
  CREATING_MATCH,
  CREATE_MATCH_SUCCESS,
  CREATE_MATCH_FAILURE,
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

export const creatingMatch = () => {
  return {
    type: CREATING_MATCH,
  }
};

export const createMatchSuccess = (match) => {
  return {
    type: CREATE_MATCH_SUCCESS,
    match
  }
};

export const createMatchFailure = (error) => {
  return {
    type: CREATE_MATCH_FAILURE,
    error
  }
};

export const createMatch = (match, onSuccess) => {
  return (dispatch) => {
    dispatch(creatingMatch());
    matchService.create(match)
      .then(() => {
        onSuccess();
      })
      .catch((error) => {
        dispatch(createMatchFailure(error.response.data.error))
      });
  }
};

export const matchNameError = (msg) => ({
  type: MATCH_NAME_ERROR,
  msg
});
