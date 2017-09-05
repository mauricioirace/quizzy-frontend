import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Home from './screens/home';
import About from './screens/about';
import Register from './screens/register';
import Login from './screens/login';
import Match from './screens/match';
import {connect} from 'react-redux'
import history from './history';
import Header from './components/header';

export class App extends React.Component {
  render() {
    return (
        <Router history={ history } >
          <div>
            <Header/>
              <Switch>
                <Route exact path='/' component={ Home }/>
                <Route exact path='/about' component={ About }/>
                <Route exact path='/register' component={ Register }/>
                <Route exact path='/login' component={ Login }/>
                <Route exact path='/match/:match' component={ Match }/>
              </Switch>
          </div>
        {/*<Footer/>*/}
        </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    matchData: state.matchData,
  }
}

export default connect(mapStateToProps)(App)
