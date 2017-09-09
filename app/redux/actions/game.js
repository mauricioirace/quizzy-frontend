import {
  ADD_QUESTION,
  CHANGE_QUESTION_NAME
} from '../constants/game';


export const changeQuestionName = (questionName,index) => {
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