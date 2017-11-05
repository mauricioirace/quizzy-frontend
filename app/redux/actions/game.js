import gameService from '../../services/game';
import { push } from 'react-router-redux';
import {
  ADD_QUESTION,
  CHANGE_HINT_QUESTION,
  REMOVE_QUESTION,
  CHANGE_QUESTION_NAME,
  REMOVE_ALL_QUESTIONS,
  REMOVE_ALL_DATA,
  CHANGE_ANSWER,
  CHANGE_IMAGE,
  CHANGE_SELECTED_ANSWER,
  CHANGE_QUESTION_DIFFICULTY,
  CHANGE_DESCRIPTION,
  CHANGE_NAME,
  CHANGE_CATEGORY,
  CREATING_GAME,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILURE,
  SHOW_ERROR,
  HIDE_ERROR,
  ADD_OR_REMOVE_QUESTION_ANSWER,
} from '../constants/game';


export const changeImage = (image) => {
  return {
    type: CHANGE_IMAGE,
    image
  }
};

export const changeDescription = (description) => {
  return {
    type: CHANGE_DESCRIPTION,
    description
  }
};
export const creatingGame = () => {
  return {
    type: CREATING_GAME,
  }
};

export const createGameSuccess = (game) => {
  return {
    type: CREATE_GAME_SUCCESS,
    game
  }
};

export const createGameFailure = () => {
  return {
    type: CREATE_GAME_FAILURE,
    error: true
  }
};

export const createGame = (game,onSuccess) => {
  return (dispatch) => {
    gameService.create(game)
      .then(() => {
        onSuccess();
      })
      .catch((error) => {
        dispatch(createGameFailure())
      });
  }
};

export const changeQuestionDifficulty = (difficulty, index) => {
  return {
    type: CHANGE_QUESTION_DIFFICULTY,
    difficulty,
    index
  }
};

// Acción que modifica el hint
export const changeHintQuestion = (hint, index) => {
  return {
    type: CHANGE_HINT_QUESTION,
    hint,
    index
  }
};

export const changeQuestionName = (questionName, index) => {
  return {
    type: CHANGE_QUESTION_NAME,
    questionName,
    index
  }
};

export const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question
  }
};

export const removeQuestion = (question, index) => {
  return {
    type: REMOVE_QUESTION,
    question,
    index
  }
};

export const removeAllQuestions = () => {
  return {
    type: REMOVE_ALL_QUESTIONS,
  }
};

export const removeAllData = () => {
  return {
    type: REMOVE_ALL_DATA,
  }
};

export const changeAnswer = (question, answer, index) => {
  return {
    type: CHANGE_ANSWER,
    question,
    answer,
    index
  };
};

export const addOrRemoveQuestionAnswer = (answers, index) => {
  return {
    type: ADD_OR_REMOVE_QUESTION_ANSWER,
    answers,
    index
  };
};

export const foundError = (error, question, index) => {
  return {
    type: SHOW_ERROR,
    question,
    index,
    error,
  }
};

export const removeError = (error, question, index) => {
  return {
    type: HIDE_ERROR,
    question,
    index,
    error,
  }
};

export const changeSelectedAnswer = (question, answer) => {
  return {
    type: CHANGE_SELECTED_ANSWER,
    question,
    answer
  }
};

export const changeName = (name) => {
  return {
    type: CHANGE_NAME,
    name
  }
};

export const changeCategory = (category) => {
  return {
    type: CHANGE_CATEGORY,
    category
  }
};
