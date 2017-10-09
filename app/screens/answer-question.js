import React from 'react';
import AnswerButtons from '../components/answer-buttons';
import { Col, Grid, PageHeader, Row } from 'react-bootstrap';
import '../stylesheets/answer-question.scss';
import { connect } from 'react-redux';
import Timer from '../components/timer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchMatch, removeCurrentMatch, timeout } from '../redux/actions/match';
import '../stylesheets/home.scss';

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
    const questionIndex = this.props.matchState.question;
    const question = this.props.matchData.game.questions[questionIndex];

    return (
        <Grid fluid>
          <Row>
            <Col xs={ 4 } >
              <Timer seconds={ 5 } onTimeout={ this.onTimeout }/>
            </Col>
            <Col xs={ 4 } >
              <PageHeader className='text-center'>{ question.text }</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={ 12 } mdOffset={ 3 } md={ 6 }>
              <AnswerButtons answers={ question.answers } correctAnswer={ question.correctAnswer }/>
            </Col>
          </Row>
          <Row>
            <Col xs={ 12 } mdOffset={ 3 } md={ 6 }>
            </Col>
          </Row>
        </Grid>
      )
  }
}

export default AnswerQuestion;
