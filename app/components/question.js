import React from 'react';
import Answer from './answer';
import { connect } from 'react-redux';
import { changeQuestionName } from '../redux/actions/game';
import { changeQuestionDifficulty } from '../redux/actions/game';




const mapDispatchToProps = (dispatch) => {
    return {
    changeQuestionName: (newQuestion, index) => dispatch(changeQuestionName(newQuestion, index)),
    changeQuestionDifficulty: (newDifficulty, index) => dispatch(changeQuestionDifficulty(newDifficulty, index))
    };
};

const mapStateToProps = (state) => {
    return {  };
};

class Question extends React.PureComponent {
  constructor(props){
    super(props);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
  }


  changeQuestion(event) {
    this.props.changeQuestionName(event.target.value, this.props.id);
  }


  changeDifficulty (event) {
    this.props.changeQuestionDifficulty(event.target.value, this.props.id);
  }

  removeQuestion(){
    const id = this.props.id;
    this.props.onRemoveQuestion(id);
  }

  render() {
    const question = this.props.obj;
    const id = this.props.id;
    const answers = [];
    question.answers.forEach( (answer, index) => {
      answers.push(
        <Answer
          key={ index }
          id={ index }
          text={ answer }
          correct={ question.correctAnswer === index }
          question={ id }
        />);
    });

    return (
      <li>
        <input type='text' onChange={ this.changeQuestion } defaultValue={ question.text } />
        Difficulty
        <select onChange={ this.changeDifficulty }>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='challenging'>Challenging</option>
        </select> 
        <button onClick={this.removeQuestion.bind(this)}> X </button>
        <br/>
        <ul>
          { answers }
        </ul>
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
