import React, { PropTypes } from 'react';
import Header from '../common/components/header';
import { connect } from 'react-redux';
import { loadMatch } from '../common/redux/actions/match';
import { fetchGames } from '../common/redux/actions/games';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchGames();
  }

  handleChange(event) {
    this.props.loadMatch(event.target.value);
  }

  render() {
    return (
      <div>
        <Header/>
        <br/>
        quizzy.com/<input type='text' name='match' placeholder='match_name' onChange={ this.handleChange }/>
        <Link to={ '/' + this.props.match }>PLAY</Link> <br/>

      </div>
    )
  }
}

Home.propTypes = {
  match: PropTypes.string,
  gamesData: PropTypes.object,
  newMatch: PropTypes.func,
  fetchGames: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    match: state.match,
    gamesData: state.gamesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMatch: (input) => dispatch(loadMatch(input)),
    fetchGames: () => dispatch(fetchGames()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
