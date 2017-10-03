import React, { PropTypes } from 'react';
import Header from '../components/header';
import { Route, Link, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Switch from 'react-toggle-switch';
import '../stylesheets/start-match.scss';
import { Link } from 'react-router';
import {
  Button,
  Col,
  Row,
  Table,
  Grid,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { sortBy } from 'underscore';
import userService from '../services/user';
import { withRouter } from 'react-router-dom';

class StartMatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      nickname: '',
      nicknameError : null,
    };
  }

  handleChange(event) {
    if (event.target.value !== ''){
      document.getElementById('error').innerHTML = '';
    }
    this.setState({
      nickname: event.target.value
    });
  }

  handleClick(event) {
    if (!this.state.nickname) {
      let error = document.getElementById('error');
      error.innerHTML = 'Please, enter a nickname';
      error.style.color = 'red';
      error.style.fontWeight = 'bold';
      // this.state.setState({ ..this.state, nicknameError = 'EMPTY'});
      return;
    }
    userService.findByName(this.state.nickname).then((res) => {
      if (res.data.res) {
        this.nicknameError = 'EXISTS';
        let error = document.getElementById('error');
        error.innerHTML = 'That nickname already exists';
        error.style.color = 'red';
        error.style.fontWeight = 'bold';
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

  getValidationState() {
    return (this.state.nicknameError ?  'error' : null)
  }

  render() {
    return (
      <div className="main-view">
        <Grid fluid>
          <Row>
            <Col xs={1} md={1} lg={1}>
              <img src={ this.props.currentMatch.game.image === null ? empty : this.props.currentMatch.game.image } height='100' id='previewImage'/>
            </Col>
            <Col xs={9} md={9} lg={9}>
              <Row>
                <h1 id="game-name">{ this.props.currentMatch.game.name }</h1>
              </Row>
              <Row>
                <h4>Mode: Normal</h4>
              </Row>
            </Col>
            <Col xs={1} md={1} lg={1}></Col>
          </Row>
          <Row>
            <Col xs={12} md={4} lg={4}>
              <h3>Best players</h3>
              <Table striped bordered condensed hover>
                { this.renderRanking() }
              </Table>
            </Col>
            <Col xs={12} md={7} lg={7}>
              <Row><h3 className='game-description'>Game description</h3></Row>
              <Row><p className='game-description'>{ this.props.currentMatch.game.description }</p></Row>
            </Col>
          </Row>
          <Row>
              <Row>
              <Col xs={4} md={3}>
                <FormGroup controlId="nickname-input" className="input-box"  bsSize="large" >
                <ControlLabel> Enter your nickname </ControlLabel>
                <FormControl type="text" placeholder="eg: Pepu" onChange={ this.handleChange } />
                <FormControl.Feedback />
                </FormGroup>
              </Col>
              <Col xs={3} md={3}>
                <Button id="done" bsStyle='primary' bsSize="large" onClick={ this.handleClick }>PLAY!</Button>
              </Col>
              </Row>
              <Row>
              <p id='error'>
                </p>
              </Row>
            <Col xs={4}></Col>
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
