import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
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
                <div className='container'>
                  <Row>
                    <Col md={ 7 } mdOffset={ 2 } xs={ 12 }>
                      <Reveal effect='animated slideInDown'>
                        <h1 className='brand-heading'>Quizzy</h1>
                        <h2>Create a match and start playing!</h2>
                      </Reveal>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={ 7 } mdOffset={ 2 } xs={ 12 }>
                      <div className='match-container'>
                        <Reveal effect='animated slideInLeft'>
                          <div className='form-container'>
                            <div className='form-input horizontal long'>
                              <label className='fs-22'>quizzy.com/</label><input className='fs-16' type='text'
                               name='game' placeholder='Match Name' onChange={ this.handleChange }/>
                            </div>
                            <div className='form-input horizontal medium'>
                              <span className='error-message'> { this.props.matchData.error ? this.props.matchData.error : null } </span>
                            </div>
                          </div>
                        </Reveal>
                        <Reveal effect='animated slideInRight'>
                          <Link to={ `/match/${ this.props.matchData.currentMatch }` }
                            onClick={ this.checkEmptyName } >
                            <button className='button primary long'>GO!</button>
                          </Link>
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
            </div>
        </header>
        <section id='matches' className='container content-section text-center'>
                <Row>
                  <Col md={ 12 } xs={ 12 }>
                    <h1 className='brand-heading'>Live matches</h1>
                  </Col>
                </Row>
                <Row>
                  <Col md={ 12 } xs={ 12 }>
                    <Reveal effect='animated bounceInLeft'>
                      { this.renderTable() }
                    </Reveal>
                  </Col>
                </Row>
        </section>
        <section id='about' className='content-section text-center'>
            <div className='download-section'>
                <div className='container'>
                    <div className='col-lg-8 col-lg-offset-2'>
                        <h2>Download Grayscale</h2>
                        <p>You can download Grayscale for free on the preview page at Start Bootstrap.</p>
                        <a href='http://startbootstrap.com/template-overviews/grayscale/' className='btn btn-default btn-lg'>Visit Download Page</a>
                    </div>
                </div>
            </div>
        </section>

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
