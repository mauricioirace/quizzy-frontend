import React, { PropTypes } from 'react';
import Header from '../components/header';
import { Col, Row, PageHeader } from 'react-bootstrap';
import { Route, Link, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../stylesheets/lobby.scss';

const mapStateToProps = (state) => {
  return {
    matchData: state.matchData,
    player: state.matchData.state.player
  };
};

class Lobby extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  componentWillMount() {
    this.ws = new WebSocket('ws://localhost:3000/realusers');
    this.ws.onmessage = e => {
      const users = [];
      if (e.data === 'hola') {
        this.ws.send(JSON.stringify([this.props.matchData.currentMatch, this.props.player]));
      } else {
        const ms = JSON.parse(e.data);
        for (var i=0; i < ms.length; i++) {
          const each = JSON.parse(ms[i]);
          if (each[0] === this.props.matchData.currentMatch) {
            users.push(each[1]);
          }
        }
         this.setState({
          users: users
        });
      }
    }
  }

  componentWillUnmount() {
    this.ws.close();
  }

  _buildList = () => {
    return this.state.users.map(u => <li key={ Math.random() }>{ u }</li>);
  }

  render() {
    return (
      <Row>
        <Col xs={ 12 } smOffset={ 4 } sm={ 6 }>
          <div className='Container' id='client'>
            <PageHeader className='text-center'>Lobby { this.props.matchData.currentMatch }</PageHeader>
            <h4>Waiting for players...</h4>
            <h3>Actualmente en este room: { this.state.users.length }</h3>
            <h3>{ this._buildList() }</h3>
          </div>
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps)(withRouter(Lobby));