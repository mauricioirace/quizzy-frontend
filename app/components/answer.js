import React from 'react';
import { connect } from 'react-redux';
import { changeAnswer, changeSelectedAnswer } from '../redux/actions/game';
import EmptyFieldError from '../components/errors/emptyFieldError';
import { foundError, removeError } from '../redux/actions/game';
import EMPTY_FIELD_ERROR from '../constants/game';
import '../stylesheets/question.scss';
import { Form, FormControl, FormGroup, Radio, Checkbox, InputGroup } from 'react-bootstrap';

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
 }


  handleChange(event) {
    this.props.changeAnswer(this.props.question, event.target.value, this.props.id);
  }

  handleSelectionChange(event) {
    this.props.changeSelectedAnswer(this.props.question, event.target.value);
  }

  render() {
    return (
      <div>
        <FormGroup>
          <InputGroup>
            <FormControl
              className='answer'
              type='text'
              value={ this.props.text }
              placeholder={ 'Answer #' + (this.props.id + 1) }
              onChange={ this.handleChange }
            /> {' '}
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
  text : React.PropTypes.string.isRequired,
  key : React.PropTypes.number,
  id : React.PropTypes.number,
  question : React.PropTypes.number,
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
