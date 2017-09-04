import React, { PropTypes } from 'react';
import Header from '../components/header';
import { removeCurrentMatch } from '../redux/actions/currentMatch';
import { connect } from 'react-redux';

export class Match extends React.PureComponent {
  componentWillUnmount() {
    this.props.removeCurrentMatch();
  }

  render() {
    return (
      <div>
        <Header/>
          { this.props.currentMatch + ' game screen'}
      </div>
    )
  }
}

Match.propTypes = {
  removeCurrentMatch: PropTypes.func,
  currentMatch: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    currentMatch: state.currentMatch,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeCurrentMatch: () => dispatch(removeCurrentMatch()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Match)
