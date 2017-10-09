import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import { setCurrentMatch } from '../redux/actions/match';
import { connect } from 'react-redux';

class Match extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setCurrentMatch(this.props.data);
  }

  render() {
    return (
      <tr>
        <td> <img src={ this.props.data.game.image } height="80" /> </td>
        <td> { this.props.data.game.name } </td>
        <td> Rating: { this.props.data.game.rating } </td>
        <td> <Link to={`/start-match/${this.props.data.url}`} onClick={ this.handleClick }><img className='play-button' src={ require('../../assets/images/play_button.png') }/></Link> </td>
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentMatch: (currentMatch) => dispatch(setCurrentMatch(currentMatch)),
  };
}

export default connect(mapDispatchToProps)(Match)
