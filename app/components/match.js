import React from 'react';
import Header from '../components/header';
import { withRouter } from 'react-router-dom';
import { setCurrentMatch } from '../redux/actions/match';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import '../stylesheets/match.scss';

@withRouter
class Match extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setCurrentMatch(this.props.data);
    this.props.history.push(`/start-match/${this.props.data.url}`);
  }

  render() {
    return (
      <tr>
        <td><img className='match-image' src={ this.props.data.game.image } height='80'/></td>
        <td>{ this.props.data.game.name }</td>
        <td>Rating: { this.props.data.game.rating }</td>
        <td><img className='play-button' src={ require('../../assets/images/play_button.png')} onClick={ this.handleClick }/></td>
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentMatch: (currentMatch) => dispatch(setCurrentMatch(currentMatch)),
  };
}

export default connect((state) => {}, mapDispatchToProps)(Match)
