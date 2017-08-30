import React from 'react';
import test from './test.css';

class Home extends React.PureComponent {

    render(){
        return (
            <p style={ test.test } > caca</p>
        )
    }
}

export default Home;