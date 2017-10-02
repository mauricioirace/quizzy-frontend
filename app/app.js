import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './screens/home';
import About from './screens/about';
import Register from './screens/register';
import Login from './screens/login';
import Match from './screens/match';
import CreateMatch from './screens/create-match';
import StartMatch from './screens/start-match';
import { connect } from 'react-redux'
import history from './history';
import Header from './components/header';
import './styles.scss';

export class App extends React.PureComponent {
  render() {
    const obj = {
      image: 'http://media.supercheapauto.com.au/sports/images/thumbs/384463-thumb.jpg',
      name: 'Juegooooo',
    }
    return (
      <BrowserRouter history={ history } >
        <div>
          <Header/>
          <div className='main-view'>
            <Switch>
              <Route exact path='/' component={ Home }/>
              <Route exact path='/about' component={ About }/>
              <Route exact path='/register' component={ Register }/>
              <Route exact path='/login' component={ Login }/>
              <Route exact path='/match/:match' component={ Match }/>
              <Route exact path='/start-match' component={ StartMatch }/>
              <Route exact path='/create-match' component={ CreateMatch }/>
            </Switch>
          </div>
        </div>
        {/*<Footer/>*/}
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    matchData: state.matchData,
  }
};

export default connect(mapStateToProps)(App)