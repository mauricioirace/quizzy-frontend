import {
  ADD_QUESTION,
  CHANGE_QUESTION_NAME
} from "../constants/game";

const initialState = {
  questions: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        questions: [
          {
            question: action.question,
            index: state.questions.length
          }
        ].concat(state.questions)
      };
    case CHANGE_QUESTION_NAME:
      return {
        ...state,
        questions: state.questions.map((q,i) => {
          return {
            question: {
              ...q.question,
              name: i == q.index ? state.questionName : q.name
            },
            index: i
          }
        })
      };
      default:
        return state;

  }
}
