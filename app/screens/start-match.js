import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../stylesheets/start-match.scss';
import '../../node_modules/react-toggle-switch/dist/css/switch.min.css';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { sortBy } from 'underscore';

export default class StartMatch extends React.PureComponent {
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
    /*
      TODO
      Preguntar al backend si this.state.nickname existe o no en el sistema.
      En caso en que no exista, hacer el Redirect; en caso contrario,
      indicar al usuario que ese nickname ya existe y mantenerlo en la
      misma pantalla.
    */
    /* return (<Redirect to='/pantalla_del_match'/>); */
  }

  renderRanking() {
    const ranking = sortBy(this.props.match.game.ranking, 'points').reverse();
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
        <Row>
          <Col xs={4}>
            <img src={ this.props.match.game.image === null ? empty : this.props.match.game.image } height='100' id='previewImage'/>
          </Col>
          <Col xs={8} >
            <Row>
              <h1>{ this.props.match.game.name }</h1>
            </Row>
            <Row>
              Mode: Normal
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={4}>
            <p>Best players</p>
            <Table striped bordered condensed hover>
              { this.renderRanking() }
            </Table>
          </Col>
          <Col xs={12} lg={8}>
            <p className='game-description'>{ this.props.match.game.description }</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            Enter your nickname: <input type='text' onChange={ this.handleChange }/>
          </Col>
          <Col xs={4}/>
          <Col xs={2}>
            <Button onClick={ this.handleClick }>START</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

StartMatch.propTypes = {
  match: PropTypes.object,
}