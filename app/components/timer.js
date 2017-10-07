import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import '../stylesheets/timer.scss';
import ReactCountdownClock from 'react-countdown-clock';
import { normal } from '../stylesheets/timer.scss';
class Timer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(normal);
    return  (
      <ReactCountdownClock
        seconds={ this.props.seconds }
        color={ normal.color }
      />
    )
  }
}

Timer.PropTypes = {
  total: PropTypes.number,
  remaining: PropTypes.number
};
export default Timer;