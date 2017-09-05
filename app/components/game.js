import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';

class Game extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr>
        <td> { this.props.data.game.image } </td>
        <td> { this.props.data.game.name } </td>
        <td> Rating: { this.props.data.game.rating } </td>
        <td> <Link to={'/match/' + this.props.data.game.name }>PLAY</Link> </td>
      </tr>
    )
  }
}

export default Game;
