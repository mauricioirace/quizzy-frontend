import React from 'react';
import Header from '../components/header';
import LoginModal from '../components/login-modal';
import RegisterModal from '../components/register-modal';
import { Button, ButtonToolbar, Jumbotron, ListGroup, ListGroupItem, Table, Modal, FormGroup, Col,
        FormControl, Checkbox, Form, ControlLabel } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../stylesheets/end-normal-game.scss';
import { findIndex, isEqual, size, sortBy } from 'underscore';
import MatchService from '../services/match.js';

const mapStateToProps = state => {
  return {
    matchData: state.matchData,
  }
}

const mapDispatchToProps = dispatch => {}

class EndNormalGame extends React.PureComponent {
    
  constructor(props) {
    super(props);
    this.state = {
      showModal: 'hide'
    };
    this.setModalSignIn = this.setModalSignIn.bind(this);
    this.setModalSignUp = this.setModalSignUp.bind(this);
    this.setModalHide = this.setModalHide.bind(this);
    this.renderLeaderBoard = this.renderLeaderBoard.bind(this);
    this.saveMatch = this.saveMatch.bind(this);
  }

  setModalSignIn() {
    this.setState({ showModal: 'signIn' });
  }

  setModalSignUp() {
    this.setState({ showModal: 'signUp' });
  }

  setModalHide() {
    this.setState({ showModal: 'hide' });  
  }

  saveMatch() {
    matchService.update(this.props.matchData.match)
      .then((res) => {
        this.props.history.push('/');
      })
      .catch((err) => {
        alert(err.error);
      });
  }

  renderLeaderBoard() {
    const init_leaderboard = this.props.matchData.match.game.ranking.slice(); //clean copy of ranking
    init_leaderboard.push({
      user: this.props.matchData.state.player,
      points: this.props.matchData.state.score
    });
    const leaderboard = sortBy(init_leaderboard, 'points').reverse();
    const lastIndex = size(leaderboard) - 1;
    const items = [];

    let i = 0;
    let encontre = false;
    while (!encontre && i <= lastIndex) {
      if (this.props.matchData.state.player === leaderboard[i].user) {
          encontre = true;
      } else {
        i = i + 1;
      }
    }

    let userPlace = -1;
    if (encontre) {
      userPlace = i;
    } 

    //check if player was found
    if (userPlace > -1) {
      
      if (lastIndex <= 4) {

        //show until 5 users starting from 0  
        for (i = 0; i <= lastIndex; i++) {
          items.push(
            isEqual(leaderboard[i].user, this.props.matchData.state.player) ? ( 
            <tr className='current-player'>
              <td>{ i + 1 }</td>
              <td>{ leaderboard[i].user }</td>
              <td>{ leaderboard[i].points } pts</td>
            </tr>
            ) : (
              <tr>
                <td>{ i + 1 }</td>
                <td>{ leaderboard[i].user }</td>
                <td>{ leaderboard[i].points } pts</td>
              </tr>
            )
          )
        }
      } else {
        //if current user is in first place or second one
        if (userPlace === 0 || userPlace === 1) {
          //show 5 starting from 0
          for (i = 0; i <= 4; i++) {
            items.push(
              isEqual(leaderboard[i].user, this.props.matchData.state.player) ? ( 
                <tr className='current-player'>
                  <td>{ i + 1 }</td>
                  <td>{ leaderboard[i].user }</td>
                  <td>{ leaderboard[i].points } pts</td>
                </tr>
              ) : (
                <tr>
                  <td>{ i + 1 }</td>
                  <td>{ leaderboard[i].user }</td>
                  <td>{ leaderboard[i].points } pts</td>
                </tr>
              )
            )
          }
        } else {
          //if current user is the last or previous than last 
          if (userPlace === lastIndex || userPlace === lastIndex - 1) {
            
            //show 5 starting from lastIndex - 4
            leaderboard.forEach( (entry, i) => {
              if (i >= lastIndex - 4) {
                items.push(
                  isEqual(entry.user, this.props.matchData.state.player) ? ( 
                    <tr className='current-player'>
                      <td>{ i + 1 }</td>
                      <td>{ entry.user }</td>
                      <td>{ entry.points } pts</td>
                    </tr>
                  ) : (
                    <tr>
                      <td>{ i + 1 }</td>
                      <td>{ entry.user }</td>
                      <td>{ entry.points } pts</td>
                    </tr>
                  )
                )
              }
            });
          } else {
            //current user is in the middle
            leaderboard.forEach( (entry, i) => {
              if ((i >= userPlace - 2) && (i <= userPlace + 2)) {
                items.push(
                  isEqual(entry.user, this.props.matchData.state.player) ? ( 
                    <tr className='current-player'>
                      <td>{ i + 1 }</td>
                      <td>{ entry.user }</td>
                      <td>{ entry.points } pts</td>
                    </tr>
                  ) : (
                    <tr>
                      <td>{ i + 1 }</td>
                      <td>{ entry.user }</td>
                      <td>{ entry.points } pts</td>
                    </tr>
                  )
                )
              }
            });
          }
        }
      }
    }
    return (<tbody>{ items }</tbody>);
  }

  render() {
    const score = this.props.matchData.state.score;
    return (
      <div className='container'>
        <Jumbotron>
          <h1>Your final score is { score }!</h1>
          <p>Would you like to save your score to compete with other players?</p>
          <p>
            <Button bsStyle='success' onClick={ () => this.setModalSignIn() }>
              Save
            </Button>
            <Link to={ '/' }>
              <Button bsStyle='link' onClick={ () => this.saveMatch() }>
                Continue with your nickname
              </Button>
            </Link>  
          </p>
        </Jumbotron>

        <LoginModal
          show={ this.state.showModal }
          setSignUp={ this.setModalSignUp }
          setHide={ this.setModalHide } 
        />
      
        <RegisterModal 
          show={ this.state.showModal }
          setSignIn={ this.setModalSignIn }
          setHide={ this.setModalHide }
        />

        <h2>Leaderboard</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>Place</th>
              <th>Player</th>
              <th>Points</th>
            </tr>
          </thead>
          { this.renderLeaderBoard() }
        </Table>
        <p>
          Share your score!
        </p>
        <Button bsStyle='primary' bsSize='small'>f | Compartir</Button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndNormalGame)
