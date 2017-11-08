import React, { PropTypes }  from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'react-bootstrap';
import '../stylesheets/real-time-match.scss';

class RealTimeMatch extends React.PureComponent {
  handleChange = (event) => {
    const num = event.target.value;
    if (num < 2 || num > 10) {
      event.target.value = '';
      return;
    };
    this.props.setTotalPlayers(num);
  }

  render() {
    return (
      <div>
        <div className='form-container'>
          Choose the number of players (between 2 and 10):
          <input className='input-number-realtime' type='number' value={ this.props.totalPlayers } min='2' max='10' onChange={ this.handleChange }/>
        </div>
      </div>
    )
  }
}

RealTimeMatch.propTypes = {
  totalPlayers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number]),
  setTotalPlayers: PropTypes.func
}

export default RealTimeMatch;
