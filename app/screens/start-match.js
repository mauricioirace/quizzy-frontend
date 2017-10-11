import React, { PropTypes } from 'react';
import Header from '../components/header';
import { Route, Link, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Switch from 'react-toggle-switch';
import '../stylesheets/start-match.scss';
import {
  Button,
  Col,
  Row,
  Table,
  Grid,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { sortBy } from 'underscore';
import userService from '../services/user';
import { withRouter } from 'react-router-dom';
import Reveal from 'react-reveal';

class StartMatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      nickname: '',
      nicknameError : null,
    };
    this.match = this.props.location.state.match;
  }

  handleChange(event) {
    if (event.target.value !== ''){
      document.getElementById('error').innerHTML = '';
    }
    this.setState({
      nickname: event.target.value
    });
  }

  handleClick(event) {
    if (!this.state.nickname) {
      let error = document.getElementById('error');
      error.innerHTML = 'Please, enter a nickname';
      error.style.color = 'red';
      error.style.fontWeight = 'bold';
      return;
    } else {
      this.props.history.push('/answer-question')
    }
  }

  renderRanking() {
    const ranking = sortBy(this.match.game.ranking, 'points').reverse();
    const items = [];
    ranking.forEach( (entry, index) => {
      items.push(
        <tr>
          <td>{ index + 1 }</td>
          <td>{ entry.nickname }</td>
          <td>{ entry.points } pts</td>
        </tr>
      );
    });
    return (<tbody>{ items }</tbody>);
  }

  getValidationState() {
    return (this.state.nicknameError ?  'error' : null)
  }

  render() {
    return (
      <div className='game-container'>
        <Reveal effect='animated slideInDown'>
          <div className='game-title'>
            <img src={ this.match.game.image } height='100' id='previewImage'/>
            <h1 id='game-name'>{ this.match.game.name }</h1>
          </div>
          <h4>Mode: { this.match.isRealTime ? 'Real-Time' : 'Normal' }</h4>
          <div className='form-container'>
            <form>
              <div className='form-input horizontal long'>
                <label>Enter your nickname</label>
                <input type='text' placeholder='eg: Pepu' onChange={ this.handleChange } />
                <Button className='button primary medium' onClick={ this.handleClick }>PLAY!</Button>
              </div>
            </form>
          </div>
        </Reveal>
        <p id='error'></p>
        <div className='description-container'>
          <Reveal effect='animated slideInLeft'>
            <h3 className='game-description'>Game description</h3>
            { this.match.game.description }
          </Reveal>
        </div>
        <Reveal effect='animated slideInRight'>
          <h3>Best players</h3>
          <table className='table'>
            { this.renderRanking() }
          </table>
        </Reveal>
      </div>
    )
  }
}

StartMatch.propTypes = {
  //matchesData: PropTypes.object,
  currentMatch: PropTypes.object
}

const mapStateToProps = state => {
  console.log('En el store:')
  console.log(state.matchData)
  return {
    //matches: state.matchesData.matches,
    currentMatch: state.matchData.match
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     setCurrentMatch: (match) => dispatch(setCurrentMatch(match)),
//   };
// }

export default connect(mapStateToProps)(withRouter(StartMatch));
