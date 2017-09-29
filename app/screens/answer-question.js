import React from 'react';
import AnswerButtons from '../components/answer-buttons';
import { Col, Grid, Jumbotron, PageHeader, Row } from 'react-bootstrap';
import '../stylesheets/answer-question.scss';
import { connect } from 'react-redux';
import Timer from '../components/timer';

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const mapStateToProps = (state,props) => {
  return {
  };
};

class AnswerQuestion extends React.PureComponent {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xsOffset={1} xs={10} >
            <h1 className="text-center"> What is love? </h1>
          </Col>
        </Row>
        <Row>
            <Col xs={12} mdOffset={3} md={6}>
                <AnswerButtons/>
            </Col>
          </Row>
          <Row>
            <Col xs={12} mdOffset={3} md={6}>
            </Col>
          </Row>
        </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(AnswerQuestion);