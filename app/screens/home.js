import React, { PropTypes } from 'react';
import Header from '../components/header';
import Game from '../components/game';
import { connect } from 'react-redux';
import { loadGame } from '../redux/actions/game';
import { fetchGames } from '../redux/actions/games';
import { Link, Redirect } from 'react-router-dom';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchGames();
  }

  handleChange(event) {
    this.props.loadGame(event.target.value);
  }

  renderTable() {
    const { gamesData } = this.props;
    if (gamesData.isFetching) {
      return (
        <div>
          Cargando...
        </div>
      );
    } else if (gamesData.error) {
      return (
        <div>
          Error!
        </div>
      );
    } else if (gamesData.games) {
      return (
        <table>
          { this.renderGames() }
        </table>
      );
    }
    return (<div></div>);
  }

  renderGames() {
    // const items = [];
    // this.props.gamesData.games.forEach( game => {
    //   items.push(
    //     <Game game={ game } />
    //   );
    // });
    // return items;
    console.log(this.props.gamesData);
    console.log(this.props.gamesData.games);
    console.log(this.props.gamesData.games[5]);
    debugger;
    return <Game data={ this.props.gamesData.games[5] } />
  }

  render() {
    // let games = [];
    //
    // for(let i in this.props.games) {
    //   games.push(<label> {this.props.games[i] } </label>);
    // }
    return (
      <div>
        <Header/>
        <br/>
        quizzy.com/<input type='text' name='game' placeholder='match_name' onChange={ this.handleChange }/>
        <Link to={'/match/' + this.props.game }>PLAY</Link> <br/>
        <Link to={'/featured'}>FEATURED</Link> <Link to={'/my_games'}>MY GAMES</Link>
        { /*this.renderTable()*/ }
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
