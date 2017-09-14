import React from 'react';
import Answer from './answer';
import { connect } from 'react-redux';
import { changeQuestionName } from '../redux/actions/game';
const mapDispatchToProps = (dispatch) => {
  return {
    changeQuestionName: (newQuestion, index) => dispatch(changeQuestionName(newQuestion, index))
  };
};

const mapStateToProps = (state) => {
  return {  };
};

class Question extends React.PureComponent {
  constructor(props){
    super(props);
    this.changeQuestion = this.changeQuestion.bind(this);
  }


  changeQuestion(event) {
    this.props.changeQuestionName(event.target.value,this.props.id);

  }


  render() {
    let question = this.props.obj;
    let id = this.props.id;
    let answers = [];
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
        <select>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='challenging'>Challenging</option>
        </select> <br/>
        <ul>
          { answers }
        </ul>
      </li>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Question);
