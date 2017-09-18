import React, { PropTypes } from 'react';
import Header from '../components/header';
import NormalMatch from '../components/normalMatch';
import RealTimeMatch from '../components/realTimeMatch';
import { Route, Link } from 'react-router';
import { connect } from 'react-redux';
import Switch from 'react-toggle-switch';
import '../stylesheets/start-match.scss';
import '../../node_modules/react-toggle-switch/dist/css/switch.min.css';

export default class StartMatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
      mode: '/start-match/normal'
    };
  }

  // componentWillMount() {
  //   // this.props.fetchMatch(this.props.match.params.match);
  // }
  //
  // componentWillUnmount() {
  //   // this.props.removeCurrentMatch();
  // }

  // showMatch() {
  //   const { matchData } = this.props;
  //   if (matchData.isFetching) {
  //     return (
  //       <div>
  //         Cargando...
  //       </div>
  //     );
  //   } else if (matchData.error ) {
  //     return <CreateGame/>;
  //   } else if (matchData.match) {
  //     return <FetchedMatch match={ this.props.matchData.match } />;
  //   }
  //   return (<div></div>);
  // }

  toggleSwitch = () => {
    const mode = (this.state.switched) ? '/start-match/normal' : '/start-match/real-time';
    this.setState( prevState => {
      return {
        switched: !prevState.switched,
        mode
      };
    });
  };

  render() {
    return (
      <div>
        { /* <img src={ this.props.match.game.image === null ? empty : this.props.match.game.image } height='100' id='previewImage'/>
        <h1>{ this.props.match.game.name }</h1><br/> */ }
        Game mode <br/>
        <Link to='/start-match/normal' >Normal</Link> | <Link to='/start-match/real-time' >Real Time</Link>
        <Route exact path='/start-match/normal' render={ (props) => {
          return (
            <NormalMatch
              match={props.match}
              {...props}
            />
          );
        } }/>
        <Route exact path='/start-match/real-time' render={ (props) => {
          return (
            <RealTimeMatch
              match={props.match}
              {...props}
            />
          );
        } }/>
        { /* <Switch onClick={this.toggleSwitch.bind(this)} on={this.state.switched}/> */ }
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
