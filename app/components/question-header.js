import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import '../stylesheets/timer.scss';
import { Col, PageHeader, Row } from 'react-bootstrap';
import { SlideFadeDelayed, SlideFadeRight } from './transitions';
import LinearBar from '../components/linear-bar';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';

class QuestionHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderer = this.renderer.bind(this);
  }

  getCorrectness() {
    const correctness = this.props.correct ? 'YOU ARE\nRIGHT!' : 'WRONG!';
    const correctnessColor = this.props.correct ? 'text-correct': 'text-wrong';

    return {
      correctness,
      correctnessColor
    }
  }

  renderCorrectnes(total) {
    const { correctness, correctnessColor } = this.getCorrectness();

    if (!this.props.stop) {
      return (
        <h1 className='text-center'>
          <small className='quizzy-text'>
            { total / 1000 }
          </small>
        </h1>
      );
    }
    return (
      <h1 className='text-center'>
        <small className={ correctnessColor }>
          { correctness }
        </small>
      </h1>
     );
  }
  
  renderer({ total }) {
    const percentage = total / this.props.seconds / 10;
    const { correctness, correctnessColor } = this.getCorrectness();

    return (
      <div>
        <Row>
          <SlideFadeRight in={ this.props.stop === false}>
            <Col sm={ 4 } xsHidden>
              <CircularProgressbar
                percentage={ percentage }
                textForPercentage={ (pct) => `${ total  ? total / 1000 : correctness }` }
                className={ total ? null : correctnessColor }
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
            <LinearBar percentage={ percentage }/>
          </Col>
        </Row>
        <Row>
          <Col smHidden mdHidden lgHidden>
            { this.renderCorrectnes(total) }
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
