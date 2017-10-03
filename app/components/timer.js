import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import '../stylesheets/timer.scss';

class Timer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  getPercentage() {
    return 100 * (this.props.remaining / this.props.total)
  }

  render() {
    return  (
      <CircularProgressbar
        percentage={ this.getPercentage() }
        textForPercentage={ () => this.props.remaining }
        strokeWidth='4'
      />
    )
  }
}

Timer.PropTypes = {
  total: PropTypes.number,
  remaining: PropTypes.number
};
export default Timer;