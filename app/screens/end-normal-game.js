import React from 'react';
import Header from '../components/header';
import { Button, ButtonToolbar, Jumbotron, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import endNormalGameStyle from '../../assets/js/end-normal-game.js';
import { sortBy } from 'underscore';

class EndNormalGame extends React.PureComponent {
  
  /*renderRanking() {
    const obj = {
      game: {
        image: '',
        description: 'Juego de prueba',
        name: 'Experto Fútbol',
        ranking: [ {user: 'Tito', points: 40}, {user: 'Juan', points: 500}, {user: 'Pepito', points: 0} ]
      }
    }
    const ranking = sortBy(obj.game.ranking, 'points').reverse();
    const items = [];
    ranking.forEach( (entry, index) => {
      items.push(
        <tr> ACA HAY QUE DISTINGUIR AL CURRENT PLAYER PARA PINTARLO DE OTRO COLOR COMO ABAJO
          <td>{ index + 1 }</td>
          <td>{ entry.user }</td>
          <td>{ entry.points } pts</td>
        </tr>
      );
    });
    return (<tbody>{ items }</tbody>);
  }*/

  render() {
    return (
      <div className='container'>
         <Jumbotron>
          <h1>Your final score is 100!</h1>
          <p>Would you like to save your score to compete with other players?</p>
          <p>
            <Button bsStyle="success">Save</Button>
          </p>
        </Jumbotron> 
        <h2>Leaderboard</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>Place</th>
              <th>Player</th>
              <th>Points</th>
            </tr>
          </thead>
          {/*{ this.renderRanking() }
          <thead>
            <tr>
              <th>Place</th>
              <th>Player</th>
              <th>Points</th>
            </tr>
          </thead> */}
          <tbody>
            <tr>
              <td>13</td>
              <td>guille</td>
              <td>105</td>
            </tr>
            <tr>
              <td>14</td>
              <td>seba_bolso</td>
              <td>103</td>
            </tr>
            <tr style={ endNormalGameStyle.currentPlayer } >
              <td>15</td>
              <td>pepito (You)</td>
              <td>100</td>
            </tr>
            <tr>
              <td>16</td>
              <td>mauricap</td>
              <td>97</td>
            </tr>
            <tr>
              <td>17</td>
              <td>voiras</td>
              <td>95</td>
            </tr>
          </tbody>
        </Table>
        <p>
          Share your score!
        </p>
        <Link to={ "" }>
            <Button bsStyle="primary" bsSize="small">f | Compartir</Button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    matchData: state.matchData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCurrentMatch: (input) => dispatch(loadCurrentMatch(input)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EndNormalGame)