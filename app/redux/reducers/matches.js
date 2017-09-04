import {
    FETCH_MATCHES_SUCCESS,
    FETCH_MATCHES_FAILURE,
    FETCH_MATCHES
} from '../constants/matches';

const initialState = {
    match: null,
    isFetching: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MATCHES:
            return {
                ...state,
                error: null,
                isFetching: true,
            }
        case FETCH_MATCHES_SUCCESS:
            return {
                ...state,
                match: action.match,
                isFetching: false,
            }
        case FETCH_MATCHES_FAILURE:
            return {
                ...state,
                match: null,
                isFetching: false,
                error: action.error,
            }
        default:
            return state
    }
}
