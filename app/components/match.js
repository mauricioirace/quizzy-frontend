import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { withRouter } from 'react-router-dom';
import '../stylesheets/match.scss';

class MatchRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push({
      pathname: '/start-match',
      state: { match: this.props.data }
    });
  }

  render() {
    return (
      <tr>
        <td><img className='match-image' src={ this.props.data.game.image }/></td>
        <td>{ this.props.data.game.name }</td>
        <td><StarRatingComponent editing={ false } starCount={ 5 } value={ this.props.data.game.rating } name={ 'rating' }/></td>
        <td><img className='play-button animated pulse' onClick={ this.handleClick } src={ require('../../assets/images/play_button.png') }/></td>
      </tr>
    )
  }
}

export default withRouter(MatchRow);
