import React from 'react';
import AnswerButtons from '../components/answer-buttons';
import { Col, Grid, Jumbotron, PageHeader, Row } from 'react-bootstrap';
import '../stylesheets/answer-question.scss';
import { connect } from 'react-redux';
import Timer from '../components/timer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { removeCurrentMatch, fetchMatch} from '../redux/actions/match';
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
  };
};


class AnswerQuestion extends React.PureComponent {

  render() {
    const questionIndex = this.props.matchState.question;

    const question = this.props.matchData.game.questions[questionIndex];

    return (
      <div className='main-view'>
        <Grid fluid>
          <Row>
            <Col xs={ 4 } >
              <Timer seconds={ 69 }/>
            </Col>
            <Col xs={ 4 } >
              <PageHeader className='text-center'>{ question.text }</PageHeader>
            </Col>
          </Row>
        </Grid>
        <Grid fluid>
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
      </div>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuestion);
