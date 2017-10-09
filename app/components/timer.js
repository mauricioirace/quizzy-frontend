import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import '../stylesheets/timer.scss';
import Countdown from 'react-countdown-now';
import '../stylesheets/timer.scss';

export const FULL_LOWER_BOUND = 75;
export const NORMAL_LOWER_BOUND = 25;

class Timer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderer = this.renderer.bind(this);
  }

  percentageColor(percentage) {
    if (percentage > FULL_LOWER_BOUND) {
      return 'full';
    } else if (percentage > NORMAL_LOWER_BOUND) {
      return 'normal';
    } else {
      return 'timeout';
    }
  }
  renderer({ total, days, hours, minutes, seconds, milliseconds, completed } ) {
    const percentage = total/this.props.seconds /10 ;
    // const colorClass = 'normal';
    console.log(percentage);
    return (
      <CircularProgressbar
        percentage={ percentage }
        textForPercentage={ (pct) => `${ total/1000 }` }
      />);
  }

  render() {
    return  (
      <Countdown
        renderer={ this.renderer }
        date={ Date.now() + this.props.seconds * 1000 }
        onComplete={ this.props.onTimeout }
      />
    )
  }
}

Timer.PropTypes = {
  total: PropTypes.number,
  remaining: PropTypes.number,
  onTimeout: PropTypes.func
};
export default Timer;