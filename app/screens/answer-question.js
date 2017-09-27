import React from 'react';
import AnswerButtons from '../components/answer-buttons';
import { Col, Grid, Jumbotron, Row, Well } from 'react-bootstrap';
import { Line } from 'rc-progress';
import '../stylesheets/answer-question.scss';
import { connect } from 'react-redux';

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
      <div>
        <Jumbotron>
          <Grid>
            <Row>
              <Col>
                <h1 className="text-center question"> What is love? </h1>
                <Line percent='35' strokeWidth='1' strokeColor='#ff8d40' />
              </Col>
            </Row>
          </Grid>
        </Jumbotron>
        <Grid fluid>
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
        <Jumbotron>
          <h3 className='text-center'> 1/2 </h3>
        </Jumbotron>


      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(AnswerQuestion);