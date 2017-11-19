import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
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
import matchService from '../services/match';

const mapStateToProps = state => {
  return {
    matchData: state.matchData.match,
    matchState: state.matchData.state
  }
};

const mapDispatchToProps = dispatch => {
  return {
    answerQuestion: (correct, answer, hintUsed) => dispatch(answerQuestion(correct, answer, hintUsed)),
    nextQuestion: () => dispatch(nextQuestion()),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
@ReactTimeout
@withRouter
class AnswerButtons extends React.PureComponent {
  mapping;
  firstRender = true;

  constructor(props) {
    super(props);
    this.onClickAnswer = this.onClickAnswer.bind(this);
  }

  onClickAnswer(correct, answer) {
    this.props.answerQuestion(correct, answer, this.props.hintUsed);
  }

  waitForNextQuestion() {
    // view between questions
    this.props.setTimeout( () => {
      const next = this.props.matchState.question + 1;
      const total = this.props.matchData.game.questions.length;
      if (next >= total) {
        this.updateRanking();
      } else {
        this.firstRender = true;
        this.props.nextQuestion();
        this.props.hideHint();
      }
    }, 4000);
  }

  updateRanking = () => {
    const { id } = this.props.matchData;
    const { player, score } = this.props.matchState;
    if (player !== '') {
      matchService.rankingInsert(id, player, score)
      .then((res) => {
        this.props.history.push(`/end-normal-game/${ id }/${ player }/${ score }`);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  render() {
    const answered = this.props.matchState.answer;
    if(answered !== false) {
      this.waitForNextQuestion();
    } else {
      const lenAnswers = this.props.answers.length;
      if (this.firstRender) {
        this.firstRender = false;
        this.mapping = [ ...Array(lenAnswers).keys() ]; // array from 0 to lenAnswers - 1
        shuffle(this.mapping);
      }
    }

    const answers = this.props.answers.map((_, oldIndex) => {
      const index = this.mapping[oldIndex];
      const answer = this.props.answers[index];
      const correct = index === matchService.decrypt(this.props.matchData.game.questions[this.props.matchState.question]);

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
  correctAnswer: PropTypes.number,
  matchData: PropTypes.object,
  matchState: PropTypes.object,
  answerQuestion: PropTypes.func,
  history: ReactRouterPropTypes.history,
  location: ReactRouterPropTypes.location,
  match: ReactRouterPropTypes.match,
  nextQuestion: PropTypes.func
};

export default AnswerButtons;
