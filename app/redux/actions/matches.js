import matchService from '../../services/match';
import { FETCH_MATCHES, FETCH_MATCHES_FAILURE, FETCH_MATCHES_SUCCESS } from "../constants/matches";

export const fetchingMatchesByName = () => {
    return {
        type: FETCH_MATCHES,
    }
}

export const fetchMatchesSuccess = matches => {
    return {
        type: FETCH_MATCHES_SUCCESS,
        matches,
    }
};

export const fetchMatchesFailure = err => {
    return {
        type: FETCH_MATCHES_FAILURE,
        error: err
    }
};
export const fetchMatchByName = () => {
    return (dispatch) => {
        dispatch(fetchingMatchesByName());
        matchService.retrieve()
            .then((res) => {
                dispatch(fetchMatchesSuccess(res.data.match))
            })
            .catch((err) => {
                dispatch(fetchMatchesFailure (err))
            });
    }
};
