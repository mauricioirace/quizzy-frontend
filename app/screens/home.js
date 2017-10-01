import React, { PropTypes } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import Game from '../components/game';
import { connect } from 'react-redux';
import { loadCurrentMatch, matchNameError } from '../redux/actions/match';
import { fetchGames } from '../redux/actions/games';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { EMPTY_MATCH_NAME } from '../constants/home';
import { Icon } from 'react-fa'
import Reveal from 'react-reveal';
import 'animate.css/animate.css';
import '../stylesheets/home.scss';

export class Home extends React.Component {
  constructor(props) {
    super(props);this.checkEmptyName
    this.handleChange = this.handleChange.bind(this);
    this.checkEmptyName = this.checkEmptyName.bind(this);
  }

  componentWillMount() {
    this.props.fetchGames();
    window.addEventListener('load', this.switchRows);
  }

  handleChange(event) {
    this.props.loadCurrentMatch(event.target.value);
  }

  checkEmptyName(event) {
    if (!this.props.matchData.currentMatch) {
      event.preventDefault();
      this.props.matchNameError(EMPTY_MATCH_NAME);
    }
  }

  switchRows() {
    setInterval(function() {
      var theRow = $('table.table tr:last');
      theRow.remove();
      theRow.insertBefore('table.table > tbody > tr:first');
      $('table.table tr:first')
        .find('td')
        .wrapInner('<div style="display: none;" />')
        .parent()
        .find('td > div')
        .fadeIn(900, function() {
          var $set = $(this);
          $set.replaceWith($set.contents());
        });
    }, 4000);
  }

  renderTable() {
    const { gamesData } = this.props;
    if (gamesData.isFetching) {
      return (
        <div>
          Loading...
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
    this.props.gamesData.games.forEach( game => {
      items.push(
        <Game data={ game } />
      );
    });
    return (<tbody> { items } </tbody>);
  }

  render() {
    return (
      <div className='main-view' id='page-top'>
        <header className='intro'>
          <div className='intro-body'>
                <Row>
                  <Col md={ 7 } mdOffset={ 2 } xs={ 12 }>
                    <Reveal effect='animated slideInDown'>
                      <h1 className='brand-heading'>Quizzy</h1>
                      <h2>Create a game and start playing!</h2>
                    </Reveal>
                  </Col>
                </Row>
                <Row>
                  <Col md={ 7 } mdOffset={ 2 } xs={ 12 }>
                    <div className='match-container'>
                      <Reveal effect='animated slideInLeft'>
                        <div className='form-container'>
                          <div className='form-input horizontal long'>
                            <label className='fs-22'>quizzy.com/</label>
                            <input className='fs-16' type='text'
                             name='game' placeholder='Game name' onChange={ this.handleChange }/>
                            <Link to={ `/match/${ this.props.matchData.currentMatch }` }
                              onClick={ this.checkEmptyName } >
                              <img className='go-button' src={ require('../../assets/images/play_button_fill_shadow.png') }/>
                            </Link>
                          </div>
                          <div className='form-input horizontal medium'>
                            <span className='error-message'> { this.props.matchData.error ? this.props.matchData.error : null } </span>
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={ 7 } mdOffset={ 2 } xs={ 12 }>
                  <Reveal effect='animated slideInUp'>
                    <a href='#matches' className='btn btn-circle page-scroll'>
                      <Icon name='angle-double-down' className='animated'></Icon>
                    </a>
                    <h2 className='arrow-title'>Or join a live one!</h2>
                  </Reveal>
                  </Col>
                </Row>
          </div>
        </header>
        <div id='matches' className='container content-section text-center'>
                <Row>
                  <Col md={ 12 } xs={ 12 }>
                    <h1 className='brand-heading'>Live games</h1>
                  </Col>
                </Row>
                <Row>
                  <Col md={ 12 } xs={ 12 }>
                    <Reveal effect='animated bounceInLeft'>
                      { this.renderTable() }
                    </Reveal>
                  </Col>
                </Row>
        </div>
        <div id='about' className='content-section text-center'>
            <div className='about-section'>
                <Row>
                  <Col md={ 12 } xs={ 12 }>
                    <h1 className='brand-heading'>How it works</h1>
                  </Col>
                </Row>
                <Row>
                  <Col md={ 12 } xs={ 12 }>
                   <Reveal effect='animated fadeIn'>
                    <h5>Choose a game, answer the questions and prove your knowledge.
                    There are two modes you can play, normal & real-time.</h5>
                   </Reveal>
                  </Col>
                </Row>
                <Row>
                  <Col md={ 12 } xs={ 12 }>
                    <div className='modes-container'>
                       <Reveal effect='animated slideInLeft'>
                        <div className='game-mode'>
                          <h3>Normal</h3>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                       </Reveal>
                        <Reveal effect='animated slideInRight'>
                        <div className='game-mode'>
                          <h3>Real-Time</h3>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                       </Reveal>
                    </div>
                  </Col>

                </Row>
            </div>
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
