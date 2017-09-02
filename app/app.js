import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './screens/home';
import About from './screens/about';
import history from './common/history';
import Register from './screens/register';
import Login from './screens/login';
import Match from './screens/match';
import { connect } from 'react-redux'

export class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter history={ history }>
          <Switch>
            <Route exact path='/' component={ Home }/>
            <Route exact path='/about' component={ About }/>
            <Route exact path='/register' component={ Register }/>
            <Route exact path='/login' component={ Login }/>
            <Route exact path={ '/:' + this.props.match } component={ Match }/>
          </Switch>
        </BrowserRouter>
        {/*<Footer/>*/}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    match: state.match,
  }
}

export default connect(mapStateToProps)(App)
