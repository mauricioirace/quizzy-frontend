import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './screens/home';
import About from './screens/about';
import Register from './screens/register';
import Login from './screens/login';
import Match from './screens/match';
import StartMatch from './screens/start-match';
import EndNormalGame from './screens/end-normal-game';
import { connect } from 'react-redux'
import history from './history';
import Header from './components/header';
import './styles.scss';
import AnswerQuestion from './screens/answer-question';

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderStartMatch = this.renderStartMatch.bind(this);
  }

  renderStartMatch() {
    const obj = {
      game: {
        image: 'http://media.supercheapauto.com.au/sports/images/thumbs/384463-thumb.jpg',
        description: 'Un set de preguntas y respuestas tal que no importa cuanto estudies o creas que sepas, la probabilidad de acertar tiende a 0.',
        name: 'Arquitectura de computadoras',
        ranking: [{ nickname: 'Tito', points: 40 }, { nickname: 'Juan', points: 500 }, { nickname: 'Sorete', points: 0 }]
      }
    }
    return (
      <StartMatch currentMatch={obj}/>
    );
  }

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
              <Route exact path='/answer-question' component={ AnswerQuestion }/>
              <Route exact path='/start-match' render={ this.renderStartMatch }/>
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
