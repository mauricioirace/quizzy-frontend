import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import '../stylesheets/timer.scss';
import Countdown from 'react-countdown-now';
import { Col, Grid, PageHeader, Row } from 'react-bootstrap';

class QuestionHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderer = this.renderer.bind(this);
  }

  renderer({ total, days, hours, minutes, seconds, milliseconds, completed } ) {
    const percentage = total/this.props.seconds /10 ;
    return (
      <Grid fluid>
        <Row>
          <Col sm={ 4 } xsHidden>
            <CircularProgressbar
              percentage={ percentage }
              textForPercentage={ (pct) => `${ total  ? total / 1000 : 'TIMEOUT' }` }
            />
          </Col>
          <Col sm={ 4 } xs={ 12 }>
            <PageHeader className='text-center'>{ this.props.text }</PageHeader>
          </Col>
        </Row>
        <Row>
          <Col smHidden mdHidden lgHidden>
            <div className='linear'>
              <div className='linear-bar' style={{width: `${percentage}%`}}/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col smHidden mdHidden lgHidden>
            <h1 className='text-center'>
              <small className='quizzy-text'>
                { total / 1000 }
              </small>
            </h1>
          </Col>
        </Row>
      </Grid>
    );
  }

  render() {
    if (!this.props.stop) {
      return  (
        <Countdown
          renderer={ this.renderer }
          date={ Date.now() + this.props.seconds * 1000 }
          onComplete={ this.props.onTimeout }
        />
      )
    } else {
      return this.renderer({ total:0 });
    }
  }
}

QuestionHeader.PropTypes = {
  total: PropTypes.number,
  remaining: PropTypes.number,
  onTimeout: PropTypes.func
}
export default QuestionHeader;