import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home/index';
import history from './history';

export default class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter history={ history }>
                <Switch>
                    <Route exact path='/' component={ Home }/>
                </Switch>
            </BrowserRouter>
        )
    }

}