import React, { PropTypes }  from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'react-bootstrap';

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
          <div className='form-input horizontal long'>
            <label className='fs-22'>quizzy.com/</label>
            <input className='fs-16' type='text'
             name='game' placeholder='Game name'/>
            <Link to='/' className='play-link'>
              <button className='button primary medium'>SHARE!</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

RealTimeMatch.propTypes = {
  totalPlayers: PropTypes.number,
  setTotalPlayers: PropTypes.func
}

export default RealTimeMatch;
