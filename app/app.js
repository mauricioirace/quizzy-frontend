import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home/index';
import About from './about/index';
import history from './common/history';
import Register from './register/index';
import Login from './login/index';

export default class App extends React.PureComponent {
    render() {
        return (
            <div>
                {/*<Header/>*/}
                <BrowserRouter history={ history }>
                    <Switch>
                        <Route exact path='/' component={ Home }/>
                        <Route exact path='/about' component={ About }/>
                        <Route exact path='/register' component={ Register }/>
                        <Route exact path='/login' component={ Login }/>
                        {/*<Route exact path='/:match'/>*/}
                    </Switch>
                </BrowserRouter>
                {/*<Footer/>*/}
            </div>
        )
    }
}
