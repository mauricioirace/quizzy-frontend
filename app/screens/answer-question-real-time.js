import React from 'react';
import AnswerButtons from '../components/answer-buttons';
import { Col, Grid, Row } from 'react-bootstrap';
import '../stylesheets/answer-question.scss';
import { connect } from 'react-redux';
import QuestionHeader from '../components/question-header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  timeout,
  clearMatchState,
  receiveMessageAnswerQuestion, connectRealTimeMatch,
} from '../redux/actions/match';
import { open, close } from '../redux/actions/ws';
import '../stylesheets/home.scss';
import { TIME_TO_ANSWER, PROGRESS_HEIGHT, PROGRESS_COLOR, WAITING_STATE } from '../constants/match';
import { SlideFadeDelayed } from '../components/transitions';
import Progress from 'react-progress';
import { withRouter } from 'react-router-dom';
import Spinner from '../components/spinner';

const mapStateToProps = (state) => {
  return {
    matchData: state.matchData.match,
    matchState: state.matchData.state,
    status: state.matchData.state.status
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    open: (endpoint) => dispatch(open(endpoint,(message) => dispatch(receiveMessageAnswerQuestion(message)), (ws) => dispatch(connectRealTimeMatch(ws)))),
    close: () => dispatch(close()),
    timeout: () => dispatch(timeout()),
    clearMatchState: () => dispatch(clearMatchState())
  };
};

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
class AnswerQuestion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onTimeout = this.onTimeout.bind(this);
  }

  componentWillMount() {
    const HOST = process.env.API_HOST;
    const PORT = process.env.API_PORT;
    this.props.clearMatchState();
    this.props.open(`ws://${HOST}:${PORT}/answer-question/real-time`);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentWillUnmount() {
    this.props.close();
  }

  onTimeout() {
    this.props.timeout();
  }

  render() {
    if (!this.props.matchData) {
      this.props.history.push('/');
      return <Spinner/>;
    }
    if (!this.props.status === WAITING_STATE) {
      return <Spinner/>;
    }

    const totalQuestions = this.props.matchData.game.questions.length;
    const questionIndex = this.props.matchState.question;
    const question = this.props.matchData.game.questions[questionIndex];
    const answered = this.props.matchState.answer;

    return (
      <Grid>
        <Progress
          percent={ 100 * (questionIndex) / totalQuestions }
          color={ PROGRESS_COLOR }
          height={ PROGRESS_HEIGHT }
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
            <Col xs={ 12 } smOffset={ 3 } sm={ 6 }>
              <AnswerButtons answers={ question.answers } correctAnswer={ question.correctAnswer }/>
            </Col>
          </SlideFadeDelayed>
        </Row>
      </Grid>
    )
  }
}

export default AnswerQuestion;
