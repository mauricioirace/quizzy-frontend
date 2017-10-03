import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/answer-question.scss';
import AnswerButton from './answer-button';
import { ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { answerQuestion, nextQuestion } from '../redux/actions/match';
import ReactTimeout from 'react-timeout';
import { withRouter } from 'react-router-dom';

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

  constructor(props) {
    super(props);
    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.state= {
      reveal: false
    };
  }

  onClickAnswer(correct, answer) {
    this.props.answerQuestion(correct,answer);

    this.props.setTimeout( () => {
      const next = this.props.matchState.question + 1;
      const total = this.props.matchData.game.questions.length;

      if ( next >= total) {
        this.props.history.push('/end-normal-game');
      } else {
        this.props.nextQuestion();
      }
    },3000);
  }

  render() {
    const answered = this.props.matchState.answer;
    console.log(this.props);
    const answers = this.props.answers.map((answer, index) => {
      const correct = index === this.props.correctAnswer;
      return (
        <AnswerButton
          key={ index }
          id={ index }
          text={ answer }
          correct={ index === this.props.correctAnswer }
          onClick={ () => this.onClickAnswer(correct,index) }
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
export default AnswerButtons;