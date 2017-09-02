import React from 'react';
import Header from '../common/components/header';

class Login extends React.PureComponent {
    render() {
        return (
            <div>
              <Header/>
              User name: <input type='text' name='username' placeholder='Username'/><br/>
              Password: <input type='text' name='password' placeholder='Password'/><br/>
            </div>
        )
    }
}

export default Login;
