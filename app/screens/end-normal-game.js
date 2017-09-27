import React from 'react';
import Header from '../components/header';
import { Button, ButtonToolbar, Jumbotron, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import endNormalGameStyle from '../../assets/js/end-normal-game.js';

class EndNormalGame extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

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
        <h2>Standings</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>Place</th>
              <th>Player</th>
              <th>Points</th>
            </tr>
          </thead>
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
              <td>pepito</td>
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


        {/*  
        <ListGroup>
          <ListGroupItem bsStyle="success">pepito 100 pts</ListGroupItem>
          <ListGroupItem >seba_bolso 95 pts</ListGroupItem>
          <ListGroupItem >guille_cheto 93 pts</ListGroupItem>
          <ListGroupItem >mauricap 92 pts</ListGroupItem>
        </ListGroup>*/}

        {/*<br />
        <h1>CONGRATULATIONS pepito!</h1>
        <h1>Your final score is 100</h1>
        <br />
        <br />
        <br />
        <h2>
          Would you like to save your score to compete with other players?
        </h2>
        <br />
        <div className='container'>
          <ButtonToolbar>
            <Link to={ "/login" }>
                <Button bsStyle="success" bsSize="large">Save</Button>
            </Link>
            <Link to={ "/" }>
                <Button bsSize="large">Return Home</Button>
            </Link>
          </ButtonToolbar>
        </div>
        <br />
        <br />
        <br />*/}
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