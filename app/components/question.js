import React from 'react';
import Answer from './answer';
import { connect } from 'react-redux';
import { changeQuestionName, changeQuestionDifficulty, removeQuestion } from '../redux/actions/game';

const mapDispatchToProps = (dispatch) => {
    return {
      changeQuestionName: (newQuestion, index) => dispatch(changeQuestionName(newQuestion, index)),
      changeQuestionDifficulty: (newDifficulty, index) => dispatch(changeQuestionDifficulty(newDifficulty, index)),
      removeQuestion: (question) => dispatch(removeQuestion(question)),
    };
};

const mapStateToProps = (state,props) => {
    return {
      self: state.gameData.questions[props.id]
    };
};

class Question extends React.PureComponent {
  constructor(props){
    super(props);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
    this.onRemoveQuestion = this.onRemoveQuestion.bind(this);
  }

  changeQuestion(event) {
    this.props.changeQuestionName(event.target.value, this.props.id);
  }

  changeDifficulty (event) {
    this.props.changeQuestionDifficulty(event.target.value, this.props.id);
  }

  onRemoveQuestion(index) {
    this.props.removeQuestion(this.props.id);
  }

  render() {
    const question = this.props.self;
    const id = this.props.id;
    const answers = [];
    question.answers.forEach( (answer, index) => {
      answers.push(
        <Answer
          key={ index }
          id={ index }
          text={ answer }
          correct={ question.correctAnswer == index }
          question={ id }
        />);
    });

    return (
      <li>
        <input 
          type='text' 
          onChange={ this.changeQuestion } 
          value={ question.text } 
          placeholder={ 'Question #' + (this.props.id + 1) } 
        />
        Difficulty
        <select onChange={ this.changeDifficulty } value={ this.props.self.difficulty } >
          <option value='Easy'>Easy</option>
          <option value='Medium'>Medium</option>
          <option value='Hard'>Hard</option>
        </select>
        <button onClick={ this.onRemoveQuestion }> X </button>
        <br/>
        <ul>
          { answers }
        </ul>
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);