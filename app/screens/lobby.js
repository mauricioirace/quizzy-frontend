import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Header from '../components/header';
import { Col, Row, PageHeader } from 'react-bootstrap';
import { Route, Link, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../stylesheets/lobby.scss';
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

  componentWillUnmount() {
    this.props.close();
  }

  renderUsers = () => {
    return this.props.players.map(u => <li key={ Math.random() }>{ u }</li>);
  }

  render() {
    return (
      <Row>
        <Col xs={ 12 } smOffset={ 4 } sm={ 6 }>
          <div className='Container' id='client'>
            <PageHeader className='text-center'>Lobby { this.props.matchData.match.url }</PageHeader>
            <h4>Waiting for players...</h4>
            <h3>In this room: { this.props.players.length }</h3>
            <h3>{ this.renderUsers() }</h3>
          </div>
        </Col>
      </Row>
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
