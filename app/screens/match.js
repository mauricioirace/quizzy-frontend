import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Header from '../components/header';
import { connect } from 'react-redux';
import { setCurrentMatch, fetchMatch, removeCurrentMatch } from '../redux/actions/match';
import CreateGame from './create-game';
import FetchedMatch from './fetched-match';
import Spinner from '../components/spinner';
import '../stylesheets/react-spinner.scss';

export class Match extends React.PureComponent {
  constructor(props) {
    super(props);
    this.showMatch = this.showMatch.bind(this);
  }

  componentWillMount() {
    this.props.fetchMatch(this.props.match.params.match);
  }

  showMatch() {
    const { matchData } = this.props;
    if (matchData.isFetching) {
      return (
        <div>
          <div className='loading-match'>
          </div>
          <div>
            <Spinner />
          </div>
        </div>
      );
    } else if (matchData.error ) {
      return <CreateGame/>;
    } else if (matchData.match) {
      this.props.setCurrentMatch(this.props.matchData.match);
      this.props.history.push(`/start-match/${ this.props.matchData.match.url }`);
    }
    return (<div></div>);
  }

  render() {
    return (
      <div>
        { this.showMatch() }
      </div>
    )
  }
}

Match.propTypes = {
  removeCurrentMatch: PropTypes.func,
  setCurrentMatch: PropTypes.func,
  matchData: PropTypes.object,
  fetchMatch: PropTypes.func,
  history: ReactRouterPropTypes.history,
  location: ReactRouterPropTypes.location,
  match: ReactRouterPropTypes.match,
}

const mapStateToProps = state => {
  return {
    matchData: state.matchData,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    removeCurrentMatch: () => dispatch(removeCurrentMatch()),
    setCurrentMatch: (currentMatch) => dispatch(setCurrentMatch(currentMatch)),
    fetchMatch: matchName => dispatch(fetchMatch(matchName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Match)
