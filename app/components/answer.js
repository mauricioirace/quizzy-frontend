import React from 'react';
import { connect } from 'react-redux';
import { changeAnswer, changeSelectedAnswer } from '../redux/actions/game';

const mapStateToProps = (state,props) => {
  return {
    self: state.gameData.questions[props.question].answers[props.id]
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAnswer: (question, answer, index) => dispatch(changeAnswer(question, answer, index)),
    changeSelectedAnswer: (question, answer) => dispatch(changeSelectedAnswer(question, answer))
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
    if (this.props.correct) {
      return (
        <div>
          <input
            type='radio'
            name={ this.props.question }
            value={ this.props.id }
            onClick={ this.handleSelectionChange }
          />
          <input
            className='answer correct'
            type='text'
            value={ this.props.text }
            placeholder={ 'Enter answer #' + (this.props.id + 1) }
            onChange={ this.handleChange }
          />
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
            onClick={ this.handleSelectionChange }
          />
          <input
            className='answer'
            type='text'
            value={ this.props.text }
            placeholder={ 'Enter answer #' + (this.props.id + 1) }
            onChange={ this.handleChange }
          />
          <br/>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
