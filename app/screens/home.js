import React, { PropTypes } from 'react';
import { Button } from 'react-foundation';
import Game from '../components/game';
import { connect } from 'react-redux';
import { loadCurrentMatch, matchNameError } from '../redux/actions/match';
import { fetchGames } from '../redux/actions/games';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { EMPTY_MATCH_NAME } from '../constants/home';
import '../stylesheets/home.scss';

export class Home extends React.Component {
  constructor(props) {
    super(props);this.checkEmptyName
    this.handleChange = this.handleChange.bind(this);
    this.checkEmptyName = this.checkEmptyName.bind(this);
  }

  componentWillMount() {
    this.props.fetchGames();
  }

  handleChange(event) {
    this.props.loadCurrentMatch(event.target.value);
  }

  checkEmptyName(event) {
    if (!this.props.matchData.currentMatch) {
      console.log('CACA');
      event.preventDefault(); 
      this.props.matchNameError(EMPTY_MATCH_NAME);       
    }    
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
        <table className='table'>
          <thead>
            <tr className='headings'>
              <th>
                <div className='column-header'>
                  Featured games
                </div>
              </th>
            </tr>
          </thead>
          { this.renderGames() }
        </table>
      );
    }
    return (<div></div>);
  }

  renderGames() {
    const items = [];
    this.props.gamesData.games.forEach( game => {
      items.push(
        <Game data={ game } />
      );
    });
    return (<tbody> { items } </tbody>);
  }

  render() {
    return (
      <div className='main-view'>
        <div className='table-container'>
          { this.renderTable() }
          <Link to={'/all_games'}><button className='button primary long'>ALL GAMES</button></Link>
        </div>
        <div className='match-container'>
          <h2>Create or join a match and start playing!</h2>
          <div className='form-container'>
            <div className='form-input horizontal medium'>
              <label className='fs-16'>quizzy.com/</label><input className='fs-16' type='text' name='game' placeholder='Match Name' onChange={ this.handleChange }/>
            </div>
              <div className='form-input horizontal medium'>      
                <span className='error-message'> { this.props.matchData.error ? this.props.matchData.error : null } </span> 
              </div>
          </div>
          <Link to={ `/match/${ this.props.matchData.currentMatch }` } 
            onClick={ this.checkEmptyName } >
            <button>GO!</button>
          </Link>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  matchData: PropTypes.object,
  gamesData: PropTypes.object,
  loadCurrentMatch: PropTypes.func,
  fetchGames: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    matchData: state.matchData,
    gamesData: state.gamesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCurrentMatch: (input) => dispatch(loadCurrentMatch(input)),
    fetchGames: () => dispatch(fetchGames()),
    matchNameError: (msg) => dispatch(matchNameError(msg))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
