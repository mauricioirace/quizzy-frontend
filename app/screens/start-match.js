import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Header from '../components/header';
import { Route, Link, Redirect } from 'react-router';
import { setPlayer, fetchMatch } from '../redux/actions/match';
import { connect } from 'react-redux';
import { setCurrentMatch } from '../redux/actions/match';
import Switch from 'react-toggle-switch';
import '../stylesheets/start-match.scss';
import '../stylesheets/create-match.scss';
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
import Spinner from '../components/spinner';
import '../stylesheets/react-spinner.scss';

class StartMatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      nickname: '',
      nicknameError : null,
    };
  }

  componentWillMount() {
    this.props.fetchMatch(this.props.match.params.url);
  }

  handleChange(event) {
    if (event.target.value !== ''){
      document.getElementById('error').innerHTML = '';
    }
    this.setState({
      nickname: event.target.value
    });
  }

  handleKeyPress(target) {
    if(target.charCode == 13) {
      target.preventDefault();
      this.handleClick();
    }
  }

  handleClick(event) {
    if (!this.state.nickname) {
      let error = document.getElementById('error');
      error.innerHTML = 'Please, enter a nickname';
      error.style.color = 'red';
      error.style.fontWeight = 'bold';
      return;
    } else {
      const match = this.props.matchData.match;
      this.props.setPlayer(this.state.nickname);
      this.props.setCurrentMatch(match);
      if (!match.isRealTime) {
        this.props.history.push('/answer-question')
      } else {
        this.props.history.push(`/lobby`)
      }
    }
  }

  renderRanking() {
    const ranking = this.props.matchData.match.game.ranking;
    if (ranking.length > 0) {
      const items = [];
      let index = 0;
      const stop = ranking.length < 5 ? ranking.length : 5;
      while (index < stop) {
        items.push(
          <tr key={index}>
            <td>{ index + 1 }</td>
            <td>{ ranking[index].user }</td>
            <td>{ ranking[index].points } pts</td>
          </tr>
        );
        index = index + 1;
      }
      return (
        <Reveal effect='animated slideInRight'>
          <h3>Best players</h3>
          <table className='table'>
            <tbody>{ items }</tbody>
          </table>
        </Reveal>
      );
    } else {
      return(
        <Reveal effect='animated slideInRight'>
          <h2 id='first-player'>Be the first to play!</h2>
        </Reveal>
      )
    }
  }

  getValidationState() {
    return (this.state.nicknameError ?  'error' : null)
  }

  copyURL() {
    const urlInput = document.getElementById('matchURL');
    urlInput.focus();
    urlInput.select();
    document.execCommand('copy', null, null);
  }

  render() {
    let component = null;
    if (this.props.matchData.error) {
      component = <div>Could not get the match from the server :(</div>
    } else if (this.props.matchData.isFetching) {
      component =
      <div>
        <div className='loading-match'>
        </div>
        <div>
          <Spinner />
        </div>
      </div>
    } else if (this.props.matchData.match) {
      const match = this.props.matchData.match;
      component =
      <div className='page-match'>
        <div className='game-container'>
          <Reveal effect='animated slideInDown'>
            <div className='game-title'>
              { match.game.image ? <img src={ match.game.image } id='previewImage'/> : null }
              <h1 className='game-name'>{ match.game.name }</h1>
            </div>
            <h3>Mode: { match.isRealTime ? 'Real-Time' : 'Normal' }</h3>
            <div className='form-container'>
              <form>
                <div className='form-input horizontal long'>
                  <label className='fs-22'>Enter your nickname</label>
                  <input className='fs-16' type='text' placeholder='eg: Pepu' onKeyPress={ this.handleKeyPress } onChange={ this.handleChange }/>
                  <Button className='button primary medium' onClick={ this.handleClick }>PLAY!</Button>
                </div>
                <p id='error'></p>
              </form>
              <form>
               <div className='form-input horizontal long'>
                 <label className='fs-22'>Share it</label>
                 <input className='fs-16' id='matchURL' type='url' readOnly value={ window.location.href }/>
                 <Button className='share' onClick={ this.copyURL }>Copy</Button>
               </div>
             </form>
            </div>
          </Reveal>
          <div className='description-container'>
            <Reveal effect='animated slideInLeft'>
              <h2 className='game-description'>Game description</h2>
              <h4>{ match.game.description }</h4>
            </Reveal>
          </div>
          { this.renderRanking() }
        </div>
      </div>
    }
    return component;
  }
}

StartMatch.propTypes = {
  matchData: PropTypes.object,
  setPlayer: PropTypes.func,
  history: ReactRouterPropTypes.history,
  location: ReactRouterPropTypes.location,
  match: ReactRouterPropTypes.match,
  fetchMatch: PropTypes.func,
  setCurrentMatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    matchData: state.matchData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPlayer: (nickname) => dispatch(setPlayer(nickname)),
    fetchMatch: (match) => dispatch(fetchMatch(match)),
    setCurrentMatch: (currentMatch) => dispatch(setCurrentMatch(currentMatch)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StartMatch));
