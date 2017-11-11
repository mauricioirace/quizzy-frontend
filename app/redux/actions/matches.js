import matchService from '../../services/match';
import {
  LOAD_MATCHES,
  LOAD_MATCHES_SUCCESS,
  LOAD_MATCHES_FAILURE,
} from '../constants/matches';

export const loadMatches = () => {
  return {
    type: LOAD_MATCHES,
  }
};

export const loadMatchesSuccess = matches => {
  return {
    type: LOAD_MATCHES_SUCCESS,
    matches,
  }
};

export const loadMatchesFailure = error => {
  return {
    type: LOAD_MATCHES_FAILURE,
    error
  }
};

export const fetchMatches = () => {
  return (dispatch) => {
    dispatch(loadMatches());
    matchService.retrieve()
      .then((res) => {
        dispatch(loadMatchesSuccess(res.data.matches))
      })
      .catch((err) => {
        dispatch(loadMatchesFailure(err))
      });
  }
};

export const fetchLandingMatches = () => {
  return (dispatch) => {
    dispatch(loadMatches());
    matchService.landingMatches()
      .then((res) => {
        dispatch(loadMatchesSuccess(res.data.matches))
      })
      .catch((err) => {
        dispatch(loadMatchesFailure(err))
      });
  }
}
