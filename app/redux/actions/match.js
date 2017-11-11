import matchService from '../../services/match'
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
  REDIRECT,
  REDIRECT_ON,
  REDIRECT_OFF
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

export const removeMatch = () => {
  return {
    type: REMOVE_MATCH,
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

export const setCurrentMatch = (match) => ({
  type: SET_CURRENT_MATCH,
  match,
});

export const fetchMatch = (matchName) => {
  return (dispatch) => {
    dispatch(loadMatchData());
    matchService.retrieve(matchName)
      .then((res) => {
        dispatch(loadMatchDataSuccess(res.data.match))
      })
      .catch((err) => {
        dispatch(loadMatchDataFailure())
      });
  }
};

export const creatingMatch = () => {
  return {
    type: CREATING_MATCH,
  }
};

export const createMatchSuccess = () => {
  return {
    type: CREATE_MATCH_SUCCESS,
  }
};

export const createMatchFailure = () => {
  return {
    type: CREATE_MATCH_FAILURE,
    error: true
  }
};

export const clearMatchState = (error) => {
  return {
    type: CLEAR_MATCH_STATE,
  }
};

export const createMatch = (match, onSuccess) => {
  return (dispatch) => {
    dispatch(creatingMatch());
    matchService.create(match)
      .then((res) => {
        dispatch(createMatchSuccess());
        const newMatch = res.data.match;
        onSuccess(newMatch);
      })
      .catch((error) => {
        dispatch(createMatchFailure())
      });
  }
};

export const redirectOn = () => {
  return {
    type: REDIRECT_ON
  }
};

export const redirectOff = () => {
  return {
    type: REDIRECT_OFF
  }
};

export const receiveMessageRealTime = ({ data }) => {
  return (dispatch, getState) => {
    const url = getState().matchData.match.url;
    const player = getState().matchData.state.player;
    const ws = getState().wsData.ws;
    const totalPlayers = getState().matchData.match.totalPlayers;

    if (data === 'hola') {
      ws.send(JSON.stringify([
        url,
        player
      ]));
    } else {
      let start = false;

      const messages = JSON.parse(data);
      let players = [];
      for (let i = 0; i < messages.length; i++) {
        if (messages[i][0] === url) {
          if (messages[i][1].localeCompare('start') == 0) {
            start = true;
          } else {
            players.push(messages[i][1]);
          }
        }
      }
      if (start){
        dispatch(setPlayers(players));
        dispatch(redirectOn());
        ws.close();
      } else {
        if (totalPlayers == players.length) {
          ws.send(JSON.stringify([
            url,
            'start'
          ]));
        }
      }
      dispatch(setPlayers(players));
    }
  }
};

export const redirect = () => ({
  type: REDIRECT
});

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  players
});

export const updateMatch = (match) => ({
  type: UPDATE_MATCH,
  match
});

export const setPlayer = (nickname) => ({
  type: SET_PLAYER,
  player: nickname
});

export const matchNameError = (msg) => ({
  type: MATCH_NAME_ERROR,
  msg
});

export const answerQuestion = (correct, answer) => ({
  type: ANSWER_QUESTION,
  correct,
  answer
});

export const timeout = () => ({
  type: TIMEOUT
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});
