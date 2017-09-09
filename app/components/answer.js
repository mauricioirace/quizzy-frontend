import React from 'react';
import { connect } from 'react-redux';
import { changeAnswer } from '../redux/actions/game';

const mapStateToProps = (state) => {
  return {
    questions: state.gameData.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAnswer: (question, answer, index) => dispatch(changeAnswer(question, answer, index))
  }
};

class Answer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.changeAnswer(this.props.question, event.target.value, this.props.id);
  }

  render() {
    if (this.props.correct) {
      return (
        <div>
          <input
            className='answer correct'
            type='text'
            defaultValue={ this.props.text }
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
