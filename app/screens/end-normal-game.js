import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Jumbotron, ListGroup, ListGroupItem, Table, FormGroup, Col,
        FormControl, Checkbox, Form, ControlLabel, Modal } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../stylesheets/end-normal-game.scss';
import { findIndex } from 'underscore';
import matchService from '../services/match';
import { Icon } from 'react-fa';

const mapStateToProps = state => {
  return {
    matchData: state.matchData
  }
}

class EndNormalGame extends React.PureComponent {

  constructor(props) {
    super(props);
    this.renderRanking = this.renderRanking.bind(this);
    this.renderHeaderRanking = this.renderHeaderRanking.bind(this);
    this.isUser = this.isUser.bind(this);
    this.userPosition = -1;
    this.id = this.props.match.params.id;
    this.player = this.props.match.params.player;
    this.score = this.props.match.params.score;
    this.state = {
      ranking: [],
      showWhole: false,
    };
    this.openWhole = this.openWhole.bind(this);
    this.closeWhole = this.closeWhole.bind(this);

  }

  componentWillMount() {
    this.getRanking();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getRanking = () => {
    matchService.getRanking(this.id)
    .then((res) => {
      this.setState({ ranking: res.data })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  isUser(item) {
    return (this.score == item.points && this.player == item.user)
  }

  addItemtoRanking(items, i) {
    items.push(
      (i === this.userPosition) ? (
      <tr className='current-player' key={ i }>
        <td>{ i + 1 }</td>
        <td>{ this.state.ranking[i].user }</td>
        <td>{ this.state.ranking[i].points }</td>
      </tr>
      ) : (
        <tr key={ i }>
          <td>{ i + 1 }</td>
          <td>{ this.state.ranking[i].user }</td>
          <td>{ this.state.ranking[i].points }</td>
        </tr>
      )
    )
  }

  renderRanking(limit) {
    let items = [];
    const lastIndex = this.state.ranking.length - 1;
    if (lastIndex >= 0) {
      let userPosition = this.state.ranking.findIndex(this.isUser);
      if (userPosition === -1) {
        userPosition = this.state.ranking.length;
      }
      this.userPosition = userPosition;
      let first;
      let until;
      if (limit === -1) {
        first = 0;
        until = lastIndex;
      }else{
        if (lastIndex <= 4) {
          //show until 5 users starting from 0
          first = 0;
          until = lastIndex;
        } else {
          //if current user is in first place or second one
          if (this.userPosition === 0 || this.userPosition === 1) {
            //show 5 starting from 0
            first = 0;
            until = 4;
          } else {
            //if current user is the last or previous than last
            if (this.userPosition === lastIndex || this.userPosition === lastIndex - 1) {
              //show 5 starting from lastIndex - 4
              first = lastIndex - 4;
              until = lastIndex;
            } else {
              //current user is in the middle
              first = this.userPosition - 2;
              until = this.userPosition + 2;
            }
          }
        }
      }
      let i;
      for (i = first; i <= until; i++) {
        this.addItemtoRanking(items, i);
      }
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

  closeWhole() {
    this.setState({ ...this.state, showWhole: false });
  }

  openWhole() {
    this.setState({ ...this.state, showWhole: true });
  }

  render() {
    return (
      <div className='container'>
        <Jumbotron className='margin-jumbotron'>
          <h1>Your final score is { this.score }!</h1>
        </Jumbotron>
        <h2>Leaderboard</h2>
        <button onClick = { this.openWhole } style={ {'float':'right' } } > <i id='expand' className='fa fa-window-maximize' aria-hidden='true'></i> </button>
        <Table responsive>
          { this.renderHeaderRanking() }
          { this.renderRanking(4) }
        </Table>
          <Modal show = { this.state.showWhole } onHide = { this.closeWhole }>
            <Modal.Header closeButton>
              <Modal.Title>Leaderboard</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table responsive>
                { this.renderHeaderRanking() }
                { this.renderRanking(-1) }
              </Table>
            </Modal.Body>
          </Modal>

      </div>


    )
  }
}

EndNormalGame.propTypes = {
  matchData: PropTypes.object,
}

export default connect(mapStateToProps)(withRouter(EndNormalGame))
