import React from 'react';
import Answer from './answer';
import { connect } from 'react-redux';
import { changeQuestionName, changeQuestionDifficulty,changeHintQuestion } from '../redux/actions/game';
import '../stylesheets/question.scss';
import { Row, Col, Form, FormGroup, FormControl, Button,
  Glyphicon, FieldGroup, ControlLabel, InputGroup } from 'react-bootstrap';

const mapDispatchToProps = (dispatch) => {
    return {
      changeQuestionName: (newQuestion, index) => dispatch(changeQuestionName(newQuestion, index)),
      changeQuestionDifficulty: (newDifficulty, index) => dispatch(changeQuestionDifficulty(newDifficulty, index)),
      changeHintQuestion: (newHint, index) => dispatch(changeHintQuestion(newHint, index)),
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
    this.changeHint = this.changeHint.bind(this);
  }

  changeQuestion(event) {
    this.props.changeQuestionName(event.target.value, this.props.id);
  }

  changeHint(event){
    this.props.changeHintQuestion(event.target.value, this.props.id);
  }


  changeDifficulty (event) {
    this.props.changeQuestionDifficulty(event.target.value, this.props.id);
  }

  render() {
    const question = this.props.self;
    const hint = this.props.id;
    const id = this.props.id;
    const answers = [];
    question.answers.forEach( (answer, index) => {
      answers.push(
        <Answer
          key={ index }
          id={ index }
          text={ answer.answer }
          correct={ question.correctAnswer == index }
          question={ id }
        />);
    });

    return (
      <div className='question'>
        <FormGroup>
          <InputGroup>
          <FormControl
            type='text'
            onChange={ this.changeQuestion }
            value={ question.text }
            placeholder={ 'Question text' }
          /> {' '}
          <InputGroup.Addon>
            ?
          </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Hint:</ControlLabel>
          <InputGroup>
            <FormControl
              type='text'
              onChange={ this.changeHint }
              value={ question.hint }
              placeholder={ 'Question hint' }
            /> {' '}
            <InputGroup.Addon>
              !
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Difficulty:</ControlLabel>
          <FormControl componentClass="select" onChange={ this.changeDifficulty }
          value={ this.props.self.difficulty }>
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Answers:</ControlLabel>
            { answers }
        </FormGroup>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
