import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeAnswer, changeSelectedAnswer, foundError, removeError } from '../redux/actions/game';
import EMPTY_FIELD_ERROR from '../constants/game';
import '../stylesheets/question.scss';
import { Form, FormControl, FormGroup, Radio, Checkbox, InputGroup } from 'react-bootstrap';
import { Icon } from 'react-fa';

const mapStateToProps = (state,props) => {
  return {
    self: state.gameData.questions[props.question].answers[props.id],
    questions: state.gameData.questions,
    error : state.gameData.error,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAnswer: (question, answer, index) => dispatch(changeAnswer(question, answer, index)),
    changeSelectedAnswer: (question, answer) => dispatch(changeSelectedAnswer(question, answer)),
    foundError: (error, question, index) => dispatch(foundError(error, question, index)),
    removeError: (error, question, index) => dispatch(removeError(error, question, index)),
  }
};

class Answer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);
  }

  handleChange(event) {
    this.props.hideAlert();
    this.props.changeAnswer(this.props.question, event.target.value, this.props.id);
  }

  handleSelectionChange(event) {
    this.props.hideAlert();
    this.props.changeSelectedAnswer(this.props.question, event.target.value);
  }

  removeAnswer(index) {
    const correctAnswerIndex = this.props.questions[this.props.question].correctAnswer;
    if (correctAnswerIndex != 0) {
      if (index <= correctAnswerIndex) {
        this.props.changeSelectedAnswer(this.props.question, correctAnswerIndex - 1);
      }
    }
    this.props.removeAnswer(index);
  }

  handleKeyDown(target, index) {
    if ((target.keyCode === 9 && index < 5) || (target.keyCode === 13)) {
      this.props.handleEnter(target, index);
    }
  }

  render() {
    return (
      <div className='answer'>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>
             <Icon name='close' id='arAnswer' onClick={ () => this.removeAnswer(this.props.id) }/>
            </InputGroup.Addon>
            <FormControl
              autoFocus
              className='answer'
              type='text'
              value={ this.props.text }
              placeholder={ 'Answer #' + (this.props.id + 1) }
              onChange={ this.handleChange }
              onKeyDown={ (target) => this.handleKeyDown(target, this.props.id) }
            />
            <InputGroup.Addon>
              <input type='checkbox' aria-label='...'
              name={ this.props.question }
              value={ this.props.id }
              checked={ this.props.correct }
              onClick={ this.handleSelectionChange }
            />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </div>
    )
  }
}

Answer.propTypes = {
  text : PropTypes.string.isRequired,
  key : PropTypes.number,
  id : PropTypes.number,
  question : PropTypes.number,
  self: PropTypes.object,
  questions: PropTypes.array,
  error : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  correct: PropTypes.bool,
  changeAnswer: PropTypes.func,
  changeSelectedAnswer: PropTypes.func,
  foundError: PropTypes.func,
  removeError: PropTypes.func,
  hideAlert: PropTypes.func,
  removeAnswer: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
