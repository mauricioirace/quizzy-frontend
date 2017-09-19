import React from 'react';
import { connect } from 'react-redux';
import { changeAnswer, changeSelectedAnswer } from '../redux/actions/game';
import EmptyFieldError from '../components/errors/emptyFieldError';
import { foundError, removeError } from '../redux/actions/game';

const mapStateToProps = (state,props) => {
  return {
    self: state.gameData.questions[props.question].answers[props.id]
    questions: state.gameData.questions,
    error : state.gameData.error,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAnswer: (question, answer, index) => dispatch(changeAnswer(question, answer, index)),
    changeSelectedAnswer: (question, answer) => dispatch(changeSelectedAnswer(question, answer))
    foundError: (error, question, index) => dispatch(foundError(error, question, index)),
    removeError: (error, question, index) => dispatch(removeError(error, question, index)),
  }
};

class Answer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.validateAnswers = this.validateAnswers.bind(this);
  }

  hasErrors(errors) {
    return errors.filter( (error) => {
      return error.answer === this.props.id && error.question === this.props.question;
    } ).length > 0;
  }

  handleChange(event) {
    this.props.changeAnswer(this.props.question, event.target.value, this.props.id);
  }

  handleSelectionChange(event) {
    this.props.changeSelectedAnswer(this.props.question, event.target.value);
  }

  validateAnswers(event) {
    if (event.target.value === '' && !this.hasErrors(this.props.error)){
      console.log('oli');
      this.props.foundError('emptyFieldError', this.props.question, this.props.id);
    }else if (event.target.value !== '' && this.hasErrors(this.props.error)) {
      console.log('olo');
      this.props.removeError('emptyFieldError', this.props.question, this.props.id);
    }
  }

  render() {
    if (this.props.correct) {
      return (
        <div>
          <input
            type='radio'
            name={ this.props.question }
            value={ this.props.id }
            checked={ this.props.correct }
            onClick={ this.handleSelectionChange }
          />
          <input
            className='answer correct'
            type='text'
            value={ this.props.text }
            placeholder={ 'Answer #' + (this.props.id + 1) }
            onChange={ this.handleChange }
            onBlur={ this.validateAnswers }
          />
          <EmptyFieldError show = { this.hasErrors(this.props.error) } subject = 'Answer' />
          <br/>
        </div>
      )
    }
    else {
      return (
        <div>
          <input
            type='radio'
            name={ this.props.question }
            value={ this.props.id }
            checked={ this.props.correct }
            onClick={ this.handleSelectionChange }
          />
          <input
            className='answer'
            type='text'
            value={ this.props.text }
            placeholder={ 'Answer #' + (this.props.id + 1) }
            onChange={ this.handleChange }
            onBlur={ this.validateAnswers }
          />
          <EmptyFieldError show = { this.hasErrors(this.props.error) } subject = 'Answer'/>
          <br/>
        </div>
      )
    }
  }
}

Answer.propTypes = {
  text : React.PropTypes.string.isRequired,
  //correct : React.PropTypes.bool.isRequired,
  key : React.PropTypes.number,
  id : React.PropTypes.number,
  question : React.PropTypes.number,
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
