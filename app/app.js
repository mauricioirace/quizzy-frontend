import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './screens/home';
import About from './screens/about';
import Register from './screens/register';
import Login from './screens/login';
import Match from './screens/match';
import { connect } from 'react-redux'
import history from './history';

export class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={ history } >
          <Switch>
            { this.props.game !== '' ?
                <Route exact path={ '/match/' + this.props.matchData.currentMatch } component={ Match }/>
              : ''
            }
            <Route exact path='/' component={ Home }/>
            <Route exact path='/about' component={ About }/>
            <Route exact path='/register' component={ Register }/>
            <Route exact path='/login' component={ Login }/>
          </Switch>
        </Router>
        {/*<Footer/>*/}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    matchData: state.matchData,
  }
}

export default connect(mapStateToProps)(App)
