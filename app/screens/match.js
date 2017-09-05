import React, { PropTypes } from 'react';
import Header from '../components/header';
import { removeCurrentMatch } from '../redux/actions/match';
import { connect } from 'react-redux';

export class Match extends React.PureComponent {
  componentWillMount() {
    fetchMatch(this.props.currentMatch);
  }

  componentWillUnmount() {
    this.props.removeCurrentMatch();
  }

  render() {
    return (
      <div>
        <Header/>
          { this.props.matchData.currentMatch + ' game screen'}
      </div>
    )
  }
}

Match.propTypes = {
  removeCurrentMatch: PropTypes.func,
  currentMatch: PropTypes.string,
  fetchMatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    currentMatch: state.currentMatch,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeCurrentMatch: () => dispatch(removeCurrentMatch()),
    fetchMatch: matchName => dispatch(fetchMatch(matchName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Match)
