import React, { PropTypes } from 'react';
import Header from '../components/header';
import { removeGame } from '../redux/actions/game';
import { connect } from 'react-redux';
import { fetchMatchByName } from '../redux/actions/matches';
import NewMatch from './new-match';
import FetchedMatch from './fetched-match';

export class Match extends React.PureComponent {
  ComponentWillMount() {
      const match = this.props.match.params.match;
      this.props.fetchMatchByName(match);

  }
  render() {

    if(this.props.error !== undefined || this.props.error !== null){
        return <NewMatch/>
    }else{
        return <FetchedMatch match={ this.props.match } />
    }

    return (

        <div>

          { this.props.game + ' game screen'}
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
      match: state.match,
      error: state.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMatchByName: (match) => dispatch(fetchMatchByName (match)),
    // removeGame: () => dispatch(removeGame()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Match)
