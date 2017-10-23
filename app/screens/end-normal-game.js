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
import matchService from '../services/match';
import { removeMatch } from '../redux/actions/match';

const mapStateToProps = state => {
  return {
    matchData: state.matchData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeMatch: () => dispatch(removeMatch())
  }
}

class EndNormalGame extends React.PureComponent {
  constructor(props) {
    super(props);
    let leaderboard = this.props.matchData.match.game.ranking.slice(); //clean copy of ranking
    const user_position = this.findUserPlace(leaderboard);
    leaderboard.splice(user_position, 0, {
      user: this.props.matchData.state.player,
      points: this.props.matchData.state.score
    });
    this.state = {
      showModal: 'hide',
      leaderboard: leaderboard,
      userPosition: user_position
    };
    this.setModalSignIn = this.setModalSignIn.bind(this);
    this.setModalSignUp = this.setModalSignUp.bind(this);
    this.setModalHide = this.setModalHide.bind(this);
    this.renderLeaderBoard = this.renderLeaderBoard.bind(this);
    this.saveMatch = this.saveMatch.bind(this);
    this.renderHeaderLeaderBoard = this.renderHeaderLeaderBoard.bind(this);
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

  componentWillMount() {
    this.saveMatch();
  }

  componentWillUnmount() {
    // remove the_match from state
    this.props.removeMatch();
  }

  saveMatch() {
    const current_match = this.props.matchData.match;
    current_match.game.ranking = this.state.leaderboard;
    matchService.update(current_match)
  }

  findUserPlace(leaderboard) {
    //find which will be the position of the user in the leaderboard
    const lastIndex = size(leaderboard) - 1;
    let userPlace = 0;
    let i = 0;
    let encontre = false;
    while (!encontre && i <= lastIndex) {
      if (this.props.matchData.state.score >= leaderboard[i].points) {
        encontre = true;
      } else {
        i = i + 1;
      }
    }
    if (encontre) {
      userPlace = i;
    } else {
      //add user at the end of the leaderboard
      userPlace = lastIndex + 1;
    }
    return userPlace
  }

  addItemtoLeaderBoard(items, i) {
    items.push(
      (i === this.state.userPosition) ? (
      <tr className='current-player' key={ i }>
        <td>{ i + 1 }</td>
        <td>{ this.state.leaderboard[i].user }</td>
        <td>{ this.state.leaderboard[i].points }</td>
      </tr>
      ) : (
        <tr key={ i }>
          <td>{ i + 1 }</td>
          <td>{ this.state.leaderboard[i].user }</td>
          <td>{ this.state.leaderboard[i].points }</td>
        </tr>
      )
    )
  }

  renderLeaderBoard() {
    const lastIndex = size(this.state.leaderboard) - 1;
    let userPlace = this.state.userPosition;
    let items = [];
    let i;
    if (lastIndex <= 4) {
      //show until 5 users starting from 0
      for (i = 0; i <= lastIndex; i++) {
        this.addItemtoLeaderBoard(items, i);
      }
    } else {
      //if current user is in first place or second one
      if (userPlace === 0 || userPlace === 1) {
        //show 5 starting from 0
        for (i = 0; i <= 4; i++) {
          this.addItemtoLeaderBoard(items, i, true);
        }
      } else {
        //if current user is the last or previous than last
        if (userPlace === lastIndex || userPlace === lastIndex - 1) {
          //show 5 starting from lastIndex - 4
          for (i = lastIndex - 4; i <= lastIndex; i++) {
            this.addItemtoLeaderBoard(items, i, true);
          }
        } else {
          //current user is in the middle
          for (i = userPlace - 2; i <= userPlace + 2; i++) {
            this.addItemtoLeaderBoard(items, i, true);
          }
        }
      }
    }
    return (<tbody>{items}</tbody>);
  }

  renderHeaderLeaderBoard() {
    return (
      <thead>
        <tr>
          <th>Place</th>
          <th>Player</th>
          <th>Points</th>
        </tr>
      </thead>
    );
  }

  render() {
    const score = this.props.matchData.state.score;
    return (
      <div className='container'>
        <Jumbotron className='margin-jumbotron'>
          <h1>Your final score is { score }!</h1>
          <p>Would you like to save your score to compete with other players?</p>
          <p>
            <Button bsStyle='success' onClick={ () => this.setModalSignIn() }>
              Save
            </Button>
            <Link to={ '/' }>
              <Button bsStyle='link'>
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
          { this.renderHeaderLeaderBoard() }
          { this.renderLeaderBoard() }
        </Table>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndNormalGame)
