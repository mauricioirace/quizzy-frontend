import React, { PropTypes } from 'react';
import Header from '../components/header';
import { Col, Row, PageHeader } from 'react-bootstrap';
import { Route, Link, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../stylesheets/ws-client.scss';

const mapStateToProps = (state) => {
  return {
    matchData: state.matchData
  };
};

class WsClient extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  componentWillMount() {
    this.ws = new WebSocket('ws://localhost:3000/realusers');
    console.log('Websocket initialized');
    this.ws.onmessage = e => {
      if (e.data === 'hola') {
        this.ws.send(this.props.matchData.state.player);
      } else {
        this.setState({
          users: JSON.parse(e.data)
        });
      }
    }
  }

  componentWillUnmount() {
    this.ws.close();
  }

  _buildList = () => {
    return this.state.users.map(u => <li>{u}</li>);
  }

  render() {
    return (
      <Row>
        <Col xs={ 12 } smOffset={ 3 } sm={ 6 }>
          <div class='Container' id='client'>
            <PageHeader className='text-center'>Waiting for users...</PageHeader>
            <h3>Actualmente en este room: {this.state.users.length}</h3>
            <h2>{this._buildList()}</h2>
          </div>
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps)(withRouter(WsClient));