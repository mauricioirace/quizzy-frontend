import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Jumbotron, ListGroup, ListGroupItem, Table, FormGroup, Col,
        FormControl, Checkbox, Form, ControlLabel } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../stylesheets/end-normal-game.scss';
import { findIndex } from 'underscore';
import matchService from '../services/match';

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
    this.showTitle = this.showTitle.bind(this);
    this.userPosition = -1;
    this.id = this.props.match.params.id;
    this.player = this.props.match.params.player;
    this.score = this.props.match.params.score;
    this.state = {
      ranking: [],
      isRealTime: false
    };
  }

  componentWillMount() {
    this.getRanking();
    this.getIsRealTime();
  }

  componentWillUnMount() {
  	this.userPosition = -1;		
  }

  getRanking = () => {
    matchService.getRanking(this.id)
    .then((res) => {
      this.setState({ ranking: res.data })
    })
    .catch((err) => {
      console.log(err);
    });
  };

  getIsRealTime = () => {
    matchService.getIsRealTime(this.id)
    .then((res) => {
      this.setState({ isRealTime: res.data })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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

  renderRanking() {
    let items = [];
    const lastIndex = this.state.ranking.length - 1;
    if (lastIndex >= 0) {
      let first;
      let until;
      this.userPosition = this.state.ranking.findIndex(this.isUser);
      if (this.state.isRealTime) {
        //in real time show complete ranking
        first = 0; 
        until = lastIndex;
      } else {
        if (lastIndex <= 4) {
          //show until 5 users starting from 0
          first = 0;
          until = lastIndex;
        } else {
          //if current user is in first place or second one
          if (this.userPosition <= 0 || this.userPosition === 1) {
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

  showTitle() {
	return (
	  (this.score < 0) ? (
	    <h1>Watch the end of the game!</h1>
	  ) : (
	    <h1>Your final score is { this.score }!</h1>
	  )
	)    		
  }

  render() {
    return (
      <div className='container'>
        <Jumbotron className='margin-jumbotron'>
          { this.showTitle() }
        </Jumbotron>
        <h2>Leaderboard</h2>
        <Table responsive>
          { this.renderHeaderRanking() }
          { this.renderRanking() }
        </Table>
      </div>
    )
  }
}

EndNormalGame.propTypes = {
  matchData: PropTypes.object,
}

export default connect(mapStateToProps)(withRouter(EndNormalGame))
