import React from 'react';
import AnswerButtons from '../components/answer-buttons';
import { Col, Grid, Row } from 'react-bootstrap';
import '../stylesheets/answer-question.scss';
import { connect } from 'react-redux';
import QuestionHeader from '../components/question-header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchMatch, removeCurrentMatch, timeout } from '../redux/actions/match';
import '../stylesheets/home.scss';
import { TIME_TO_ANSWER } from '../constants/match';
import { SlideFadeDelayed } from '../components/transitions';
import Progress from 'react-progress';

const mapStateToProps = (state) => {
  return {
    matchData: state.matchData.match,
    matchState: state.matchData.state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCurrentMatch: () => dispatch(removeCurrentMatch()),
    fetchMatch: matchName => dispatch(fetchMatch(matchName)),
    timeout: () => dispatch(timeout())
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class AnswerQuestion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onTimeout = this.onTimeout.bind(this);
  }

  onTimeout() {
    this.props.timeout();
  }

  render() {
    const totalQuestions = this.props.matchData.game.questions.length;
    const questionIndex = this.props.matchState.question;
    const question = this.props.matchData.game.questions[questionIndex];
    const answered = this.props.matchState.answer;

    return (
      <Grid>
        <Progress
          percent={ 100 * (questionIndex) / totalQuestions }
          color='#ff8d40'
        />
        <QuestionHeader
          seconds={ TIME_TO_ANSWER }
          onTimeout={ this.onTimeout }
          text={ question.text }
          stop={ answered }
          correct={ question.correctAnswer === answered }
        />
        <Row>
          <SlideFadeDelayed in={ answered === false  }>
            <Col xs={ 12 } mdOffset={ 3 } md={ 6 }>
              <AnswerButtons answers={ question.answers } correctAnswer={ question.correctAnswer }/>
            </Col>
          </SlideFadeDelayed>
        </Row>
      </Grid>
    )
  }
}

export default AnswerQuestion;
