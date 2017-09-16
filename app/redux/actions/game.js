import {
  ADD_QUESTION,
  REMOVE_QUESTION,
  CHANGE_QUESTION_NAME,
  REMOVE_ALL_QUESTIONS,
  CHANGE_ANSWER,
  CHANGE_IMAGE,
  CHANGE_SELECTED_ANSWER,
  CHANGE_QUESTION_DIFFICULTY,
  CHANGE_DESCRIPTION,
  CHANGE_NAME,
  CHANGE_CATEGORY

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

export const changeQuestionDifficulty = (difficulty, index) => {
  return {
      type: CHANGE_QUESTION_DIFFICULTY, 
      difficulty,
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

export const changeAnswer = (question, answer, index) => {
  return {
    type: CHANGE_ANSWER,
    question,
    answer,
    index
  };
};

export const foundError = (error) => {
  return {
    type: 'Done',
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