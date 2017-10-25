import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'react-bootstrap';

class RealTimeMatch extends React.PureComponent {
  render() {
    const style = {
      color: 'black',
      paddingRight: '5px'
    };
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
          Choose the number of players (between 2 and 10):
          <input style={ style } type='number' value={ this.props.totalPlayers } min='2' max='10' onChange={ this.props.setTotalPlayers }/>
        </div>
      </div>
    )
  }
}

export default RealTimeMatch;
