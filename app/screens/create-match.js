import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, Col, Row, Grid } from 'react-bootstrap';
import { sortBy } from 'underscore';
import { createMatch } from '../redux/actions/match';
import Switch from 'react-toggle-switch';
import '../../node_modules/react-toggle-switch/dist/css/switch.min.css';
import NormalMatch from '../components/normalMatch';
import RealTimeMatch from '../components/realTimeMatch';
import { withRouter } from 'react-router-dom';
import empty from '../../assets/images/empty.svg';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    description: state.gameData.description,
    image: state.gameData.image,
    category: state.gameData.category,
    questions: state.gameData.questions,
    name: state.gameData.name,
    error: state.gameData.error,
    currentMatch: state.matchData.currentMatch
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMatch: (match, onSuccess) => dispatch(createMatch(match, onSuccess)),
  };
};

class CreateMatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
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
    const { name, description, image, category, questions } = this.props;
    // TODO
    // La url tiene que ser unica. De esta forma, esta quedando siempre con 'a_match'
    let url = this.props.currentMatch !== '' ? this.props.currentMatch : 'a_match';
    const match = {
      url,
      owner: 'Fulane of such',
      isRealTime: this.state.switched,
      players: ['Fulane of such'],
      game: {
        name,
        description,
        creator: 'Fulane of such',
        tags: [ category ],
        questions,
        image
      }
    };
    this.props.createMatch(match, this.onSuccess);
  }

  onSuccess(){
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col lg={4}>
              <img src={ this.props.image === null ? empty : this.props.image } height='100' id='previewImage'/>
            </Col>
            <Col lg={8} >
              <Row>
                <h1>{ this.props.name }</h1>
              </Row>
              <Row>
                <Row>Mode: { this.state.switched ? 'Real-Time' : 'Normal' }</Row>
                <Row><Switch onClick={ this.toggleSwitch } on={ this.state.switched }/></Row>
              </Row>
            </Col>
          </Row>
          <Row>
            <h2> CREATE A NEW MATCH FOR THIS GAME </h2>
          </Row>
          <Row>
            { !this.state.switched ? <NormalMatch/> : <RealTimeMatch/> }
          </Row>
          <Row>
            <Button onClick={ this.handleClick }>DONE</Button>
          </Row>
        </Grid>
      </div>
    )
  }
}

CreateMatch.propTypes = {

}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CreateMatch));
