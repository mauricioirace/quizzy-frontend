import React, { PropTypes } from 'react';
import Header from '../components/header';
import { Route, Link, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Switch from 'react-toggle-switch';
import '../stylesheets/start-match.scss';
import '../../node_modules/react-toggle-switch/dist/css/switch.min.css';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { sortBy } from 'underscore';
import userService from '../services/user';
import { withRouter } from 'react-router-dom';

class StartMatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      nickname: ''
    };
  }

  handleChange(event) {
    this.setState({
      nickname: event.target.value
    });
  }

  handleClick(event) {
    if (!this.state.nickname) {
      let error = document.getElementById('error');
      error.innerHTML = 'Please, enter a nickname';
      error.style.color = 'red';
      return;
    }
    userService.findByName(this.state.nickname).then((res) => {
      if (res.data.res) {
        let error = document.getElementById('error');
        error.innerHTML = 'That nickname already exists';
        error.style.color = 'red';
      }
      else {
        this.props.history.push('/answer-question')
      }
    })
    .catch((err) => {
      console.log(err);
      console.log('El servidor no responde');
    });
  }

  renderRanking() {
    const ranking = sortBy(this.props.currentMatch.game.ranking, 'points').reverse();
    const items = [];
    ranking.forEach( (entry, index) => {
      items.push(
        <tr>
          <td>{ index + 1 }</td>
          <td>{ entry.nickname }</td>
          <td>{ entry.points } pts</td>
        </tr>
      );
    });
    return (<tbody>{ items }</tbody>);
  }

  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={1} md={1} lg={1}>
              <img src={ this.props.currentMatch.game.image === null ? empty : this.props.currentMatch.game.image } height='100' id='previewImage'/>
            </Col>
            <Col xs={9} md={9} lg={9}>
              <Row>
                <h1>{ this.props.currentMatch.game.name }</h1>
              </Row>
              <Row>
                Mode: Normal
              </Row>
            </Col>
            <Col xs={1} md={1} lg={1}></Col>
          </Row>
          <Row>
            <Col xs={12} md={4} lg={4}>
              <p>Best players</p>
              <Table striped bordered condensed hover>
                { this.renderRanking() }
              </Table>
            </Col>
            <Col xs={12} md={7} lg={7}>
              <Row><p className='game-description'>Game description</p></Row>
              <Row><p className='game-description'>{ this.props.currentMatch.game.description }</p></Row>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Row>Enter your nickname: <input type='text' onChange={ this.handleChange }/></Row>
              <Row>
                <p id='error'>
                </p>
              </Row>
            </Col>
            <Col xs={4}></Col>
            <Col xs={1}>
              <Button onClick={ this.handleClick }>START</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

StartMatch.propTypes = {
  currentMatch: PropTypes.object,
}

export default withRouter(StartMatch);
