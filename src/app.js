import React from 'react'
import {Switch,BrowserRouter,Route,} from 'react-router-dom'
import Home from './home/index';
import UsersHome from './users/index';
import history from './history';
export default class App extends React.PureComponent{
    render(){
        return (
            <BrowserRouter history={history}>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/users' component={UsersHome}/>
                </Switch>
            </BrowserRouter>
        )
    }

}