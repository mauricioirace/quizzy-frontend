import React from 'react';
import createGameStyle from '../assets/styles/create-game.scss';
import { addQuestion, removeQuestion, changeQuestionName, removeAllQuestions } from '../redux/actions/game';
import Questions from '../components/questions';
import Question from '../components/question';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    questions: state.gameData.questions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (question) => dispatch(addQuestion(question)),
    removeQuestion: (question) => dispatch(removeQuestion(question)),
    removeAllQuestions: () => dispatch(removeAllQuestions()),
    changeQuestionName: (newQuestion, index) => dispatch(changeQuestionName(newQuestion, index))
  };
};

const question = (question) => {
  return {
    text: `Question ${question + 1}`,
    difficulty: 'easy',
    answers: [1, 2, 3, 4].map( (answer) =>`Answer ${answer}`),
    correctAnswer: 0
  };
};

class CreateGame extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onAddQuestion = this.onAddQuestion.bind(this);
    this.onRemoveQuestion = this.onRemoveQuestion.bind(this);
  }
  
  componentWillMount() {
    // remove all questions
    this.props.removeAllQuestions();
    this.props.addQuestion(question(0));
  }

  componentWillUnmount() {
    // remove all questions
    this.props.removeAllQuestions();
  }

  onAddQuestion() {
    let indexWhereAdd = this.props.questions.length;
    this.props.addQuestion(question(indexWhereAdd));
  }

  onRemoveQuestion(index) {
    this.props.removeQuestion(index);
  }

  render() {
    let questions = this.props.questions.map( (question, index) =>
      <Question key={ index } id={ index } obj={ question } onRemoveQuestion={ this.onRemoveQuestion } />);
    return (
      <div>
        <h2> MAKE UP YOUR OWN GAME </h2>
        Name <input type='text' name='name' placeholder='eg: Tennis Champions'/>
        Image <button>Load</button><br/>
        Category
        <select>
          <option value='sport'>Sport</option>
          <option value='tv'>Television</option>
          <option value='videogames'>Videogames</option>
        </select> <br/>
        Questions <br/>
        <Questions>
          { questions } 
        </Questions>
        <button onClick={ this.onAddQuestion }>Add...</button> <br/>
        <button>Done</button>  <button>Cancel</button> <br/>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateGame);
