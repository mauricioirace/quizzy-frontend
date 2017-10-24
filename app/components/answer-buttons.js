import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/answer-question.scss';
import AnswerButton from './answer-button';
import { ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { answerQuestion, nextQuestion } from '../redux/actions/match';
import ReactTimeout from 'react-timeout';
import { withRouter } from 'react-router-dom';
import { SlideFadeLeft } from '../components/transitions';
import shuffle from 'shuffle-array';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return {
    matchData: state.matchData.match,
    matchState: state.matchData.state
  }
};

const mapDispatchToProps = dispatch => {
  return {
    answerQuestion: (correct,answer) => dispatch(answerQuestion(correct,answer)),
    nextQuestion: () => dispatch(nextQuestion()),
  };
};


@connect(mapStateToProps, mapDispatchToProps)
@ReactTimeout
@withRouter
class AnswerButtons extends React.PureComponent {
  mapping;

  constructor(props) {
    super(props);
    this.onClickAnswer = this.onClickAnswer.bind(this);
  }

  onClickAnswer(correct, answer) {
    this.props.answerQuestion(correct, answer);
  }

  waitForNextQuestion() {
    // view between questions
    this.props.setTimeout( () => {
      const next = this.props.matchState.question + 1;
      const total = this.props.matchData.game.questions.length;

      if (next >= total) {
        this.props.history.push('/end-normal-game');
      } else {
        this.props.nextQuestion();
      }
    }, 4000);
  }

  render() {
    const answered = this.props.matchState.answer;
    if(answered !== false) {
      this.waitForNextQuestion();
    } else {
      const lenAnswers = this.props.answers.length;
      this.mapping = [ ...Array(lenAnswers).keys() ]; // array from 0 to lenAnswers - 1
      shuffle(this.mapping);
    }

    const answers = this.props.answers.map((_, oldIndex) => {
      const index = this.mapping[oldIndex];
      const answer = this.props.answers[index];
      const correct = index === this.props.correctAnswer;

      return (
          <AnswerButton
            key={ index }
            id={ index }
            text={ answer.answer }
            correct={ correct }
            onClick={ () => this.onClickAnswer(correct, index) }
            answered={ answered }
          />
      )
    });
    return (
      <ButtonGroup vertical block>
        { answers }
      </ButtonGroup>
    )
  }
}

AnswerButtons.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
  correctAnswer: PropTypes.number
};

export default AnswerButtons;