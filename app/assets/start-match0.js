import React, { PropTypes } from 'react';
import Header from '../components/header';
import NormalMatch from '../components/normalMatch';
import RealTimeMatch from '../components/realTimeMatch';
import { Route, Link } from 'react-router';
import { connect } from 'react-redux';
import Switch from 'react-toggle-switch';
import '../stylesheets/start-match.scss';
import '../../node_modules/react-toggle-switch/dist/css/switch.min.css';
import { Row, Col, Table } from 'react-bootstrap';
import { sortBy } from 'underscore';

export default class StartMatch extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  renderRanking() {
    const ranking = _.sortBy(this.props.match.game.ranking, 'points');
    const items = [];
    ranking.forEach( (entry, index) => {
      items.push(
        <tr>
          <td>{ index + 1 }</td>
          <td>{ entry.nickname }</td>
          <td>{ entry.points } pts</td>
        </tr>
      );
    });
    return (<tbody> { items } </tbody>);
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={4}>
            <img src={ this.props.match.game.image === null ? empty : this.props.match.game.image } height='100' id='previewImage'/>
          </Col>
          <Col xs={8} >
            <h1>{ this.props.match.game.name }</h1><br/>
            Mode: Normal
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={4}>
            <p>Best players</p>
            <Table striped bordered condensed hover>
              { this.renderRanking() }
            </Table>
          </Col>
          <Col xs={12} lg={8}>
            <p className='game-description'>{ this.props.match.game.description }</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            Enter your nickname: <input type='text' />
          </Col>
          <Col xs={4}/>
          <Col xs={2}>
            <Button>START</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

StartMatch.propTypes = {
  match: PropTypes.object,
}

// const mapStateToProps = state => {
//   return {
//     // matchData: state.matchData,
//   }
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//     // removeCurrentMatch: () => dispatch(removeCurrentMatch()),
//     // fetchMatch: matchName => dispatch(fetchMatch(matchName)),
//   };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(StartMatch)
