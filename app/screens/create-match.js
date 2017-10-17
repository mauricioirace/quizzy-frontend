import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, Col, Row, Grid } from 'react-bootstrap';
import { sortBy } from 'underscore';
import { createMatch, setCurrentMatch } from '../redux/actions/match';
import Switch from 'react-toggle-switch';
import '../../node_modules/react-toggle-switch/dist/css/switch.min.css';
import NormalMatch from '../components/normalMatch';
import RealTimeMatch from '../components/realTimeMatch';
import { withRouter } from 'react-router-dom';
import empty from '../../assets/images/empty.svg';
import { connect } from 'react-redux';

export class CreateMatch extends React.PureComponent {
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

  getMatch() {
    const { name, description, image, category, questions, currentMatch } = this.props;
    const match = {
      url: currentMatch,
      owner: 'Fulane of such',
      isRealTime: this.state.switched,
      result: [],
      game: {
        name,
        ranking: [],
        description,
        creator: 'Fulane of such',
        tags: [ category ],
        questions,
        image
      }
    };
    return match;
  }

  handleClick(event) {
    const match = this.getMatch();
    this.props.createMatch(match, this.onSuccess);
  }

  onSuccess(currentMatch) {
    this.props.setCurrentMatch(currentMatch);
    this.props.history.push(`/start-match/${this.props.currentMatch}`);
  }

  render() {
    const { name, image } = this.props;
    return (
      <div>
        <Grid>
          <Row>
            <Col lg={4}>
              <img src={ image === null ? empty : image } height='100' id='previewImage'/>
            </Col>
            <Col lg={8} >
              <Row>
                <h1>{ name }</h1>
              </Row>
              <Row>
                <Row>Mode: { this.state.switched ? 'Real-Time' : 'Normal' }</Row>
                <Row><Switch onClick={ this.toggleSwitch } on={ this.state.switched }/></Row>
              </Row>
            </Col>
          </Row>
          <Row>
            <h2>CREATE A NEW MATCH FOR THIS GAME</h2>
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
  description: PropTypes.string,
  image: PropTypes.string,
  category: PropTypes.string,
  questions: PropTypes.array,
  name: PropTypes.string,
  error: PropTypes.string,
  currentMatch: PropTypes.string,
  createMatch: PropTypes.func,
  setCurrentMatch: PropTypes.func
}

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
    setCurrentMatch: (currentMatch) => dispatch(setCurrentMatch(currentMatch))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CreateMatch));
