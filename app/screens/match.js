import React, { PropTypes } from 'react';
import Header from '../components/header';
import { connect } from 'react-redux';
import { fetchMatch, removeCurrentMatch } from '../redux/actions/match';
import NewMatch from './new-match';
import FetchedMatch from './fetched-match';

export class Match extends React.PureComponent {
  componentWillMount() {
    fetchMatch(this.props.matchData.currentMatch);
  }

  componentWillUnmount() {
    this.props.removeCurrentMatch();
  }

  showMatch() {
    const { matchData } = this.props;
    if (matchData.isFetching) {
      return (
        <div>
          Cargando...
        </div>
      );
    } else if (matchData.error) {
      return <NewMatch/>;
    } else if (matchData.match) {
      return <FetchedMatch match={ this.props.matchData.match } />;
    }
    return (<div></div>);
  }

  render() {
    return (
      <div>
        <Header/>
          { this.showMatch() }
      </div>
    )
  }
}

Match.propTypes = {
  removeCurrentMatch: PropTypes.func,
  matchData: PropTypes.object,
  fetchMatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    matchData: state.matchData,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    removeCurrentMatch: () => dispatch(removeCurrentMatch()),
    fetchMatch: matchName => dispatch(fetchMatch(matchName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Match)
