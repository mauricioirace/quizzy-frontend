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
    const correctness = this.props.correct ? 'RIGHT!' : 'WRONG!';
    const correctnessColor = this.props.correct ? 'text-correct': 'text-wrong';

    return {
      correctness,
      correctnessColor
    }
  }

  renderCorrectnes(total) {
    const { correctness, correctnessColor } = this.getCorrectness();
    const notAnswered = typeof this.props.stop === 'boolean';

    if (notAnswered) {
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
    const notAnswered = typeof this.props.stop === 'boolean';

    return (
      <div>
        <Row>
          <SlideFadeRight in={ this.props.stop === false }>
            <Col sm={ 4 } xsHidden>
              <CircularProgressbar
                percentage={ percentage }
                textForPercentage={ (pct) => `${ notAnswered ? total / 1000 : correctness }` }
                className={ notAnswered ? null : correctnessColor }
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
    if (this.props.stop === false) {
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
  onTimeout: PropTypes.func,
  correct: PropTypes.bool,
  stop: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]),
  seconds: PropTypes.number,
  text: PropTypes.string,
}
export default QuestionHeader;
