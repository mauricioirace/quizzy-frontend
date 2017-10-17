import React, { PropTypes } from 'react';
import Header from '../components/header';
import { Route, Link, Redirect } from 'react-router';
import { updateMatch, setPlayer } from '../redux/actions/match';
import { connect } from 'react-redux';
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
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');

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
      // const match = this.props.currentMatch;
      this.props.setPlayer(this.state.nickname);
      // match.players.push(this.state.nickname);
      // this.props.updateMatch(match);
      this.props.history.push('/answer-question')
    }
  }

  renderRanking() {
    const ranking = sortBy(this.props.currentMatch.game.ranking, 'points').reverse();
    if(ranking.length != 0) {
      const items = [];
      ranking.forEach( (entry, index) => {
        items.push(
          <tr>
            <td>{ index + 1 }</td>
            <td>{ entry.user }</td>
            <td>{ entry.points } pts</td>
          </tr>
        );
      });
      return (
        <Reveal effect='animated slideInRight'>
          <h3>Best players</h3>
          <table className='table'>
            <tbody>{ items }</tbody>
          </table>
        </Reveal>
      );
    } else {
      return;
    }
  }

  ranking(match) {
    if (this.props.currentMatch.game.ranking.length > 0) {
      return (
        <Reveal effect='animated slideInRight'>
          <h3>Best players</h3>
          <table className='table'>
            { this.renderRanking() }
          </table>
        </Reveal>
      )
    } else {
      return (
        <p>Be the first to play!</p>
      )
    };
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
    const match = this.props.currentMatch;
    return (
      <div className='page-match'>
      <div className='game-container'>
        <Reveal effect='animated slideInDown'>
          <div className='game-title'>
            { match.game.image ? <img src={ match.game.image } id='previewImage'/> : false }
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
               <FacebookShareButton url={ match.url }><FacebookIcon size='37px'/></FacebookShareButton>
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
    )
  }
}

StartMatch.propTypes = {
  currentMatch: PropTypes.object
}

const mapStateToProps = state => {
  return {
    currentMatch: state.matchData.match
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMatch: (match) => dispatch(updateMatch(match)),
    setPlayer: (nickname) => dispatch(setPlayer(nickname))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StartMatch));
