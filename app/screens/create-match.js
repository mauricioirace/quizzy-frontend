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
import '../stylesheets/start-match.scss';
import '../stylesheets/create-match.scss';
import { connect } from 'react-redux';
import Reveal from 'react-reveal';

export class CreateMatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.state = {
      switched: false
    };
    this.match = this.getMatch();
  }

  toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };

  getMatch() {
    const { name, description, image, category, questions, currentMatch } = this.props;
    const match = {
      url: currentMatch,
      owner: 'Fulane of such',
      isRealTime: this.state.switched,
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
    this.props.createMatch(this.match, this.onSuccess);
  }

  onSuccess(currentMatch) {
    this.props.setCurrentMatch(currentMatch);
    this.props.history.push(`/start-match/${this.props.currentMatch}`);
  }

  renderDescription() {
    if (this.match.game.description) {
      return(
        <div className='description-container'>
          <h2 className='game-description'>Game description</h2>
          <h4>{ this.match.game.description }</h4>
        </div>
      );
    }
  }

  renderGameMode() {
    return !this.state.switched ? "In this game mode you have to answer all the questions in the given time period. It's single player." : "In this game mode you have to answer all the questions in the given time period, but you have a bonus the earlier you answer it. You will be competing in real-time with other players.";
  }

  renderMatchMode() {
    if(!this.state.switched) {
      return(
        <Row>
          <NormalMatch data={ this.game }/>
          <Button className='button primary medium' onClick={ this.handleClick }>DONE</Button>
        </Row>
      );
    } else {
      return(
        <Row>
          <Button className='button primary medium right' onClick={ this.handleClick }>DONE</Button>
          <RealTimeMatch/>
        </Row>
      );
    }
  }

  render() {
    return (
      <div>
        <div className='page-match'>
          <Row>
            <h1>CREATE A NEW MATCH FOR THIS GAME</h1>
            <h4>Select between the 2 game modes, normal or real-time and get playing!</h4>
          </Row>
          <div className='game-container'>
            <Row>
              <div className='game-title'>
                { this.match.game.image ? <img src={ this.match.game.image } id='previewImage'/> : false }
                <h1 className='game-name'>{ this.match.game.name }</h1>
              </div>
            </Row>
            <Row>
              <Row>
                <h3>Mode: { this.state.switched ? 'Real-Time' : 'Normal' }</h3><Switch onClick={ this.toggleSwitch } on={ this.state.switched }/>
              </Row>
              <Row>
                <div className='mode-explanation'>
                  <h4>{ this.renderGameMode() }</h4>
                </div>
              </Row>
            </Row>
            <Row>
              { this.renderDescription() }
            </Row>
            { this.renderMatchMode() }
          </div>
        </div>
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
