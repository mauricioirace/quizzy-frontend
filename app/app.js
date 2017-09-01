import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home/index';
import history from './common/history';

export default class App extends React.PureComponent {
    render() {
        return (
            <div>
                {/*<Header/>*/}
                <BrowserRouter history={ history }>
                    <Switch>
                        <Route exact path='/' component={ Home }/>
                        {/*<Route exact path='/:match'/>*/}
                    </Switch>
                </BrowserRouter>
                {/*<Footer/>*/}
            </div>
        )
    }

}