import React from 'react';
import AnswerButtons from '../components/answer-buttons';
import { Col, Grid, Jumbotron, PageHeader, Row } from 'react-bootstrap';
import '../stylesheets/answer-question.scss';
import { connect } from 'react-redux';
import Timer from '../components/timer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { removeCurrentMatch, fetchMatch} from '../redux/actions/match';

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

const SlideLeft = ({ children, ...props }) => (
  <CSSTransition
    name={{
      leave:'moveToLeft',
      leaveActive: 'react-transitions-top',
      enter: 'scaleUp',
      enterActive: ''
    }}
    appear={ false }
    enter
    leave
    enterTimeout={ 700 }
    leaveTimeout={ 600 }
    timeout={500}
    classNames='slide-left'
  >
    {children}
  </CSSTransition>
);

class AnswerQuestion extends React.PureComponent {

  componentWillMount() {
  }

  componentWillUnmount() {

  }

  render() {
    const questionIndex = this.props.matchState.question;
    // console.log('';
    console.log(this.props);
    const question = this.props.matchData.game.questions[questionIndex];

    return (
      <TransitionGroup>
        <SlideLeft>
          <Grid fluid>
            <Row>
              <Col xs={4}>
                <Timer total={60} remaining={37} />
              </Col>
              <Col xs={4} >
                <PageHeader className='text-center'> { question.text} </PageHeader>
              </Col>
            </Row>
          </Grid>
        </SlideLeft>
        <SlideLeft>
          <Grid fluid>
            <Row>
              <Col xs={12} mdOffset={3} md={6}>
                <AnswerButtons answers={ question.answers } correctAnswer={ question.correctAnswer }/>
              </Col>
            </Row>
            <Row>
              <Col xs={12} mdOffset={3} md={6}>
              </Col>
            </Row>
          </Grid>
      </SlideLeft>
    </TransitionGroup>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(AnswerQuestion);