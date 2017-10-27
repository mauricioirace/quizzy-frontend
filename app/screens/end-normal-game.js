import React from 'react';
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
    matchData: state.matchData
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
    this.setModalSignIn = this.setModalSignIn.bind(this);
    this.setModalSignUp = this.setModalSignUp.bind(this);
    this.setModalHide = this.setModalHide.bind(this);
    this.renderRanking = this.renderRanking.bind(this);
    this.renderHeaderRanking = this.renderHeaderRanking.bind(this);
    this.greaterOrEqual = this.greaterOrEqual.bind(this);
    this.updateRanking = this.updateRanking.bind(this); 

    const ranking = this.updateRanking();
    let userPosition = findIndex(ranking,this.greaterOrEqual);
    if (userPosition === -1) {
      //add user at the end of the ranking
      userPosition = size(ranking);
    }

    this.ranking = ranking;
    this.userPosition = userPosition;
    this.state = {
      showModal: 'hide'
    };
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

  componentWillUnmount() {
    // remove the_match from state
    this.props.removeMatch();
  }

  updateRanking() {
    matchService.rankingInsert(this.props.matchData.match.id, this.props.matchData.state.player, this.props.matchData.state.score)
      .then((res) => {
        return res.data
      })
      .catch((err) => {

      });
  }

  greaterOrEqual(item) {
    return this.props.matchData.state.score >= item.points;
  }

  addItemtoRanking(items, i) {
    items.push(
      (i === this.userPosition) ? (
      <tr className='current-player' key={ i }>
        <td>{ i + 1 }</td>
        <td>{ this.ranking[i].user }</td>
        <td>{ this.ranking[i].points }</td>
      </tr>
      ) : (
        <tr key={ i }>
          <td>{ i + 1 }</td>
          <td>{ this.ranking[i].user }</td>
          <td>{ this.ranking[i].points }</td>
        </tr>
      )
    )
  }

  renderRanking() {
    const lastIndex = size(this.ranking) - 1;
    const userPosition = this.userPosition;
    let first;
    let until;
    if (lastIndex <= 4) {
      //show until 5 users starting from 0
      first = 0;
      until = lastIndex;
    } else {
      //if current user is in first place or second one
      if (userPosition === 0 || userPosition === 1) {
        //show 5 starting from 0
        first = 0;
        until = 4;
      } else {
        //if current user is the last or previous than last
        if (userPosition === lastIndex || userPosition === lastIndex - 1) {
          //show 5 starting from lastIndex - 4
          first = lastIndex - 4;
          until = lastIndex;
        } else {
          //current user is in the middle
          first = userPosition - 2;
          until = userPosition + 2;
        }
      }
    }
    let i;
    let items = [];
    for (i = first; i <= until; i++) {
      this.addItemtoRanking(items, i);
    }
    return (<tbody>{items}</tbody>);
  }

  renderHeaderRanking() {
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
          { this.renderHeaderRanking() }
          { this.renderRanking() }
        </Table>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndNormalGame)
