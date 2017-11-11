import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Header from '../components/header';
import { Col, Row, PageHeader } from 'react-bootstrap';
import { Route, Link, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../stylesheets/lobby.scss';
import '../stylesheets/create-match.scss';
import '../stylesheets/start-match.scss';
import { receiveMessageRealTime } from '../redux/actions/match';
import { open, close } from '../redux/actions/ws';

const mapStateToProps = (state) => {
  return {
    matchData: state.matchData,
    player: state.matchData.state.player,
    players: state.matchData.state.players
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    open: (endpoint) => dispatch(open(endpoint, (message) => dispatch(receiveMessageRealTime(message)))),
    close: () => dispatch(close()),
    redirectOff: () => dispatch(redirectOff())
  };
};

class Lobby extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const HOST = process.env.API_HOST;
    const PORT = process.env.API_PORT;
    this.props.open(`ws://${HOST}:${PORT}/realusers`);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.props.close();
  }

  renderUsers = () => {
    const items = [];
    this.props.players.map((player, index) => {
      items.push(
        <tr key={index}>
          <td>{ index + 1 }</td>
          <td>{ player }</td>
        </tr>
      );
    });
    return (
      <table className='table'>
        <tbody>{ items }</tbody>
      </table>
    )
  }

  render() {
    let match = this.props.matchData.match;
    if (this.props.matchData.redirect) {
      this.props.redirectOff();
      this.props.history.push('/answer-question');
    };
    return (
        <div className='page-match'>
          <div className='Container' id='client'>
            <PageHeader className='text-center'>Lobby { match.url }</PageHeader>
            <div className='game-title'>
              { match.game.image ? <img src={ match.game.image } className='previewImage'/> : null }
              <h1 className='game-name'>{ match.game.name }</h1>
            </div>
            <h4>Waiting for players...</h4>
            <h3>In this room: { this.props.players.length }</h3>
            <h3>{ this.renderUsers() }</h3>
          </div>
        </div>
    )
  }
}

Lobby.propTypes = {
  history: ReactRouterPropTypes.history,
  location: ReactRouterPropTypes.location,
  match: ReactRouterPropTypes.match,
  matchData: PropTypes.object,
  player: PropTypes.string,
  players: PropTypes.array,
  open: PropTypes.func,
  close: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Lobby));
