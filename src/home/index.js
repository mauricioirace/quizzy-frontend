import React from 'react';
import { Link } from 'react-router-dom';
import test from './test.css'
class Home extends React.PureComponent {

    render(){
        return (

            <Link to={ '/users' } style={ test.test }>dame users </Link>
        )
    }
}

export default Home;