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
  REDIRECT_ON,
  REDIRECT_OFF,
  OWNER_ON,
  OWNER_OFF,
  SET_STATUS,
  SET_WINNER,
  END_MATCH, SEND_ANSWER, SENT_ANSWER, TIMEOUT
} from '../constants/match';
import {
  ANSWERED_ACTION,
  ANSWERED_SIGNAL, ANSWERED_STATE,
  ANSWERING_STATE, END_MATCH_ACTION, END_MATCH_SIGNAL, NEXT_SIGNAL,
  READY_ACTION, START_SIGNAL, TIMEOUT_ACTION, WAITING_STATE,
} from '../../constants/match';

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

export const setStatus = (status) => ({
  type: SET_STATUS,
  status
});

export const setWinner = (winner) => ({
  type: SET_WINNER,
  winner
});

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

export const receiveMessageAnswerQuestion = ({ data }) => {
  const msg = JSON.parse(data);
  return (dispatch, getState) => {
    const { status } = getState().matchData.state;
    switch (status) {
      case WAITING_STATE:
        if (msg.type = START_SIGNAL) {
          dispatch(setPlayers(msg.players));
          dispatch(setStatus(ANSWERING_STATE));
        }
        break;
      case ANSWERING_STATE:
        switch (msg.type) {
          case ANSWERED_SIGNAL:
            dispatch(setWinner(msg.winner));
            break;
        }
        break;
      case ANSWERED_STATE:
        switch (msg.type) {
          case NEXT_SIGNAL:
            dispatch(nextQuestion(msg.winner));
            break;
          case END_MATCH_SIGNAL:
            dispatch(endMatch());
            break;
        }
        break;
    }
  }
}
export const connectRealTimeMatch = (ws) => {
  return (dispatch, getState) => {
    const { url, totalPlayers, questions } = getState().matchData.match.game;
    const { player } = getState().matchData.state;
    ws.send(JSON.stringify({
      type: READY_ACTION,
      url,
      totalPlayers,
      player,
      correctAnswer: questions[0].correctAnswer
    }));
  }
}

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
          if (messages[i][1].localeCompare('start') === 0) {
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
      }
      dispatch(setPlayers(players));
    }
  }
};

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

export const ownerOn = () => {
  return {
    type: OWNER_ON
  }
};

export const ownerOff = () => {
  return {
    type: OWNER_OFF
  }
};
export const endMatch = () => ({
  type: END_MATCH
});

export const sendAnswer = (answer) => {
  return (dispatch, getState) => {
    const { player } = getState().matchData.state;
    const { ws } = getState().wsData;
    ws.send(JSON.stringify({
      type: ANSWERED_ACTION,
      answer,
      player
    }));
    dispatch(sentAnswer(answer));
  }
}

export const sendNextQuestion = (correctAnswer) => {
  return (dispatch, getState) => {
    const { ws } = getState.wsData;
    ws.send(JSON.stringify({
      type: ANSWERED_ACTION,
      correctAnswer
    }));
  }
}
export const sentAnswer = (answer) => ({
  type: SENT_ANSWER,
  answer
})
