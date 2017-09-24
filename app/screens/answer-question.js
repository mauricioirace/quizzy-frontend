import React from 'react';
import AnswerButtons from '../components/answer-buttons';
import { Grid, Jumbotron, Row, Col } from 'react-bootstrap';
import { Line } from 'rc-progress';
import style from '../stylesheets/answer-question.scss';

class AnswerQuestion extends React.PureComponent {
  render() {
    return (
      <div>
        <Jumbotron>
          <Grid>
            <Row>
              <Col>
                <h1 className="text-center"> What is love? </h1>
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
        </Grid>
      </div>
    )
  }
}

export default AnswerQuestion;