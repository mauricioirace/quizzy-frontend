import React from 'react';
import { connect } from 'react-redux';
import { changeAnswer, changeSelectedAnswer } from '../redux/actions/game';

const mapStateToProps = (state) => {
  return {
    questions: state.gameData.questions
  }
}

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
            defaultValue={ this.props.text }
            onClick={ this.handleChange }
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
            defaultValue={ this.props.text }
            onChange={ this.handleChange }
          />
          <br/>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
