import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import MatchRow from '../components/match';
import { connect } from 'react-redux';
import { fetchLandingMatches } from '../redux/actions/matches';
import { Link } from 'react-router-dom';
import Reveal from 'react-reveal';
import { SlideFadeTop } from '../components/transitions';
import { TransitionGroup } from 'react-transition-group';
import '../stylesheets/home.scss';
import Spinner from '../components/spinner';
import '../stylesheets/react-spinner.scss';

const pageSize = 10;

export class AllMatches extends React.Component {
  constructor(props) {
    super(props);
    this.renderMatches = this.renderMatches.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentWillMount() {
    this.props.fetchLandingMatches();
  }

  renderTable() {
    const { matchesData } = this.props;
    if (matchesData.isFetching) {
      return (
        <div className='loading-matches'>
          <Spinner />
        </div>
      );
    } else if (matchesData.error) {
      return (
        <div>
          Could not get the matches from the server :(
        </div>
      );
    } else if (matchesData.matches) {
      const page = parseInt(this.props.match.params.page);
      let prev = null;
      if (page > 1) {
        const prevPage = (page - 1).toString();
        prev =
          <Link to={ `/all-matches/${prevPage}` } className='prev'>
            <button className='button primary medium'>Previous</button>
          </Link>
      };
      let next = null;
      const beginning = (page - 1) * pageSize;
      const matches = this.props.matchesData.matches.slice(beginning, beginning + pageSize);
      const length = matches.length;
      if (beginning + length < this.props.matchesData.matches.length) {
        const nextPage = (page + 1).toString();
        next =
          <Link to={ `/all-matches/${nextPage}` } className='next'>
            <button className='button primary medium'>Next</button>
          </Link>
      };
      return (
        <div>
          <table ref='root' className='table'>
            { this.renderMatches(matches, length) }
          </table>
          { prev }
          { next }
          <Link to={ '/' } className='center'>
            <button className='button primary medium'>Go back</button>
          </Link>
        </div>
      );
    }
    return (<div></div>);
  }

  renderMatches(matches, length) {
    const items = [];
    if (matches[0] && length > 0) {
      matches.forEach((match, index) => {
        items.push(
          <SlideFadeTop key={ match.url }>
            <MatchRow key={ index } data={ match }/>
          </SlideFadeTop>
        );
      });
    }
    return (<TransitionGroup component='tbody'>{ items }</TransitionGroup>);
  }

  render() {
    return (
      <div id='page-top'>
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
      </div>
    )
  }
}

AllMatches.propTypes = {
  matchesData: PropTypes.object,
  fetchLandingMatches: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    matchesData: state.matchesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLandingMatches: () => dispatch(fetchLandingMatches()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMatches);
