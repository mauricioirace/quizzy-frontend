import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrentMatch, fetchMatch, removeCurrentMatch } from '../redux/actions/match';
import CreateGame from './create-game';
import StartMatch from './start-match';
import AnswerQuestion from './answer-question';
import EndNormalGame from './end-normal-game';
import {
  START_MATCH_SCREEN,
  ANSWER_QUESTION_SCREEN,
  END_NORMAL_GAME_SCREEN
} from '../constants/match';
import { withRouter } from 'react-router';

const mapStateToProps = state => {
  return {
    isFetching: state.matchData.isFetching,
    currentMatch: state.matchData.match,
    fetchError: state.matchData.error,
    screen: state.matchData.state.screen,

  }
};

const mapDispatchToProps = dispatch => {
  return {
    removeCurrentMatch: () => dispatch(removeCurrentMatch()),
    setCurrentMatch: (currentMatch) => dispatch(setCurrentMatch(currentMatch)),
    fetchMatch: url => dispatch(fetchMatch(url)),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export class Match extends React.PureComponent {
  constructor(props) {
    super(props);
    this.showMatch = this.showMatch.bind(this);
  }

  componentWillMount() {
    this.props.fetchMatch(this.props.match.params.url);
  }

  showMatch() {
    const {
      isFetching,
      fetchError,
      currentMatch
    } = this.props;
    console.log(this.props)
    if (isFetching) {
      return (
        <div>
          Cargando...
        </div>
      );
    } else if (fetchError) {
      return <CreateGame/>;
    } else if (currentMatch) {
      // this.props.setCurrentMatch(currentMatch);
      return <StartMatch url={ this.props.match.params.url }/>
    }
    return (<div></div>);
  }

  render() {
    const { screen } = this.props;
    switch (screen) {
      case ANSWER_QUESTION_SCREEN:
        return <AnswerQuestion/>;
      case END_NORMAL_GAME_SCREEN:
        return <EndNormalGame/>;
    default:
      return this.showMatch();

    }
  }
}

Match.propTypes = {
  removeCurrentMatch: PropTypes.func,
  setCurrentMatch: PropTypes.func,
  fetchMatch: PropTypes.func,
  screen: PropTypes.string,
  isFetching: PropTypes.bool,
  error: PropTypes.bool,
  match: PropTypes.object
}

export default Match;