import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './screens/home';
import AllMatches from './screens/all-matches';
import Match from './screens/match';
import StartMatch from './screens/start-match';
import CreateMatch from './screens/create-match';
import EndNormalGame from './screens/end-normal-game';
import Lobby from './screens/lobby';
import history from './history';
import Header from './components/header';
import Footer from './components/footer';
import './styles.scss';
import AnswerQuestion from './screens/answer-question';
import AnswerQuestionRealTime from './screens/answer-question-real-time';

export class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter history={ history }>
        <div>
          <Header/>
          <div className='main-view'>
            <Switch>
              <Route exact path='/' component={ Home }/>
              <Route exact path='/all-matches/:page' component={ AllMatches }/>
              <Route exact path='/match/:match' component={ Match }/>
              <Route exact path='/end-normal-game/:id/:player/:score' component={ EndNormalGame }/>
              <Route exact path='/create-match/:url' component={ CreateMatch }/>
              <Route exact path='/answer-question' component={ AnswerQuestion }/>
              <Route exact path='/answer-question-real-time' component={ AnswerQuestionRealTime }/>
              <Route exact path='/start-match/:url' component={ StartMatch }/>
              <Route exact path='/lobby' component={ Lobby }/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
