import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Col, Row, Table } from 'react-bootstrap';

class RealTimeMatch extends React.PureComponent {
  render() {
    return (
      <div>
        <div className='form-container'>
          <div className='form-input horizontal long'>
            <label className='fs-22'>quizzy.com/</label>
            <input className='fs-16' type='text'
             name='game' placeholder='Game name' />
            <Link to='/' className='play-link'>
              <button className='button primary medium'>SHARE!</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default RealTimeMatch;
