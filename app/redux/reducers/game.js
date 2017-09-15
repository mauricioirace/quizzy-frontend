import {
  ADD_QUESTION,
  CHANGE_QUESTION_NAME,
  CHANGE_QUESTION_DIFFICULTY,
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
    case CHANGE_QUESTION_DIFFICULTY:
      return{
        ...state,
        questions: state.questions.map( (question, index) => {
          console.log('question',  question)
          console.log('index', index)
          console.log('action', action)
          return {
            ...question,
            difficulty: index === action.index ? action.difficulty : question.difficulty
            }
        })

      }  
    case CHANGE_QUESTION_NAME:
      return {
        ...state,
        questions: state.questions.map( (question, index) => {
          return {
            ...question,
            text: index === action.index ? action.questionName : question.text
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
