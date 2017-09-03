import React, { PropTypes } from 'react';
import Header from '../common/components/header';
import { removeGame } from '../common/redux/actions/game';
import { connect } from 'react-redux';

export class Match extends React.PureComponent {
  componentWillUnmount() {
    this.props.removeGame();
  }

  render() {
    return (
      <div>

        <Header/>
          { this.props.game + ' game screen'}
      </div>
    )
  }
}

Match.propTypes = {
  removeGame: PropTypes.func,
  game: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    game: state.game,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeGame: () => dispatch(removeGame()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Match)
