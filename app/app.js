import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './screens/home';
import About from './screens/about';
import Register from './screens/register';
import Login from './screens/login';
import Match from './screens/match';
import StartMatch from './screens/start-match';
import CreateMatch from './screens/create-match';
import EndNormalGame from './screens/end-normal-game';
import Lobby from './screens/lobby'
import { connect } from 'react-redux'
import history from './history';
import Header from './components/header';
import Footer from './components/footer';
import './styles.scss';
import AnswerQuestion from './screens/answer-question';

export class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter history={ history }>
        <div>
          <Header/>
          <div className='main-view'>
            <Switch>
              <Route exact path='/' component={ Home }/>
              <Route exact path='/about' component={ About }/>
              <Route exact path='/register' component={ Register }/>
              <Route exact path='/login' component={ Login }/>
              <Route exact path='/match/:match' component={ Match }/>
              <Route exact path='/end-normal-game' component={ EndNormalGame }/>
              <Route exact path='/create-match' component={ CreateMatch }/>
              <Route exact path='/answer-question' component={ AnswerQuestion }/>
              <Route exact path='/start-match/:url' component={ StartMatch }/>
              <Route exact path='/lobby' component={ Lobby }/>
            </Switch>
          </div>
          {/*<Footer/>*/}
        </div>
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
