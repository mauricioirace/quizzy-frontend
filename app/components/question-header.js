import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import '../stylesheets/timer.scss';
import Countdown from 'react-countdown-now';
import { Col, PageHeader, Row } from 'react-bootstrap';
import { SlideFadeDelayed, SlideFadeLeft, SlideFadeRight, SlideFadeTop } from './transitions';

class QuestionHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderer = this.renderer.bind(this);
  }
  renderCorrectnes() {
    const correctness = this.props.correct ? 'YOU ARE\nRIGHT!' : 'WRONG!';
    const correctnesColor = this.props.correct ? 'text-correct text-center': 'text-wrong text-center';

    if (!this.props.stop) {
      return null;
    }
    return (
      <PageHeader className='text-center'>
        <small className={ correctnesColor }>
          { correctness }
        </small>
      </PageHeader>
    );
  }
  renderer({ total }) {
    const percentage = total/this.props.seconds /10 ;

    return (
      <div>
        <Row>
          <SlideFadeRight in={ this.props.stop === false}>
            <Col sm={ 4 } xsHidden>
                <CircularProgressbar
                  percentage={ percentage }
                  textForPercentage={ (pct) => `${ total  ? total / 1000 : '' }` }
                />
            </Col>
          </SlideFadeRight>
          <SlideFadeDelayed in={ this.props.stop === false }>
            <Col sm={ 4 } xs={ 12 }>
              <PageHeader className='text-center'>{ this.props.text }</PageHeader>
            </Col>
          </SlideFadeDelayed>
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
      </div>
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
      return this.renderer({ total: 0 });
    }
  }
}

QuestionHeader.PropTypes = {
  total: PropTypes.number,
  remaining: PropTypes.number,
  onTimeout: PropTypes.func
}
export default QuestionHeader;