import {
  ADD_QUESTION,
  CHANGE_QUESTION_NAME,
  REMOVE_ALL_QUESTIONS
} from "../constants/game";

const initialState = {
  questions: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        questions: state.questions.concat([ action.question ])
      };
    case CHANGE_QUESTION_NAME:
      return {
        ...state,
        questions: state.questions.map( (question, index) => {
          return {
            ...question,
            name: index === action.index ? action.questionName : question.name
            }
        })
      };
    case REMOVE_ALL_QUESTIONS:
      return {
        ...state,
        questions: []
      };
      default:
        return state;
  }
}
