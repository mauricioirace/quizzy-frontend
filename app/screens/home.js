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

        <header className="intro">
            <div className="intro-body">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <h1 className="brand-heading">Grayscale</h1>
                            <p className="intro-text">A free, responsive, one page Bootstrap theme.
                                Created by Start Bootstrap.</p>
                            <a href="#about" className="btn btn-circle page-scroll">
                                <i className="fa fa-angle-double-down animated"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <section id="about" className="container content-section text-center">
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                    <h2>About Grayscale</h2>
                    <p>Grayscale is a free Bootstrap 3 theme created by Start Bootstrap. It can be yours right now, simply download the template on <a href="http://startbootstrap.com/template-overviews/grayscale/">the preview page</a>. The theme is open source, and you can use it for any purpose, personal or commercial.</p>
                    <p>This theme features stock photos by <a href="http://gratisography.com/">Gratisography</a> along with a custom Google Maps skin courtesy of <a href="http://snazzymaps.com/">Snazzy Maps</a>.</p>
                    <p>Grayscale includes full HTML, CSS, and custom JavaScript files along with LESS files for easy customization.</p>
                </div>
            </div>
        </section>

        <section id="download" className="content-section text-center">
            <div className="download-section">
                <div className="container">
                    <div className="col-lg-8 col-lg-offset-2">
                        <h2>Download Grayscale</h2>
                        <p>You can download Grayscale for free on the preview page at Start Bootstrap.</p>
                        <a href="http://startbootstrap.com/template-overviews/grayscale/" className="btn btn-default btn-lg">Visit Download Page</a>
                    </div>
                </div>
            </div>
        </section>

        <div className='match-container'>
          <h2>Create or join a match and start playing!</h2>
          <div className='form-container'>
            <div className='form-input horizontal long'>
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
