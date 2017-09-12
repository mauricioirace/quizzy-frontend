import {
  ADD_QUESTION,
  REMOVE_QUESTION,
  CHANGE_QUESTION_NAME,
  REMOVE_ALL_QUESTIONS,
  CHANGE_ANSWER
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
    case REMOVE_QUESTION:
      console.log("REMOVEEE ACTION", action.question);
      console.log("QUESTIONSSSS", state.questions);
      return {
        ...state,
        questions: state.questions.filter( (question, index) => {
          return action.question !== index
        }
      )};
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
    case CHANGE_ANSWER:
      let newAnswers = state.questions[action.question].answers.slice(0, 4);
      newAnswers[action.index] = action.answer;
      let newQuestions = state.questions.slice(0, state.questions.length);
      newQuestions[action.question].answers = newAnswers;
      return {
        ...state,
        questions: newQuestions
      }
    default:
      return state;
  }
}
