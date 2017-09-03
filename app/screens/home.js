import React, { PropTypes } from 'react';
import Header from '../common/components/header';
import { connect } from 'react-redux';
import { loadGame } from '../common/redux/actions/game';
import { fetchGames } from '../common/redux/actions/games';
import { Link, Redirect } from 'react-router-dom';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentWillMount() {
  //   this.props.fetchGames();
  // }

  handleChange(event) {
    this.props.loadGame(event.target.value);
  }

  render() {
    return (
      <div>
        <Header/>
        <br/>
        quizzy.com/<input type='text' name='game' placeholder='match_name' onChange={ this.handleChange }/>
        <Link to={'/' + this.props.game }>PLAY</Link> <br/>

      </div>
    )
  }
}

Home.propTypes = {
  game: PropTypes.string,
  gamesData: PropTypes.object,
  loadGame: PropTypes.func,
  fetchGames: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    game: state.game,
    gamesData: state.gamesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadGame: (input) => dispatch(loadGame(input)),
    fetchGames: () => dispatch(fetchGames()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
