import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import '../stylesheets/timer.scss';
import Countdown from 'react-countdown-now';
import { full, normal, timeout } from '../stylesheets/timer.scss';

export const FULL_LOWER_BOUND = 75;
export const NORMAL_LOWER_BOUND = 25;

class Timer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  percentageColor(percentage) {
    if (percentage > FULL_LOWER_BOUND) {
      return full;
    } else if (percertage > NORMAL_LOWER_BOUND) {
      return normal;
    } else {
      return timeout;
    }
  }
  renderer(total, days, hours, minutes, seconds, milliseconds, completed ) {
    const percentage = milliseconds/total *100;
    const colorClass = this.percentageColor(percentage);

    return (<CircularProgressbar
        className={ colorClass }
        percentage={ percentage }
        textForPercentage={ (pct) => `${ minutes }:${ seconds }` }
      />);
  }

  render() {
    console.log(normal);
    return  (
      <Countdown
        renderer={ this.renderer }
        date={ Date.now() + this.props.seconds * 1000 }
      />
    )
  }
}

Timer.PropTypes = {
  total: PropTypes.number,
  remaining: PropTypes.number
};
export default Timer;