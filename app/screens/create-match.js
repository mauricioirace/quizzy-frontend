import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, Col, Row, Grid } from 'react-bootstrap';
import { sortBy } from 'underscore';
import Switch from 'react-toggle-switch';
import '../../node_modules/react-toggle-switch/dist/css/switch.min.css';
import NormalMatch from '../components/normalMatch';
import RealTimeMatch from '../components/realTimeMatch';

export default class CreateMatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      nickname: '',
      switched: false
    };
  }

  toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };

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

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col lg={4}>
              <img src={ this.props.game.image === null ? empty : this.props.game.image } height='100' id='previewImage'/>
            </Col>
            <Col lg={8} >
              <Row>
                <h1>{ this.props.game.name }</h1>
              </Row>
              <Row>
                <Row>Mode: { this.state.switched ? 'Real-Time' : 'Normal' }</Row>
                <Row><Switch onClick={ this.toggleSwitch } on={ this.state.switched }/></Row>
              </Row>
            </Col>
          </Row>
          <Row>
            { !this.state.switched ? <NormalMatch/> : <RealTimeMatch/> }
          </Row>
          <Row>
            <Button onClick={ this.handleClick }>START</Button>
          </Row>
        </Grid>
      </div>
    )
  }
}

CreateMatch.propTypes = {
  game: PropTypes.object,
}
