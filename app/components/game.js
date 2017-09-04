import React from 'react';
import Header from '../components/header';

class Game extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.data);
    return (
      <tr>
        <td> { this.props.data.image } </td>
        <td> { this.props.data.name } </td>
        <td> Rating: { this.props.data.rating } </td>
        <td> Rating: { this.props.data.rating } </td>
        <Link to={'/match/' + this.props.data.name }>PLAY</Link>
      </tr>
    )
  }
}

export default Game;
